# Minimal MCP

A minimal implementation of Model Context Protocol (MCP) server and client for educational and development purposes.

## Project Structure

```
minimal-mcp/
├── server/          # MCP Server (TypeScript)
├── client/          # MCP Client (Python)
└── README.md
```

## Prerequisites

- Node.js 18+
- Python 3.8+
- TypeScript

## Server Setup

### Install Dependencies

```bash
cd server
npm install
```

### Build Server

```bash
npm run build
```

### Test Server

```bash
npm run inspector
```

Open `http://localhost:5173` in your browser to test the server tools.

## Client Setup

### Create Virtual Environment

```bash
cd client
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Configure Environment

```bash
cp .env.example .env
# Edit .env and add your OpenAI API key
```

### Run Client

```bash
python client.py
```

## Available Tools

The MCP server provides three tools:

1. **calculate_sum**: Adds two numbers
2. **reverse_string**: Reverses a text string
3. **get_current_time**: Returns current ISO timestamp

## Claude Code Integration

### Add MCP Server

Create `mcp_config.json`:

```json
{
  "mcpServers": {
    "minimal-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/minimal-mcp/server/build/index.js"]
    }
  }
}
```

### Usage in Claude Code

```
Using the minimal-mcp tools:
1. Calculate the sum of 123 and 456
2. Reverse the text "Model Context Protocol"  
3. Get the current time
```

## Development

### Server Development

```bash
cd server
npm run watch  # Auto-rebuild on changes
```

### Adding New Tools

Edit `server/src/index.ts` and add new tools:

```typescript
server.tool(
  "tool_name",
  {
    param: z.string().describe("Parameter description")
  },
  async ({ param }) => {
    return {
      content: [
        {
          type: "text",
          text: `Result: ${param}`
        }
      ]
    };
  }
);
```

## Troubleshooting

### Permission Denied

```bash
chmod +x server/build/index.js
```

### Port Already in Use

```bash
npm run inspector -- --port 5174
```

### Module Not Found

Check Node.js version and ensure all dependencies are installed:

```bash
node --version  # Should be 18+
npm install
```

## License

MIT