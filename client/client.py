import asyncio
import os
from pathlib import Path
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from mcp_use import MCPAgent, MCPClient

async def main():
    load_dotenv()

    server_path = Path(__file__).parent.parent / "server" / "build" / "index.js"
    
    config = {
        "mcpServers": {
            "minimal-server": {
                "command": "node",
                "args": [str(server_path)]
            }
        }
    }

    client = MCPClient.from_dict(config)
    llm = ChatOpenAI(model="gpt-4o-mini")
    agent = MCPAgent(llm=llm, client=client, max_steps=10)

    result = await agent.run(
        "Please calculate the sum of 42 and 58, reverse the string 'Hello MCP', and get the current time"
    )
    print(f"\nResult: {result}")

if __name__ == "__main__":
    asyncio.run(main())