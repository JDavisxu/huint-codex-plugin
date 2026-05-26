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

1. Add or upgrade the Huint marketplace, then restart Codex so the bundled MCP
   server loads into the next session.
2. Complete OAuth when Codex prompts for Huint MCP authentication.
3. Ask Codex: `Check my Huint MCP connection.`
4. Confirm `codex mcp list` includes `huint` as an enabled OAuth server.
5. For task creation, resolve the location first, then create the task with the
   resolver payload unchanged.
6. For review, list pending reviews, fetch metadata/images, then explicitly
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

1. Fresh install from the marketplace entry.
2. OAuth login completes without asking for API secrets.
3. `get_connection_status` returns `ok: true`.
4. `get_capabilities` returns the expected `spec_version`.
5. Read-only tools are available without mutation prompts.
6. `create_task`, `cancel_task`, `accept_submission`, and `reject_submission`
   prompt before execution.
7. Expired/disconnected OAuth can be fixed with re-auth, then
   `get_connection_status`.
8. Disable/re-enable the plugin and confirm the MCP server reloads.

## References

- Codex plugin marketplace and manifest docs:
  https://developers.openai.com/codex/plugins/build
- Codex MCP setup:
  https://developers.openai.com/codex/mcp
