## What MCP is and why it exists

- MCP is an open, Anthropic-originated protocol that standardizes how applications provide context and tools to LLMs, similar to how USB‑C standardizes device connections.​
    
- Today, each tool (RAG DB, web search, APIs, research paper tools, etc.) usually needs its own custom integration code; as tools grow to tens or hundreds, maintaining these integrations becomes difficult and brittle.​
    
- MCP solves this by defining a common “language” and contract that both LLM-side applications and tool providers follow, so the integration pattern stays the same even if tools change or new ones are added.​
    

## Analogy with HTTP/REST and tool integrations

- The video first recalls how websites use protocols (like HTTPS) and REST APIs as a common way for browsers and clients (e.g., Postman) to talk to servers and services via JSON.​
    
- Similarly, early LLM apps were just “input → output” text generators trained on static data (OpenAI, Google Gemini, Llama, etc.), which cannot perform actions like fetching a specific paper or sending emails by themselves.​
    
- To solve that, frameworks like LangChain and LangGraph add tools (RSVE for research papers, Wikipedia search, RAG DBs, DuckDuckGo search, etc.), but each tool requires separate integration code and ongoing maintenance when providers change parameters or APIs.​
    

## Core MCP components and architecture

- MCP introduces three **main** components: MCP host, MCP client, and MCP server.​
    
- MCP host is the environment where you run or embed the assistant and tools: it can be an IDE like VS Code, Cursor, Windsurf, or a custom app (e.g., Streamlit/FastAPI UI, or Anthropic’s Claude desktop).​
    
- Inside the host, MCP clients are created to talk to MCP servers using the MCP protocol; the servers sit on the tool-provider side and connect to concrete resources like code repositories, databases, and APIs.​
    
- You can have many MCP servers, each wired to different services or tools, all accessed via the same protocol from the host’s point of view.​
    

## How responsibilities and updates are handled

- In the older pattern, the app developer owns all integration code, so every change by a tool provider (API updates, new parameters) forces code updates in the AI assistant.​
    
- With MCP, the server plus its tool wiring is managed by the service/tool provider; the host just connects to their MCP server using the stable MCP protocol.​
    
- This means the provider can update internals, and as long as they respect the MCP contract, the AI assistant’s integration code does not change, which makes large tool ecosystems much easier to scale and maintain.​
    

## End‑to‑end request flow in MCP

- When a user types a query into the host (e.g., an IDE), the host first queries the MCP servers to discover which tools/services are available.​
    
- The host then calls the LLM with the user’s question plus the list/description of available tools; the LLM decides which tool(s) to use (e.g., a DB tool vs. an API tool).​
    
- The host, via the MCP client, invokes the chosen tool on the MCP server, receives the tool’s response (context/data), and passes that context back to the LLM, which finally produces the answer shown in the host UI.​
    

## Example: custom weather MCP server in Cursor

- As a concrete example, he shows a Python-based MCP server called `weather.py` with two tools: `get_alerts` and `get_forecast`, registered in the Cursor IDE as an MCP server, with Cursor acting as the MCP host.​
    
- A client inside Cursor communicates with this MCP server; when he asks “What is the weather of California?” the system routes the question through MCP, calls the weather tools, and returns the weather information into the IDE chat.​
    
- He notes that you can similarly plug in third‑party MCP servers, and promises future videos on building MCP apps from scratch, integrating with LLMs, and using frameworks like LangGraph alongside MCP.

![[Pasted image 20260823183152.png]]
