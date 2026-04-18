import { z } from "zod/v4";
import { wordSchema } from "../../utils/shared_schemas.ts";
import { Tool } from "../../../tools/Tool.ts";

export const inputSchema = z.object({
  variant: z
    .enum([
      "default",
      "no_visuals_say_it_fast",
      "no_visuals_sound_it_out",
      "hide_end",
    ] as const)
    .optional()
    .describe(
      "The variant of the activity. 'default' will show the word with all sounds, 'no_visuals' will show the word with no sounds, 'show_start' will show the word with only the starting sound, and 'show_end' will show the word with only the ending sound.",
    ),
  words: z.array(wordSchema),
  teachingTips: z
    .array(z.string())
    .optional()
    .describe(
      "Optional teaching tips to show to the teacher during the activity.",
    ),
});

export type ReadWordsToolInput = z.infer<typeof inputSchema>;

export const ReadWordsTool = {
  name: "ReadWords" as const,
  inputSchema,
  call: async (_input) => {
    return { data: [] };
  },
  description: async (_input) => {
    return "";
  },
} satisfies Tool<typeof inputSchema, string[]>;
