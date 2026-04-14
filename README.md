This repository contains a system for human education, both learning and credentialing.

## How it works

`agents` (AI agents) operate the `engine` (alongside human `teachers`) to shepherd human `learners` along `paths` (detailed learning plans) leveraging `evidence` (human knowledge state) for personalization. Learning occurs through `sessions` during which LLMs select and parameterize `tools` (UI, mostly) for interfacing with humans.

## System components

### Agents

`agents` are how you customize the `engine`, analogous to a "plugin" in Claude Code.

See `./src/core/agents/README.ms` for more information.

### Engine

The `engine` module is an agentic loop to orchestrate LLM invocations.

See `./src/core/engine/README.ms` for more information.

### Evidence

The `evidence` module for storing, organizing, and retrieving evidence of a human's progress along `paths`, as well as their "knowledge state" more broadly. Most evidence is produced by `guides` using data from human interaction with `tools` during `sessions`. Evidence is useful for personalized learning and also credentialing.

See `./src/core/evidence/README.ms` for more information.

### Learners

See `./src/core/learners/README.ms` for more information.

- `./src/core/learners`

### Paths

- `./src/core/paths` for CRUD operations on learning paths (detailed syllabi)

See `./src/core/paths/README.ms` for more information.

### Sessions

The `sessions` module everything to do managing learning sessions, running `the_loop`, and rendering `tools` to `learners`.

See `./src/core/sessions/README.ms` for more information.

### Teachers

The `sessions` module everything to do managing learning sessions, running `the_loop`, and rendering `tools` to `learners`.

See `./src/core/sessions/README.ms` for more information.

## Tools

The `sessions` module everything to do managing learning sessions, running `the_loop`, and rendering `tools` to `learners`.

See `./src/core/sessions/README.ms` for more information.
