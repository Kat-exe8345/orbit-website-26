"use server";

import { getPayload } from "payload";
import config from "@payload-config";

const payload = await getPayload({ config });

export async function getAllMedia() {
  const res = await payload.find({
    collection: "about-us-media",
    sort: "createdAt",
  });
  const result = res.docs.map((doc) => {
    return {
      id: doc.id,
      alt: doc.alt,
      caption: doc.caption,
      url: doc.url,
    };
  });
  return result;
}
