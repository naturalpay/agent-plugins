# Natural

Connect your AI coding agent to [Natural](https://natural.co) - send and request
money, manage agents and customers, and check balances and transactions, from
Claude Code or Codex. Auth is OAuth; you'll be prompted to sign in on connect.

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

The MCP endpoint is `https://mcp.natural.co`.
