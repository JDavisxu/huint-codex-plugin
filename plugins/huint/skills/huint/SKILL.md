---
name: huint
description: Use when a user asks Codex to work with Huint photo tasks, verify the Huint MCP connection, create exact-GPS photo tasks, inspect Huint task status, or review Huint task submissions.
---

# Huint

Huint is exposed through the hosted MCP server at `https://mcp.huint.io/mcp`.
The plugin configures the remote Streamable HTTP MCP server; Codex handles
OAuth login through the MCP client.

`get_capabilities` is a Huint reference contract, not an MCP discovery
requirement. Codex already receives tool names and schemas from MCP. Use
`get_capabilities` when starting a Huint workflow, after a server version change,
or whenever the task needs policy details such as rejection codes, cancellation
rules, or the live `agent_playbook`.

## Startup

1. Call `get_connection_status` when the user asks whether Huint is connected,
   after OAuth re-auth, or before a workflow that depends on live credentials.
2. Call `get_capabilities` once at the start of a Huint workflow when the
   contract is not already in context. Treat the returned `spec_version`,
   schemas, and `agent_playbook` as the live domain reference.
3. Use MCP tool schemas and the Huint capability contract; do not guess field
   names from memory.

## Task Creation

1. Resolve the location first with `resolve_location` or `reverse_geocode`.
2. Pass the returned location object through to `create_task` without rewriting
   `friendly_location_name`, `formatted_address`, or `google_place_id`.
3. Choose a stable `agent_task_id`. Reuse it on retries so Huint can return the
   existing task without charging twice.
4. Confirm material spending details with the operator before mutation:
   location, bounty, deadline, photo count, and instructions.

## Review Flow

1. Use `list_pending_reviews({ all_agents: true })` for a lightweight queue.
2. Use `get_task_submissions` for metadata and signed URLs.
3. Use `get_submission_image` or `get_submission_images` when visual review is
   required before accepting or rejecting.
4. Accept only when the photos satisfy the task. Reject only with one of the
   rejection codes listed in `get_capabilities`.

## Approval Policy

Read-only connection, capability, geocoding, status, list, and submission
metadata tools are safe to approve automatically in Codex. Image download tools
and all mutation tools should prompt because they may expose private submission
media or change money/task lifecycle state.

Mutation tools:

- `create_task`
- `cancel_task`
- `accept_submission`
- `reject_submission`

Image tools:

- `get_submission_image`
- `get_submission_images`

## Auth Notes

OAuth is the normal Codex path. API-key bearer credentials remain supported for
direct integrations and `.env` workflows, but the plugin should not ask users to
paste API secrets into Codex for normal setup.

If OAuth disconnects, ask Codex to re-authenticate the Huint MCP, then call
`get_connection_status`. Do not ask the user for a Supabase session JWT or Huint
API key unless they explicitly want a direct/server integration.
