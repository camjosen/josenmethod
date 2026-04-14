A system for orchestrating education

## How it works

`tutors` (LLM orchestration configuration) customize the `loop` (LLM orchestrator) to shepherd human learners (`users`) along `paths` (detailed learning plans) leveraging `evidence` (human knowledge state) for personalization. Learning occurs through `sessions` during which LLMs select and parameterize `tools` (user interfaces) for communicating with humans.

## System components

- `./src/core/evidence` — for storing, organizing, and retrieving evidence of human learning (knowledge state)
- `./src/core/loop` — for LLM orchestration (an "agentic loop") to elicit and record human learning
- `./src/core/paths` — for creating and managing learning paths (detailed syllabi) and viewing learner progress
- `./src/core/sessions` — for running the `engine` and rendering `tools` to interface with `users`
- `./src/core/tools` - for communicating with humans through interfaces parameterized by LLMs, as well as for performing more administrative tasks, such as recording `evidence` of learning
- `./src/core/tutors` — for bundling of LLM orchestration configuration
- `./src/core/users` - for managing user profiles and preferences (e.g., learning preferences)
