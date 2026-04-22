export const READ_WORDS_TOOL_NAME = "ReadWords" as const;

export const READ_WORDS_TOOL_DESCRIPTION =
  "Presents words for the student to decode and read.";

export const READ_WORDS_TOOL_PROMPT = `Use this tool to build decoding skills and word-reading fluency.

Usage notes:

- Only include words whose sounds the student has already been introduced to.
- Use "recall_sounds" + "guided_sound_it_out" for students who are still developing decoding skills.
- Use "sound_it_out" + "say_it_fast" once the student can decode independently.
- Use "teacher_blends" when the student needs a model before attempting a word on their own.
- Use "teach_funny_words" only when introducing an irregular word for the first time.
- Use "teach_silent_letters" only when a word contains a silent letter the student hasn't encountered yet.
- Use "repeat_until_firm" to push toward fluency — the student should be able to read each word without hesitation.
- Keep word lists short. Fewer words read fluently is better than many words read haltingly.
`;
