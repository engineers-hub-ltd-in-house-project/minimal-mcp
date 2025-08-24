#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "minimal-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const tools = [
  {
    name: "calculate_sum",
    description: "Calculate the sum of two numbers",
    inputSchema: {
      type: "object",
      properties: {
        a: { type: "number", description: "First number" },
        b: { type: "number", description: "Second number" },
      },
      required: ["a", "b"],
    },
  },
  {
    name: "reverse_string",
    description: "Reverse a string",
    inputSchema: {
      type: "object",
      properties: {
        text: { type: "string", description: "Text to reverse" },
      },
      required: ["text"],
    },
  },
  {
    name: "get_current_time",
    description: "Get the current time",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
];

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "calculate_sum":
      const { a, b } = args as { a: number; b: number };
      const result = a + b;
      return {
        content: [
          {
            type: "text",
            text: `The sum of ${a} and ${b} is ${result}`,
          },
        ],
      };

    case "reverse_string":
      const { text } = args as { text: string };
      const reversed = text.split("").reverse().join("");
      return {
        content: [
          {
            type: "text",
            text: `Reversed text: ${reversed}`,
          },
        ],
      };

    case "get_current_time":
      const now = new Date();
      return {
        content: [
          {
            type: "text",
            text: `Current time: ${now.toISOString()}`,
          },
        ],
      };

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Minimal MCP Server started successfully");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
