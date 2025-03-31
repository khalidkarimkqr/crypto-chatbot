// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    OPENAI_API_KEY: z.string(),
    KRAKEN_API_KEY: z.string(),
    KRAKEN_API_SECRET: z.string(),
    CMC_API_KEY: z.string(),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {},
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    KRAKEN_API_KEY: process.env.KRAKEN_API_KEY,
    KRAKEN_API_SECRET: process.env.KRAKEN_API_SECRET,
    CMC_API_KEY: process.env.CMC_API_KEY,
  },
});
