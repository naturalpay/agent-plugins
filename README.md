# Natural Agent Plugins

Official Natural plugin marketplace for AI coding agents.

## Natural MCP

The `natural` plugin connects Claude Code, Codex, and Cursor to Natural's
hosted OAuth MCP server at `https://mcp.natural.co`.

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

To test a local checkout before the marketplace listing is live:

```sh
ln -s "$(pwd)/plugins/natural" ~/.cursor/plugins/local/natural
```

Then reload Cursor (`Developer: Reload Window`) and enable the `natural` MCP
server when prompted.
