import { z } from "zod/v4";
import { sounds } from "./sounds";

type SoundSymbol = (typeof sounds)[number]["symbol"];
const soundSymbols = sounds.map((s) => s.symbol) as [SoundSymbol, ...SoundSymbol[]];
export const soundSchema = z.enum(soundSymbols);

export const wordSchema = z.object({
  spelling: z.string().describe("The spelling of the word."),
  sounds: z.array(soundSchema).describe("The sounds that make up the word."),
  isFunny: z
    .boolean()
    .optional()
    .describe(
      "True if the word is not pronouced the same as the sounds would suggest, like 'was' or 'said'.",
    ),
});

export type Sound = z.infer<typeof soundSchema>;
export type Word = z.infer<typeof wordSchema>;
