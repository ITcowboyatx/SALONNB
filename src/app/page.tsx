import Image from "next/image";
import {
  business,
  galleryImages,
  imageAssets,
  navItems,
  sectionCopy,
  services,
} from "@/data/site";

const addressLine = `${business.address.street}, ${business.address.unit}, ${business.address.city}, ${business.address.state} ${business.address.postalCode}`;
const encodedAddress = encodeURIComponent(addressLine);

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: business.name,
  description: business.description,
  url: business.domain,
  telephone: business.phone,
  image: `${business.domain}${business.logo}`,
  slogan: business.tagline,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${business.address.street}, ${business.address.unit}`,
    addressLocality: business.address.city,
    addressRegion: business.address.state,
    postalCode: business.address.postalCode,
    addressCountry: "US",
  },
  areaServed: [
    "New Braunfels",
    "Gruene",
    "San Marcos",
    "Canyon Lake",
    "Seguin",
  ],
  sameAs: [business.facebookUrl],
  makesOffer: services.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.name,
      description: service.description,
    },
  })),
};

function AppointmentButton({
  children = "Contact to Schedule",
  variant = "primary",
}: {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
}) {
  const styles = {
    primary:
      "bg-[#c91522] text-white shadow-[0_14px_30px_rgba(201,21,34,0.28)] hover:bg-[#a90f19]",
    secondary:
      "border border-neutral-950 bg-white text-neutral-950 hover:border-[#c91522] hover:text-[#c91522]",
    light:
      "bg-white text-neutral-950 shadow-[0_14px_30px_rgba(0,0,0,0.25)] hover:bg-[#f6c744]",
  };

  return (
    <a
      href="#contact"
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-bold uppercase tracking-[0.16em] transition ${styles[variant]}`}
    >
      {children}
    </a>
  );
}

