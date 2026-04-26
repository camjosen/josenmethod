export const SOUND_INTRODUCTION_TOOL_NAME = "SoundIntroduction" as const;

export const SOUND_INTRODUCTION_TOOL_DESCRIPTION =
  "Introduces a single new sound to the student.";

export const SOUND_INTRODUCTION_TOOL_PROMPT = `Use this tool to introduce one brand-new sound the student has never seen before.

Usage notes:

- Each call introduces exactly one sound. To introduce multiple new sounds in a lesson, use this tool multiple times.
- Follow with a ReadSounds activity (say_it_slowly / say_it_fast) to give the student practice on the new sound alongside known sounds.
`;
