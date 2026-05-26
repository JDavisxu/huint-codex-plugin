# Huint Codex Plugin Marketplace

This repository distributes the Huint Codex plugin.

Huint connects Codex to the hosted Huint MCP server:

```text
https://mcp.huint.io/mcp
```

## Install

Add this marketplace to Codex:

```bash
codex plugin marketplace add JDavisxu/huint-codex-plugin --ref main
```

For the smallest checkout, use sparse paths:

```bash
codex plugin marketplace add JDavisxu/huint-codex-plugin --ref main --sparse .agents/plugins --sparse plugins/huint
```

Then open Codex Plugins, select the Huint marketplace, install **Huint**, and
complete OAuth when prompted.

## Verify

In a Codex session, ask:

```text
Check my Huint MCP connection.
```

Codex should call `get_connection_status` and return `ok: true`.

## Contents

```text
.agents/plugins/marketplace.json
plugins/huint/
```

`get_capabilities` is Huint's live domain reference for spec version, workflow
policy, rejection codes, cancellation rules, and the agent playbook. It is not
required for MCP tool discovery because Codex already receives tool names and
schemas through MCP.

## Source Product

The hosted MCP server and Huint product code live in the main Huint repository.
This repository intentionally contains only the Codex plugin marketplace package.

## References

- Codex plugin marketplaces and Git-backed installs:
  https://developers.openai.com/codex/plugins/build
- Codex MCP configuration:
  https://developers.openai.com/codex/mcp
