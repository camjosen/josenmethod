export const VERBAL_BLENDING_TOOL_NAME = "VerbalBlending" as const;

export const VERBAL_BLENDING_TOOL_DESCRIPTION =
  "Has the student practice blending sounds into words without any visual aids.";

export const VERBAL_BLENDING_TOOL_PROMPT = `Use this tool to build the student's ability to blend sounds into words before or alongside visual word reading.

Usage notes:

- Use early in the curriculum, before the student is reading full words.
- No visuals are shown — this is purely an auditory and verbal exercise.
- Use "guided_blending" to walk the student through blending with teacher support.
- Use "blend" once the student can say the sounds slowly on their own.
- Use "say_it_fast" to complete the blending into a real word.
- Set "scaffold" to true when the student is new to the task or struggling to understand what is expected.
- Use "repeat_until_firm" until the student can blend each item without hesitation.
- Use compound items (two-part tuples) to break a word into a starting sound and an ending chunk.
`;
