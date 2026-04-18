import { z } from "zod/v4";
import { wordSchema } from "../../utils/shared_schemas.ts";
import { Tool } from "../../../tools/Tool.ts";

const compoundItemSchema = z.object({
  parts: z.tuple([z.string(), z.string()]),
});

const itemSchema = z.union([wordSchema, compoundItemSchema]);

export const inputSchema = z.object({
  mode: z.enum(["say_it_slow", "say_it_slow_then_fast", "say_it_fast"]),
  items: z.array(itemSchema),
});

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
