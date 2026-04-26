export const READ_SOUNDS_TOOL_NAME = "ReadSounds" as const;

export const READ_SOUNDS_TOOL_DESCRIPTION =
  "Presents sounds for the student to identify and say.";

export const READ_SOUNDS_TOOL_PROMPT = `Use this tool to review sounds the student already knows. For introducing a brand-new sound, use SoundIntroduction instead.

Usage notes:

- Use "reintroduction" for sounds the student knows but hasn't mastered — it re-teaches without the full introduction overhead.
- Use "say_it_slowly" when the student needs to practice holding sounds for blending. It prepares them for word-reading activities.
- Use "say_it_fast" for review once sounds are well-known.
- Use "require_touch" to keep the student actively engaged, especially early on.
- Keep review lists short and focused. Reviewing too many sounds at once dilutes the practice.
`;
