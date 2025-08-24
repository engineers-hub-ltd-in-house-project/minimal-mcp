#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "minimal-mcp-server",
  version: "1.0.0"
});

server.tool(
  "calculate_sum",
  {
    a: z.number().describe("First number"),
    b: z.number().describe("Second number")
  },
  async ({ a, b }) => {
    const result = a + b;
    return {
      content: [
        {
          type: "text",
          text: `The sum of ${a} and ${b} is ${result}`
        }
      ]
    };
  }
);

server.tool(
  "reverse_string",
  {
    text: z.string().describe("Text to reverse")
  },
  async ({ text }) => {
    const reversed = text.split('').reverse().join('');
    return {
      content: [
        {
          type: "text",
          text: `Reversed text: ${reversed}`
        }
      ]
    };
  }
);

server.tool(
  "get_current_time",
  {},
  async () => {
    const now = new Date();
    return {
      content: [
        {
          type: "text",
          text: `Current time: ${now.toISOString()}`
        }
      ]
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Minimal MCP Server started successfully");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});