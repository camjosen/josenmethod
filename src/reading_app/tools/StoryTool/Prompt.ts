export const STORY_TOOL_NAME = "Story" as const;

export const STORY_TOOL_DESCRIPTION =
  "Presents a story for the student to practice reading.";

export const STORY_TOOL_PROMPT = `Use this tool to build reading fluency, not to introduce new skills.

Usage notes:

- Keep stories short. If the student is new to story reading, a short sentence or two is enough.
- Push for fluency by having the student read the story multiple times (see the "items" input property).
- Prefer words with sounds that the student is already fluent in.
- Avoid words with sounds that the student hasn't been introduced to yet.
- Avoid funny words that the student hasn't seen before.
- Prefer using familiar proper nouns, especially the name of the student, their family members, their friends, and any characters they might already know.
`;