function SectionIntro({
  eyebrow,
  title,
  children,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p
        className={`text-xs font-bold uppercase tracking-[0.28em] ${
          dark ? "text-[#f6c744]" : "text-[#c91522]"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 font-display text-4xl leading-tight sm:text-5xl ${
          dark ? "text-white" : "text-neutral-950"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-4 text-base leading-8 ${
          dark ? "text-white/75" : "text-neutral-600"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />

      <div className="min-h-screen bg-white text-neutral-950">
        <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <a href="#home" className="flex items-center gap-3">
              <Image
                src={business.logo}
                alt="Salon NB logo"
                width={180}
                height={180}
                priority
                className="h-auto w-16 sm:w-20"
              />
            </a>
            <nav
              aria-label="Primary navigation"
              className="hidden items-center gap-6 text-xs font-bold uppercase tracking-[0.16em] text-neutral-700 lg:flex"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-[#c91522]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <AppointmentButton>Contact</AppointmentButton>
          </div>
          <nav
            aria-label="Mobile navigation"
            className="flex gap-5 overflow-x-auto border-t border-neutral-100 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-neutral-700 lg:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="shrink-0 transition hover:text-[#c91522]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </header>

        <main id="home">
          <section className="overflow-hidden bg-neutral-950 text-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:py-20">
              <div className="max-w-2xl">
                <div className="inline-flex bg-white p-4">
                  <Image
                    src={business.logo}
                    alt="Salon NB logo"
                    width={260}
                    height={260}
                    priority
                    className="h-auto w-40 sm:w-52"
                  />
                </div>
                <p className="mt-8 text-sm font-bold uppercase tracking-[0.32em] text-[#f6c744]">
                  {sectionCopy.hero.eyebrow}
                </p>
                <h1 className="mt-4 font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
                  {business.tagline}
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
                  {sectionCopy.hero.body}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <AppointmentButton variant="light" />
                  <a
                    href="#services"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:border-[#f6c744] hover:text-[#f6c744]"
                  >
                    {sectionCopy.hero.secondaryCta}
                  </a>
                </div>
              </div>

              <div className="relative min-h-[420px] sm:min-h-[520px]">
                <div className="absolute left-0 top-0 h-[74%] w-[82%] overflow-hidden rounded-lg border border-white/10">
                  <Image
                    src={imageAssets.heroBuilding.src}
                    alt={imageAssets.heroBuilding.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 48vw, 82vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 h-[47%] w-[56%] overflow-hidden rounded-lg border-8 border-neutral-950 bg-neutral-900">
                  <Image
                    src={imageAssets.salonDetail.src}
                    alt={imageAssets.salonDetail.alt}
                    fill
                    sizes="(min-width: 1024px) 26vw, 56vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-8 left-4 max-w-[230px] rounded-lg bg-white p-5 text-neutral-950 shadow-2xl sm:left-8">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#c91522]">
                    {sectionCopy.hero.appointmentCardEyebrow}
                  </p>
                  <p className="mt-2 font-display text-2xl leading-tight">
                    {sectionCopy.hero.appointmentCardBody}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            id="services"
            className="bg-white px-4 py-20 sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-7xl">
              <SectionIntro
                eyebrow={sectionCopy.services.eyebrow}
                title={sectionCopy.services.title}
              >
                {sectionCopy.services.body}
              </SectionIntro>

              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <article
                    key={service.name}
                    className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#c91522] hover:shadow-xl"
                  >
                    <div className="mb-5 h-1 w-12 bg-[#f6c744]" />
                    <h3 className="font-display text-2xl text-neutral-950">
                      {service.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-neutral-600">
                      {service.description}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <AppointmentButton>{sectionCopy.services.cta}</AppointmentButton>
              </div>
            </div>
          </section>

          <section
            id="gallery"
            className="bg-[#f7f3ef] px-4 py-20 sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-7xl">
              <SectionIntro
                eyebrow={sectionCopy.gallery.eyebrow}
                title={sectionCopy.gallery.title}
              >
                {sectionCopy.gallery.body}
              </SectionIntro>

              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {galleryImages.map((image, index) => (
                  <figure
                    key={image.src}
                    className={`group overflow-hidden rounded-lg bg-neutral-950 ${
                      index === 1 || index === 4 ? "sm:row-span-2" : ""
                    }`}
                  >
                    <div
                      className={`relative ${
                        index === 1 || index === 4
                          ? "aspect-[4/5] sm:h-full"
                          : "aspect-[4/5]"
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                          {image.label}
                        </span>
                      </figcaption>
                    </div>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          <section id="bridal" className="bg-neutral-950 text-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg sm:aspect-[16/12] lg:aspect-[4/5]">
                <Image
                  src={imageAssets.bridal.src}
                  alt={imageAssets.bridal.alt}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#f6c744]">
                  {sectionCopy.bridal.eyebrow}
                </p>
                <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                  {sectionCopy.bridal.title}
                </h2>
                <p className="mt-5 text-lg leading-8 text-white/75">
                  {sectionCopy.bridal.body}
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {sectionCopy.bridal.features.map((item) => (
                    <div
                      key={item}
                      className="rounded-lg border border-white/15 p-4 text-sm font-bold uppercase tracking-[0.16em]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <AppointmentButton variant="light">
                    {sectionCopy.bridal.cta}
                  </AppointmentButton>
                </div>
              </div>
            </div>
          </section>

          <section id="about" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c91522]">
                  {sectionCopy.about.eyebrow}
                </p>
                <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                  {sectionCopy.about.title}
                </h2>
                <p className="mt-5 text-lg leading-8 text-neutral-600">
                  {sectionCopy.about.body}
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {sectionCopy.about.values.map(([title, copy]) => (
                    <div key={title} className="border-l-4 border-[#f6c744] pl-4">
                      <p className="font-display text-2xl">{title}</p>
                      <p className="mt-2 text-sm leading-6 text-neutral-600">
                        {copy}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative min-h-[520px] sm:min-h-[560px]">
                <div className="absolute right-0 top-0 h-[72%] w-[88%] overflow-hidden rounded-lg bg-neutral-100">
                  <Image
                    src={imageAssets.about.src}
                    alt={imageAssets.about.alt}
                    fill
                    sizes="(min-width: 1024px) 42vw, 88vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 h-[48%] w-[62%] overflow-hidden rounded-lg border-8 border-white bg-neutral-100 shadow-2xl">
                  <Image
                    src={imageAssets.interiorShampooRoom.src}
                    alt={imageAssets.interiorShampooRoom.alt}
                    fill
                    sizes="(min-width: 1024px) 28vw, 62vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-8 right-0 max-w-[230px] rounded-lg bg-neutral-950 p-5 text-white shadow-2xl sm:right-6">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f6c744]">
                    Rooted Here
                  </p>
                  <p className="mt-2 font-display text-2xl leading-tight">
                    Local salon energy, polished work, and a chair that feels
                    easy to come back to.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            id="contact"
            className="bg-[#c91522] px-4 py-20 text-white sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-7xl">
              <SectionIntro
                eyebrow={sectionCopy.contact.eyebrow}
                title={sectionCopy.contact.title}
                dark
              >
                {sectionCopy.contact.body.replace("{address}", addressLine)}
              </SectionIntro>

              <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-lg bg-white p-6 text-neutral-950 shadow-2xl sm:p-8">
                  <h3 className="font-display text-3xl">
                    {sectionCopy.contact.cardTitle}
                  </h3>
                  <address className="mt-4 not-italic leading-7 text-neutral-700">
                    {business.address.street}
                    <br />
                    {business.address.unit}
                    <br />
                    {business.address.city}, {business.address.state}{" "}
                    {business.address.postalCode}
                  </address>
                  <div className="mt-6 divide-y divide-neutral-200 border-y border-neutral-200 text-sm font-semibold">
                    <a
                      href={business.phoneHref}
                      className="block py-4 transition hover:text-[#c91522]"
                    >
                      {business.phone}
                    </a>
                    <a
                      href={business.facebookUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block py-4 transition hover:text-[#c91522]"
                    >
                      {business.facebookLabel}
                    </a>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
                      target="_blank"
                      rel="noreferrer"
                      className="block py-4 transition hover:text-[#c91522]"
                    >
                      Get Directions
                    </a>
                  </div>
                  <div className="mt-8">
                    <AppointmentButton>Contact to Schedule</AppointmentButton>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="rounded-lg bg-neutral-950 p-6">
                    <h3 className="font-display text-3xl">Hours</h3>
                    <ul className="mt-5 space-y-3 text-sm leading-6 text-white/75">
                      {business.hours.map((hour) => (
                        <li key={hour}>{hour}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="min-h-[330px] overflow-hidden rounded-lg bg-white text-neutral-950">
                    <div className="relative h-full min-h-[330px] bg-[#f7f3ef]">
                      <iframe
                        title="Google Map to Salon NB in New Braunfels"
                        src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0 h-full w-full border-0"
                      />
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
                      <div className="absolute bottom-5 left-5 right-5 rounded-lg bg-white p-5 shadow-xl">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c91522]">
                          {sectionCopy.contact.mapEyebrow}
                        </p>
                        <p className="mt-2 text-sm font-semibold leading-6">
                          {business.address.street}, {business.address.unit}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-neutral-950 px-4 py-10 text-white sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <Image
                src={business.logo}
                alt="Salon NB logo"
                width={180}
                height={180}
                className="h-auto w-20 bg-white p-2"
              />
              <p className="mt-4 max-w-md text-sm leading-6 text-white/65">
                {business.tagline} {sectionCopy.footer}
              </p>
            </div>
            <div className="grid gap-3 text-sm font-semibold text-white/75 sm:grid-cols-3 md:text-right">
              <a href={business.phoneHref} className="hover:text-[#f6c744]">
                {business.phone}
              </a>
              <a
                href={business.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#f6c744]"
              >
                Facebook
              </a>
              <a href="#contact" className="hover:text-[#f6c744]">
                Appointments
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
