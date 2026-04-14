A system for orchestrating education

## How it works

`guides` (LLM orchestration configuration) customize the `learning_loop` (LLM orchestrator) to shepherd human learners (`users`) along `paths` (detailed learning plans) leveraging `evidence` (human knowledge state) for personalization. Learning occurs through `sessions` during which LLMs select and parameterize `tools` (user interfaces) for communicating with humans.

## System components

- `./src/evidence` — for storing, organizing, and retrieving evidence of human learning (knowledge state)
- `./src/guides` — for bundling of LLM orchestration configuration. A guide is kind of like a tutor.
- `./src/learning_loop` — for LLM orchestration (an "agentic loop") to elicit and record human learning
- `./src/paths` — for creating and managing learning paths (detailed syllabi) and viewing learner progress
- `./src/sessions` — for running the `engine` and rendering `tools` to interface with `users`
- `./src/tools` - for communicating with humans through interfaces parameterized by LLMs, as well as for performing more administrative tasks, such as recording `evidence` of learning
- `./src/users` - for managing user profiles and preferences (e.g., learning preferences)

## App

- `./src/backend` - contains the core API, server, data model, and storage configuration. Business logic is scattered across the system component directories.
- `./src/web_frontend` - contains most frontent code, although some components (e.g., for tools) are scattered across the system component directories.
