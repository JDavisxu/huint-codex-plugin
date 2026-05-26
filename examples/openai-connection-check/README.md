# Huint OpenAI Connection Check

This example verifies that an OpenAI Responses API workflow can reach Huint's
hosted MCP server with a Huint API key.

It only allows the read-only `get_connection_status` tool. It does not create
tasks, review submissions, or run payout-affecting actions.

## Run

```bash
npm install
cp .env.example .env
```

Edit `.env`, then run:

```bash
npm start
```

Expected result: the response includes Huint connection status with `ok: true`.

## Environment

- `OPENAI_API_KEY`: OpenAI API key for the project running the check.
- `OPENAI_MODEL`: Responses API model to use.
- `HUINT_API_KEY`: Huint API key from the Huint operator portal.
- `HUINT_MCP_URL`: Huint hosted MCP endpoint. The production value is
  `https://mcp.huint.io/mcp`.

## Notes

This is for OpenAI API and agent builders who want to verify Huint from their
own code. Codex users should normally install the Huint plugin and complete
OAuth instead of using an API key directly.
