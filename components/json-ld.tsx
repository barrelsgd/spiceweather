import type { Person, WithContext } from "schema-dts";
import { env, appBaseUrl } from "@/lib/env";
import { social } from "@/lib/social";

const baseUrl = appBaseUrl;

const person: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Eugine Whint",
  description: "Meteorologist and Software Developer",
  gender: "male",
  nationality: "Grenadian",
  url: baseUrl,
  image: new URL("/profile.jpg", baseUrl).toString(),
  sameAs: Object.values(social).map(({ href }) => href),
  alumniOf: "Victoria University of Wellington",
};

export const JsonLd = () => (
  <script type="application/ld+json">{JSON.stringify(person)}</script>
);
