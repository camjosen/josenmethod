export const RHYMING_TOOL_NAME = "Rhyming" as const;

export const RHYMING_TOOL_DESCRIPTION =
  "Has the student blend a starting sound with a spoken word ending to form a rhyme.";

export const RHYMING_TOOL_PROMPT = `Use this tool as a bridge between sound reading and full word reading. Only the starting sound is shown visually; the teacher provides the ending.

Usage notes:

- Use when the student is not yet ready to decode entire words on their own.
- Use "teacher_models" when introducing the rhyming task for the first time or when the student is confused about what is expected.
- Use "read_start" to have the student identify the visual starting sound.
- Use "hear_ending" to let the teacher say the word ending aloud before the student blends.
- Use "blend" + "say_it_fast" to complete the word.
- Choose items whose starting sounds the student already knows well.
`;
