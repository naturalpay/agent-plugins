# Natural Agent Plugins

Official Natural plugin marketplace for AI coding agents.

## Natural MCP

The `natural` plugin connects Claude Code and Codex to Natural's hosted OAuth
MCP server at `https://mcp.natural.co`.

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
