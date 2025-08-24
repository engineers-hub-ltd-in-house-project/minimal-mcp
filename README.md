# Minimal MCP

A minimal implementation of Model Context Protocol (MCP) server and client for
educational and development purposes.

## Project Structure

```
minimal-mcp/
├── server/          # MCP Server (TypeScript)
├── client/          # MCP Client (Python)
└── README.md
```

## Prerequisites

- Node.js 22+
- Python 3.13+
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

Open the URL shown in the terminal (typically `http://localhost:6274/`) to test
the server tools.

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

Create `.env` file with your OpenAI API key:

```bash
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
```

### Run Client

```bash
python client.py
```

## Available Tools

The MCP server provides three tools:

1. **calculate_sum**: Adds two numbers
   - Parameters: `a` (number), `b` (number)
   - Example: `calculate_sum(42, 58)` → `100`

2. **reverse_string**: Reverses a text string
   - Parameters: `text` (string)
   - Example: `reverse_string('Hello MCP')` → `'PCM olleH'`

3. **get_current_time**: Returns current ISO timestamp
   - Parameters: none
   - Example: `get_current_time()` → `'2025-08-24T01:52:39.749Z'`

## Usage Methods

### Method 1: Direct Client Testing

Run the Python client to test all tools:

```bash
cd client
python client.py
```

This will automatically:

1. Connect to the MCP server
2. Execute all three tools with sample data
3. Display results

### Method 2: Claude Code Integration

Add MCP server to Claude Code configuration:

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

Then use in Claude Code:

```
Using the minimal-mcp tools:
1. Calculate the sum of 123 and 456
2. Reverse the text "Model Context Protocol"
3. Get the current time
```

### Method 3: MCP Inspector

Use the official MCP inspector for interactive testing:

```bash
cd server
npm run inspector
```

Open the URL shown in the terminal to test tools interactively in the browser.

## Development

### Server Development

```bash
cd server
npm run watch  # Auto-rebuild on changes
```

### Adding New Tools

Edit `server/src/index.ts` to add new tools:

1. **Add tool definition to the `tools` array:**

```typescript
{
  name: "your_tool_name",
  description: "Description of what the tool does",
  inputSchema: {
    type: "object",
    properties: {
      param: { type: "string", description: "Parameter description" }
    },
    required: ["param"]
  }
}
```

2. **Add tool handler in the `CallToolRequestSchema` switch case:**

```typescript
case "your_tool_name":
  const { param } = args as { param: string };
  // Your tool logic here
  return {
    content: [
      {
        type: "text",
        text: `Result: ${param}`
      }
    ]
  };
```

3. **Rebuild the server:**

```bash
npm run build
```

## Troubleshooting

### Permission Denied

```bash
chmod +x server/build/index.js
```

### Inspector Port Issues

The inspector automatically finds available ports. If you see different port
numbers in the output (e.g., proxy on 6277, web UI on 6274), this is normal. Use
the URL shown in the terminal output.

### Module Not Found

Check Node.js version and ensure all dependencies are installed:

```bash
node --version  # Should be 22+
npm install
```

## Demo

### Installation and Setup

Install the MCP server via Claude Code:

```bash
claude mcp add minimal-mcp-server minimal-mcp-server
```

### Live Test Results

Here are actual test results from Claude Code integration:

#### 1. Calculate Sum

```
Input: calculate_sum(42, 58)
Output: "The sum of 42 and 58 is 100"
```

#### 2. Reverse String

```
Input: reverse_string("Hello MCP World")
Output: "Reversed text: dlroW PCM olleH"
```

#### 3. Get Current Time

```
Input: get_current_time()
Output: "Current time: 2025-08-24T02:19:17.244Z"
```

### Python Client Test

You can also test with the included Python client:

```bash
cd client
python client.py
```

Example output:

```
🚀 Initializing MCP agent and connecting to services...
✅ Created 1 new sessions
🧠 Agent ready with tools: calculate_sum, reverse_string, get_current_time
🔧 Tool call: calculate_sum with input: {'a': 42, 'b': 58}
📄 Tool result: The sum of 42 and 58 is 100
🔧 Tool call: reverse_string with input: {'text': 'Hello MCP'}
📄 Tool result: Reversed text: PCM olleH
🔧 Tool call: get_current_time with input: {}
📄 Tool result: Current time: 2025-08-24T02:16:40.654Z
```

## License

MIT
