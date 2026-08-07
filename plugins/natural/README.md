# Natural

Connect your AI coding agent to [Natural](https://natural.com) - send and request
money, manage agents and customers, and check balances and transactions, from
Claude Code, Codex, or Cursor. Auth is OAuth; you'll be prompted to sign in on
connect.

## Install

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

The plugin bundles two MCP servers: `natural` (`https://mcp.natural.com`) and
`natural-sandbox` (`https://mcp.sandbox.natural.com`) for testing. Each
authenticates separately; disable the one you don't need from your agent's MCP
settings.
