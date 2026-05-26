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

The marketplace marks Huint as `INSTALLED_BY_DEFAULT`, so Codex should install
and enable the plugin from the marketplace entry. Restart Codex after adding or
upgrading the marketplace so the bundled MCP server is loaded into the next
session.

If you are testing a local checkout or an older Codex build, install explicitly:

```bash
codex plugin add huint@huint
```

Then complete OAuth when prompted.

Public setup docs live at:

```text
https://huint.io/docs
```

## Verify

In a Codex session, ask:

```text
Check my Huint MCP connection.
```

Codex should call `get_connection_status` and return `ok: true`.

You can also verify that Codex has loaded the MCP server:

```bash
codex mcp list
```

The list should include:

```text
huint  https://mcp.huint.io/mcp  enabled  OAuth
```

For OpenAI API or agent workflows that use a Huint API key directly, run the
read-only example in `examples/openai-connection-check`.

## Contents

```text
.agents/plugins/marketplace.json
examples/openai-connection-check/
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
