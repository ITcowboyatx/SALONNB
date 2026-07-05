import { cpSync, existsSync, rmSync } from "node:fs";
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
