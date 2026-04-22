export const WRITING_TOOL_NAME = "Writing" as const;

export const WRITING_TOOL_DESCRIPTION =
  "Has the student trace and freehand sounds or words to build symbol familiarity.";

export const WRITING_TOOL_PROMPT = `Use this tool to help the student build familiarity with the shapes of sounds and words. This is not handwriting practice.

Usage notes:

- Use for sounds or words the student is struggling to recognize visually.
- Prioritize recently introduced sounds and words over ones the student already knows well.
- Keep the item list short — a few sounds or words per activity is enough.
- Do not use this tool as a reward or filler. Every item should serve a specific recognition goal.
`;
