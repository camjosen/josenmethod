import { z } from "zod/v4";
import { soundDefinitionSchema } from "../../utils/sounds.ts";
import { Tool } from "../../../tools/Tool.ts";
import {
  SOUND_INTRODUCTION_TOOL_DESCRIPTION,
  SOUND_INTRODUCTION_TOOL_NAME,
  SOUND_INTRODUCTION_TOOL_PROMPT,
} from "./Prompt.ts";

export const inputSchema = z
  .object({
    sound: soundDefinitionSchema.describe("The sound to introduce."),
  })
  .describe("Introduce a single new sound to the student.");

export type SoundIntroductionToolInput = z.infer<typeof inputSchema>;

export const SoundIntroductionTool = {
  name: SOUND_INTRODUCTION_TOOL_NAME,
  inputSchema,
  call: async (_input) => {
    return { data: [] };
  },
  description: async (_input) => {
    return SOUND_INTRODUCTION_TOOL_DESCRIPTION;
  },
  prompt: async () => {
    return SOUND_INTRODUCTION_TOOL_PROMPT;
  },
} satisfies Tool<typeof inputSchema, string[]>;
