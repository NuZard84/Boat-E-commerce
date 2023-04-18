import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "7op624l5",
  dataset: "production",
  apiVersion: "2023-04-12",
  useCdn: true,
  token: process.env.NEXT_SANITY_TOKEN || "",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
