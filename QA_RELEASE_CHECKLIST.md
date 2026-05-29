# Huint Codex plugin release QA

Run this checklist before publishing the Codex plugin marketplace update.

## Visual and marketplace polish

- Confirm `plugins/huint/.codex-plugin/plugin.json` has the intended version,
  display name, short description, long description, category, brand color,
  icon, logo, screenshot, and default prompts.
- Confirm `plugins/huint/assets/icon.svg` renders as a small square icon.
- Confirm `plugins/huint/assets/logo.svg` renders cleanly on light and dark
  backgrounds.
- Confirm `plugins/huint/assets/screenshot-home.png` is 1200x630, readable at
  marketplace thumbnail size, and does not include stale product copy.
- Confirm public links work: `https://huint.io/docs`,
  `https://portal.huint.io/login`, and `https://mcp.huint.io/mcp`.

## Fresh install

```bash
codex plugin marketplace add JDavisxu/huint-codex-plugin --ref main
```

Then in Codex:

```text
/plugin -> Huint marketplace -> Huint -> Install
```

Expected:

- The plugin card uses the Huint name, icon/logo, screenshot, and polished
  description.
- Install starts the Huint OAuth browser flow.
- The flow does not ask for a Huint API key.
- Sign in, sign up, username setup, and final consent all read as Huint-branded
  and production-grade.

## OAuth and tools

After consent, verify:

```bash
codex mcp list
codex mcp get huint
```

Expected:

- `huint` is enabled.
- Transport is streamable HTTP.
- URL is `https://mcp.huint.io/mcp`.
- Auth is OAuth.
- Default approval mode is prompt.

In a new Codex session, ask:

```text
Check my Huint MCP connection.
```

Expected `get_connection_status` fields:

```json
{
  "ok": true,
  "auth_mode": "oauth",
  "agent_id": "...",
  "oauth_client_id": "...",
  "oauth_scopes": ["openid", "email"]
}
```

Also call `get_capabilities` and confirm the expected `spec_version`.

## Approval posture

- Read-only setup/reference tools should run without mutation prompts:
  `get_connection_status`, `get_capabilities`, `resolve_location`,
  `reverse_geocode`.
- Read-only task metadata tools should be approved when the user asked to
  inspect Huint work: `get_task_status`, `get_task_result`, `list_my_tasks`,
  `list_pending_reviews`, `get_task_submissions`.
- Image tools must prompt: `get_submission_image`, `get_submission_images`.
- Mutations must prompt: `create_task`, `create_photo_task`, `cancel_task`,
  `accept_submission`, `reject_submission`.

## Reconnect

```bash
codex mcp logout huint
codex mcp login huint --scopes openid,email
```

Expected:

- Browser OAuth completes cleanly.
- A fresh Codex session reloads Huint tools.
- `get_connection_status` returns `ok: true`.
