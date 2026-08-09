import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const result = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], {
  env: {
    ...process.env,
    NEXT_TELEMETRY_DISABLED: "1",
  },
  stdio: "inherit",
});

if (result.error) {
  throw result.error;
}

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

if (!existsSync("out")) {
  throw new Error("Expected Next static export directory 'out' to exist.");
}

rmSync("dist", { force: true, recursive: true });
cpSync("out", "dist", { recursive: true });
cpSync(".openai", "dist/.openai", { recursive: true });

mkdirSync("dist/server", { recursive: true });
writeFileSync(
  "dist/server/index.js",
  `function assetRequest(request, pathname) {
  const url = new URL(request.url);
  url.pathname = pathname;
  return new Request(url, request);
}

function candidatePaths(pathname) {
  const cleanPath = pathname === "/" ? "/index.html" : pathname;
  const paths = [cleanPath];

  if (!cleanPath.endsWith(".html") && !cleanPath.includes(".")) {
    paths.push(cleanPath.replace(/\\/$/, "") + ".html");
    paths.push(cleanPath.replace(/\\/$/, "") + "/index.html");
  }

  if (cleanPath !== "/404.html") {
    paths.push("/404.html");
  }

  return paths;
}

export default {
  async fetch(request, env) {
    if (!env.ASSETS?.fetch) {
      return new Response("Static asset binding unavailable.", { status: 500 });
    }

    const url = new URL(request.url);

    for (const pathname of candidatePaths(url.pathname)) {
      const response = await env.ASSETS.fetch(assetRequest(request, pathname));
      if (pathname === "/404.html") {
        return new Response(response.body, {
          headers: response.headers,
          status: 404,
          statusText: "Not Found",
        });
      }

      if (response.status !== 404) {
        return response;
      }
    }

    return new Response("Not found", { status: 404 });
  },
};
`,
);
