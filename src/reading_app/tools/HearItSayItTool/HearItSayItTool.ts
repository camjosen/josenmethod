import { z } from "zod/v4";
import { wordSchema } from "../../utils/shared_schemas.ts";
import { Tool } from "../../../tools/Tool.ts";

const compoundItemSchema = z.tuple([z.string(), z.string()]);

const itemSchema = z.union([compoundItemSchema, wordSchema]);

const base = z.object({
  scaffold: z
    .boolean()
    .optional()
    .describe(
      "Whether the first item should be presented in a scaffolded fashion.",
    ),
});

export const inputSchema = z.discriminatedUnion("mode", [
  base
    .extend({
      mode: z.literal("say_it_fast"),
      items: z.array(itemSchema),
    })
    .describe(
      "The teacher says the sounds slowly without stopping, then the student says them quickly.",
    ),
  base
    .extend({
      mode: z.literal("say_it_slow"),
      items: z.array(itemSchema),
    })
    .describe("The teacher says the sounds slowly, then the student does too."),
  base
    .extend({
      mode: z.literal("say_it_slow_then_fast"),
      items: z.array(itemSchema),
    })
    .describe(
      "The teacher says the sound slowly, the the student does too, the the student says them quickly.",
    ),
]);

export type HearItSayItToolInput = z.infer<typeof inputSchema>;

export const HearItSayItTool = {
  name: "HearItSayIt" as const,
  inputSchema,
  call: async (_input) => {
    return { data: [] };
  },
  description: async (_input) => {
    return "";
  },
} satisfies Tool<typeof inputSchema, string[]>;
