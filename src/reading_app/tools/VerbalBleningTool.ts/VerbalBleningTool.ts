import { z } from "zod/v4";
import type { Tool } from "../../../tools/Tool.ts";
import { wordSchema } from "../../utils/words.ts";
import {
  VERBAL_BLENDING_TOOL_DESCRIPTION,
  VERBAL_BLENDING_TOOL_NAME,
  VERBAL_BLENDING_TOOL_PROMPT,
} from "./Prompt.ts";

const compoundItemSchema = z.tuple([z.string(), z.string()]);

const itemSchema = z.union([compoundItemSchema, wordSchema]);

export const inputSchema = z
  .object({
    flow: z
      .array(
        z.union([
          z
            .literal("guided_blending")
            .describe(
              "The student and teacher blend the sounds together without stopping.",
            ),
          z
            .literal("blend")
            .describe("The student says the sounds slowly without stopping."),
          z.literal("say_it_fast").describe("The student says the word fast."),
        ]),
      )
      .nonempty()
      .describe("The student tasks for each item."),
    items: z.array(itemSchema),
    modifications: z
      .array(
        z.union([
          z
            .literal("repeat_until_firm")
            .describe("Repeat activity until fluency is achieved."),
        ]),
      )
      .optional()
      .describe("Activity-level modifications"),
  })
  .describe(
    `Teach verbal "blending" without presenting any visuals. The student says words slowly (sounded out without stopping) and also the fast way.`,
  );

export type VerbalBlendingInput = z.infer<typeof inputSchema>;

export const VerbalBlending = {
  name: VERBAL_BLENDING_TOOL_NAME,
  inputSchema,
  call: async (_input) => {
    return { data: [] };
  },
  description: async (_input) => {
    return VERBAL_BLENDING_TOOL_DESCRIPTION;
  },
  prompt: async () => {
    return VERBAL_BLENDING_TOOL_PROMPT;
  },
} satisfies Tool<typeof inputSchema, string[]>;
