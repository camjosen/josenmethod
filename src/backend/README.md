# Stack

- Bun (runtime)
- tRPC with the fetch adapter (API layer)
- Zod (input validation, comes naturally with tRPC)
- Drizzle + PostgreSQL (database)

## API

Each of the main entities (evidence, guides, paths, sessions, users, tools) should expose it's own API. The overall backend API is a thin wrapper aroudn those APIs.
