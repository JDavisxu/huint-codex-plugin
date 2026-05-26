# Huint Codex Plugin

This plugin connects Codex to Huint's hosted MCP server at
`https://mcp.huint.io/mcp`.

## What Codex Gets

- Hosted Streamable HTTP MCP configuration.
- Supabase OAuth as the normal authentication path.
- Huint skill instructions for connection checks, location resolution, task
  creation, and submission review.
- Prompt-gated mutation tools for task lifecycle and payout-affecting actions.
- Read-only connection, capability, geocoding, status, list, and metadata tools
  approved by default.

## Normal Workflow

1. Create or sign into a Huint operator account at
   `https://portal.huint.io/login`. If you start from Codex instead, the OAuth
   browser flow will take you through sign in, sign up, and username setup.
2. Add the Huint marketplace with
   `codex plugin marketplace add JDavisxu/huint-codex-plugin --ref main`.
3. Open `/plugin`, select Huint from the Huint marketplace, and choose Install.
4. Approve the browser OAuth prompt. No Huint API key is required for Codex.
5. Ask Codex: `Check my Huint MCP connection.`
6. Confirm `codex mcp list` includes `huint` as an enabled OAuth server.
7. For task creation, resolve the location first, then create the task with the
   resolver payload unchanged.
8. For review, list pending reviews, fetch metadata/images, then explicitly
   confirm accept or reject.

`get_capabilities` is not required for MCP tool discovery. It is Huint's live
domain reference for spec version, policy, rejection codes, cancellation rules,
and the agent playbook.

Public setup docs live at `https://huint.io/docs`.

OpenAI API and agent builders who use Huint API keys directly can verify their
connection with the read-only example at
`examples/openai-connection-check` in this repository.

## Codex QA Checklist

Run this checklist before publishing a plugin update:

1. Create or sign into a Huint operator account.
2. Fresh install from `/plugin` after adding the marketplace entry.
3. OAuth approval completes without asking for API secrets.
4. `get_connection_status` returns `ok: true`.
5. `get_capabilities` returns the expected `spec_version`.
6. Read-only tools are available without mutation prompts.
7. `create_task`, `cancel_task`, `accept_submission`, and `reject_submission`
   prompt before execution.
8. Expired/disconnected OAuth can be fixed with
   `codex mcp login huint --scopes openid,email`, then
   `get_connection_status`.
9. Disable/re-enable the plugin and confirm the MCP server reloads.

## References

- Codex plugin marketplace and manifest docs:
  https://developers.openai.com/codex/plugins/build
- Codex MCP setup:
  https://developers.openai.com/codex/mcp
