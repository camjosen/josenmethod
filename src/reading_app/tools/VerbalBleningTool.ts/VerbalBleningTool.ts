import { z } from "zod/v4";
import { wordSchema } from "../../utils/shared_schemas.ts";
import { Tool } from "../../../tools/Tool.ts";

const compoundItemSchema = z.tuple([z.string(), z.string()]);

const itemSchema = z.union([compoundItemSchema, wordSchema]);

const base = z.object({
  scaffold: z
    .boolean()
    .optional()
    .describe("Whether to help the student understand the task."),
});

export const inputSchema = z
  .discriminatedUnion("variant", [
    base
      .extend({
        variant: z.literal("say_it_fast"),
        items: z.array(itemSchema),
      })
      .describe(
        "The teacher says the sounds slowly without stopping, then the student says the word fast.",
      ),
    base
      .extend({
        variant: z.literal("say_it_slow"),
        items: z.array(itemSchema),
      })
      .describe(
        "The teacher helps the student say the sounds slowly without stopping.",
      ),
    base
      .extend({
        variant: z.literal("say_it_slow_then_fast"),
        items: z.array(itemSchema),
      })
      .describe(
        "The teacher helps the student say the sounds slowly without stopping, then fast.",
      ),
  ])
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
