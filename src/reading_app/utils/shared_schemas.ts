import { z } from "zod/v4";
import { sounds } from "./sounds";

type SoundSymbol = keyof typeof sounds;
const soundSymbols = Object.keys(sounds) as [SoundSymbol, ...SoundSymbol[]];
export const soundSchema = z.enum(soundSymbols);
export type Sound = z.infer<typeof soundSchema>;

export const soundDefinitionSchema = z.object({
  symbol: soundSchema,
  as_in: z.string(),
  whispered: z.boolean().optional(),
  stop: z.boolean().optional(),
  silent: z.boolean().optional(),
});
export type SoundDefinition = z.infer<typeof soundDefinitionSchema>;

export const wordSchema = z.object({
  spelling: z.string().describe("The spelling of the word."),
  sounds: z
    .array(soundDefinitionSchema)
    .describe("The sounds that make up the word."),
  isFunny: z
    .boolean()
    .optional()
    .describe(
      "True if the word is not pronouced the same as the sounds would suggest, like 'was' or 'said'.",
    ),
});
export type Word = z.infer<typeof wordSchema>;
