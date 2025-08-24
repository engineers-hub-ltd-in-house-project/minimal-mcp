# Minimal MCP Server

A minimal implementation of Model Context Protocol (MCP) server for educational and development purposes.

## Features

This MCP server provides three basic tools:

1. **calculate_sum** - Adds two numbers
2. **reverse_string** - Reverses a text string  
3. **get_current_time** - Returns current ISO timestamp

## Installation

```bash
npm install -g minimal-mcp-server
```

## Usage

### With Claude Code

Add to your Claude Code MCP configuration:

```bash
claude mcp add minimal-mcp-server
```

Or manually configure:

```json
{
  "mcpServers": {
    "minimal-mcp-server": {
      "command": "minimal-mcp-server"
    }
  }
}
```

### Standalone Testing

```bash
npx @modelcontextprotocol/inspector minimal-mcp-server
```

## Tools

### calculate_sum

Calculates the sum of two numbers.

**Parameters:**
- `a` (number): First number
- `b` (number): Second number

**Example:** `calculate_sum(42, 58)` → `100`

### reverse_string

Reverses a text string.

**Parameters:**
- `text` (string): Text to reverse

**Example:** `reverse_string('Hello MCP')` → `'PCM olleH'`

### get_current_time

Returns the current time as an ISO timestamp.

**Parameters:** None

**Example:** `get_current_time()` → `'2025-08-24T01:52:39.749Z'`

## Development

See the main repository: https://github.com/engineers-hub-ltd-in-house-project/minimal-mcp

## License

MIT