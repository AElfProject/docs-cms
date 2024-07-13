import { z } from "zod";

export const searchConfigSchema = z.object({
  index: z.string(),
  host: z.string(),
  apikey: z.string(),
});
