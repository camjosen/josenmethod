import type { z } from "zod/v4";

export type AnyDict = z.ZodType<{ [key: string]: unknown }>;

export type ToolOutput<T> = {
  data: T;
};

export type Tool<Input extends AnyDict = AnyDict, Output = unknown> = {
  name: string;
  inputSchema: Input;
  call(input: z.infer<Input>): Promise<ToolOutput<Output>>;
  description(input: z.infer<Input>): Promise<string>;
  prompt(): Promise<string>;
};
