# Natural Agent Plugins

Official Natural plugin marketplace for AI coding agents.

## Natural MCP

The `natural` plugin connects Claude Code, Codex, and Cursor to Natural's
hosted OAuth MCP server at `https://mcp.natural.com`. It also bundles the
sandbox MCP server at `https://mcp.sandbox.natural.com` for testing.

### Claude Code

```text
/plugin marketplace add naturalpay/agent-plugins
/plugin install natural@natural
/reload-plugins
/mcp
```

Select `natural`, then authenticate when prompted.

### Codex

```text
codex plugin marketplace add naturalpay/agent-plugins
/plugins
```

Open the plugin directory, install `Natural`, and authenticate when prompted.

### Cursor

Install `Natural` from the [Cursor marketplace](https://cursor.com/marketplace),
then authenticate when prompted.
