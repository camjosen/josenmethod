import { z } from "zod/v4";
import { Tool } from "../../../tools/Tool.ts";
import { wordSchema } from "../../utils/words.ts";

const compoundItemSchema = z.tuple([z.string(), z.string()]);

const itemSchema = z.union([compoundItemSchema, wordSchema]);

const base = z.object({
  scaffold: z
    .boolean()
    .optional()
    .describe("Whether to help the student understand the task."),
});

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
  })
  .describe(
    `Teach verbal "blending" without presenting any visuals. The student says words slowly (sounded out without stopping) and also the fast way.`,
  );

export type VerbalBlendingInput = z.infer<typeof inputSchema>;

export const VerbalBlending = {
  name: "VerbalBlending" as const,
  inputSchema,
  call: async (_input) => {
    return { data: [] };
  },
  description: async (_input) => {
    return "";
  },
} satisfies Tool<typeof inputSchema, string[]>;
