---
title: Monarch AI Bot - System Architecture Documentation
project: Monarch AI Bot
project_version: v1.0.0
documentation_version: v1.0.0
document_type: architecture
last_updated: 2026-11-11
status: verified
---

# Monarch AI Bot — System Architecture Documentation

## 1. Document Metadata and Version

| Parameter | Specification |
|---|---|
| **Document Title** | Monarch AI Bot - System Architecture Documentation |
| **Project** | Monarch AI Bot |
| **Project Version** | `v1.0.0` |
| **Documentation Version** | `v1.0.0` |
| **Document Type** | Comprehensive System Architecture & Lifecycle Specification |
| **Last Updated** | 2026-11-11 |
| **Verification Status** | Verified against source code repository |

---

## 2. Product Overview

**Monarch AI Bot** is a full-stack, production-grade conversational AI platform that provides low-latency interactions with leading Large Language Models hosted on **Groq**. The system combines a modern, responsive **React 19 & Vite** web client with a containerized **FastAPI & Python 3.14** backend deployed on **Render** and backed by serverless **Neon PostgreSQL**.

The platform is engineered around three foundational architectural principles:
1. **Privacy-Preserving Ephemeral Identity**: Users access the platform through lightweight guest accounts governed by a 24-hour expiration window. No passwords or personal data are collected.
2. **Deterministic Dual-Tier Security**: API communications are secured through HTTP Basic Auth-issued signed HS256 JSON Web Tokens enforced through a database-tracked single active token model, while conversational data is strictly scoped to valid user UUIDs.
3. **High-Performance Stateless Inference**: Multi-turn dialogue context is dynamically reconstructed from relational history tables and forwarded to Groq's high-speed inference engine with custom system persona constraints.

---

## 3. System Architecture

```mermaid
flowchart TB
    subgraph ClientTier["Client Tier — Browser SPA"]
        User(["End User"])
        ReactApp["React 19 SPA (Vite)"]
        CanvasEngine["Interactive Particle Canvas"]
        StateHook["useAppState Hook"]
        LocalStorage[("localStorage<br/>'monarch_ai_session'")]
        
        User <--> ReactApp
        ReactApp --- CanvasEngine
        ReactApp <--> StateHook
        StateHook <--> LocalStorage
    end

    subgraph EdgeTier["Edge & Gateway Tier"]
        RenderEdge["Render Cloud Edge / TLS Termination"]
        CORSFilter["FastAPI CORS Middleware"]
        AuthFilter["FastAPI Security Dependencies<br/>(require_basic_auth / require_jwt)"]
    end

    subgraph ServiceTier["Backend Tier — Docker Container (Port 8000)"]
        Router["main.py API Routers"]
        APIAuthMod["APIAuth Module<br/>(JWT & Token Database)"]
        AuthMod["auth Module<br/>(Guest Users & 24h Window)"]
        ChatEngine["chat Module<br/>(Orchestration & History)"]
        ChatMgmt["chat_Management Module<br/>(Threads & Messages)"]
        LLMDriver["LLM Module<br/>(Groq SDK & Persona)"]
    end

    subgraph DataTier["Data Tier — Neon PostgreSQL"]
        DB_Token[("api_active_token<br/>(id = 1 Singleton)")]
        DB_Users[("users<br/>(UUID & 24h Expiry)")]
        DB_Conv[("conversations<br/>(Threads & Timestamps)")]
        DB_Msg[("messages<br/>(Exchanges & Models)")]
    end

    subgraph InferenceTier["External Cloud Services"]
        GroqCloud["Groq Cloud LLM Inference Engine"]
    end

    ReactApp -->|"HTTPS / JSON"| RenderEdge
    RenderEdge --> CORSFilter
    CORSFilter --> AuthFilter
    AuthFilter --> Router

    Router --> APIAuthMod
    Router --> AuthMod
    Router --> ChatEngine
    Router --> ChatMgmt

    APIAuthMod <--> DB_Token
    AuthMod <--> DB_Users
    ChatEngine <--> DB_Conv
    ChatEngine <--> DB_Msg
    ChatMgmt <--> DB_Conv
    ChatMgmt <--> DB_Msg

    ChatEngine --> LLMDriver
    LLMDriver <-->|"Groq API / HTTPS"| GroqCloud
```

---

## 4. Technology Stack

### Summary Table

| Subsystem | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | React 19 (`^19.3.1`) | UI component hierarchy and concurrent rendering |
| **Frontend Tooling** | Vite 8 (`^8.3.6`) | Fast development server and production Rollup bundler |
| **UI Components** | Ant Design (`antd ^6.7.0`) | Layout, menus, inputs, selects, buttons, and alert banners |
| **Markdown Rendering** | `react-markdown` (`^10.1.0`) | Safe Abstract Syntax Tree Markdown DOM parser |
| **Syntax Highlighting** | `rehype-highlight` + `highlight.js` | Code block highlighting styled with GitHub Dark |
| **Backend Runtime** | Python 3.14 (`python:3.14-slim`) | Core language execution environment |
| **REST API Framework** | FastAPI (`>=0.162.0`) | High-concurrency async web framework and OpenAPI docs |
| **ASGI Web Server** | Uvicorn (`>=0.54.0`) | High-speed server hosting FastAPI |
| **Database Adapter** | `psycopg` 3 (`>=3.3.8`) | Parameterized SQL execution adapter for PostgreSQL |
| **Relational Database** | Neon PostgreSQL | Serverless cloud relational database |
| **Cryptographic Tokens** | PyJWT (`>=2.15.1`) | HS256 token issuance and claim verification |
| **Data Validation** | Pydantic | Request schema parsing and payload type validation |
| **Python Package Manager**| Astral `uv` | Dependency resolution and container virtual environment management |
| **Inference Provider** | Groq Cloud API (`groq >=1.7.0`) | High-speed LLM chat completions and model catalog queries |
| **Cloud Hosting** | Render | Docker Web Service container hosting |

---

## 5. Major System Components

The Monarch AI Bot architecture divides responsibility into discrete, loosely-coupled modules:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                              CLIENT TIER                                │
├───────────────────────┬────────────────────────┬───────────────────────┤
│    Auth Screen        │      Chat Area         │     Control Panel     │
│  (Interactive Canvas  │  (Markdown & Syntax    │  (Profile & Expiry    │
│   & Guest Forms)      │   & Model Selector)    │   & Logout Action)    │
├───────────────────────┴────────────────────────┴───────────────────────┤
│           Central State Hook: useAppState (src/state.jsx)              │
│       Network Service Clients: auth.js and chatApi.js (AbortSignals)    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTPS + Bearer JWT
┌───────────────────────────────────▼────────────────────────────────────┐
│                              SERVER TIER                                │
├────────────────────────────────────────────────────────────────────────┤
│                 FastAPI Application Entry (main.py)                    │
│        Dependencies: require_basic_auth & require_jwt (Active DB Check)│
├───────────────────────┬────────────────────────┬───────────────────────┤
│   APIAuth/            │   auth/                │   chat/               │
│   (Basic Auth & JWT   │   (Guest Registration  │   (Orchestration,     │
│    Active Singleton)  │    & 24h Expiration)   │    Creation, History) │
├───────────────────────┼────────────────────────┼───────────────────────┤
│   chat_Management/    │   LLM/                 │   Database Engine     │
│   (History & Thread   │   (Groq Completions    │   (psycopg 3 Direct   │
│    Listings)          │    & Persona Prompt)   │    Parameterized SQL) │
└───────────────────────┴───────────┬────────────┴───────────────────────┘
                                    │
              ┌─────────────────────┴─────────────────────┐
              ▼                                           ▼
┌───────────────────────────┐               ┌───────────────────────────┐
│     DATA PERSISTENCE      │               │     LLM INFERENCE         │
│     Neon PostgreSQL       │               │     Groq Cloud API        │
│  (Users, Conversations,   │               │  (Dynamic Catalog & Chat  │
│   Messages, Active Token) │               │   Completions)            │
└───────────────────────────┘               └───────────────────────────┘
```

---

## 6. Component Responsibilities

| Component | File Path | Core Architectural Responsibility |
|---|---|---|
| **View Switcher** | `client/src/App.jsx` | Renders unauthenticated canvas view or 3-column workspace based on `user` state |
| **State Hub** | `client/src/state.jsx` | Encapsulates user session, active thread, model catalog, and network states |
| **Auth View** | `client/src/Auth/AuthenticationScreen.jsx` | Manages split layout and 2D canvas particle animation respecting accessibility settings |
| **Chat View** | `client/src/ChatArea/ChatArea.jsx` | Displays conversation stream, welcome suggestions, code syntax, and message composer |
| **Profile Drawer** | `client/src/ControlPanel/ControlPanel.jsx` | Renders user UUID, account creation time, calculated 24h expiration in IST, and logout |
| **Nav Drawer** | `client/src/Sidebar/Sidebar.jsx` | Lists conversations ordered by latest activity with "+ New Chat" action |
| **Auth Client** | `client/src/ControlPanel/Account/auth.js` | Dispatches `/signup`, `/login`, `/chats`, `/chat/history` with deduplication |
| **Chat Client** | `client/src/ChatArea/chatApi.js` | Dispatches `/chat` completions and `/models` catalog queries with AbortController |
| **API Entry** | `server/main.py` | Exposes REST endpoints, validates schemas, configures CORS, handles dependencies |
| **Client Auth** | `server/APIAuth/` | Verifies Basic Auth, signs HS256 JWTs, and enforces single active token in DB (`id = 1`) |
| **User Identity**| `server/auth/` | Registers guest users, verifies 24-hour validity via SQL interval, manages DB connections |
| **Chat Core** | `server/chat/` | Coordinates user validation, thread creation, history gathering, LLM execution, saving |
| **Thread Queries**| `server/chat_Management/` | Validates UUID inputs and queries conversations and message logs |
| **LLM Driver** | `server/LLM/` | Formats Groq completions request with system prompt and history; lists active models |

---

## 7. Frontend-to-Backend Communication

Frontend components never communicate directly with external third-party services (such as Groq or Neon); all interactions traverse the FastAPI backend over secure HTTPS:

```mermaid
sequenceDiagram
    participant Browser as Web Client (Browser)
    participant Backend as FastAPI Server (Render)
    participant NeonDB as Neon PostgreSQL
    participant GroqAPI as Groq Cloud API

    Note over Browser,GroqAPI: 1. Health Probe
    Browser->>Backend: GET /health
    Backend-->>Browser: 200 OK {"status": "healthy"}

    Note over Browser,GroqAPI: 2. Model Catalog Query
    Browser->>Backend: GET /models (Authorization: Bearer <token>)
    Backend->>NeonDB: Verify active token (jti in api_active_token)
    NeonDB-->>Backend: Token active
    Backend->>GroqAPI: Groq.models.list()
    GroqAPI-->>Backend: Model list
    Backend-->>Browser: 200 OK {success: true, models: [...]}

    Note over Browser,GroqAPI: 3. Guest User Registration
    Browser->>Backend: POST /signup {username} (Authorization: Bearer <token>)
    Backend->>NeonDB: INSERT INTO users (user_uuid, username) VALUES (...)
    NeonDB-->>Backend: user_uuid, username, created_at
    Backend-->>Browser: 200 OK {user: {...}}

    Note over Browser,GroqAPI: 4. Conversational Chat Completion
    Browser->>Backend: POST /chat {user_uuid, model, message, chat_id}
    Backend->>NeonDB: Verify user 24h validity & fetch conversation history
    NeonDB-->>Backend: History messages
    Backend->>GroqAPI: chat.completions.create(model, messages)
    GroqAPI-->>Backend: Completion response & usage metrics
    Backend->>NeonDB: INSERT INTO messages & UPDATE conversations.updated_at
    NeonDB-->>Backend: Write confirmed
    Backend-->>Browser: 200 OK {question, answer, model, usage}
```

---

## 8. Authentication Lifecycle

The architecture implements a **two-tier security boundary**:

```mermaid
sequenceDiagram
    participant Admin as System Administrator / Build Process
    participant Client as Web Frontend / API Consumer
    participant FastAPI as FastAPI Backend
    participant TokenDB as api_active_token (DB)
    participant UsersDB as users (DB)

    Note over Admin,TokenDB: Tier 1: Client API Token Lifecycle
    Admin->>FastAPI: POST /token (HTTP Basic Auth: username + password)
    FastAPI->>FastAPI: hmac.compare_digest with env credentials
    FastAPI->>FastAPI: Generate HS256 JWT {jti: UUID, iat: Timestamp}
    FastAPI->>TokenDB: INSERT INTO api_active_token (id, jti) VALUES (1, jti) ON CONFLICT (id) DO UPDATE...
    TokenDB-->>FastAPI: Token jti registered as globally active
    FastAPI-->>Admin: Returns {token, jti, token_type: "Bearer"}
    Admin->>Client: Inject token into client configuration (VITE_API_TOKEN)

    Note over Client,UsersDB: Tier 2: End-User Guest Lifecycle
    Client->>FastAPI: POST /signup {username} (Bearer JWT)
    FastAPI->>FastAPI: Validate JWT signature & active DB status
    FastAPI->>UsersDB: INSERT INTO users (user_uuid, username) VALUES (uuid4(), ...)
    UsersDB-->>FastAPI: User registered with created_at = NOW()
    FastAPI-->>Client: Returns user profile & UUID
    
    Note over Client,UsersDB: Subsequent Session Verification
    Client->>FastAPI: POST /login {username, user_uuid} (Bearer JWT)
    FastAPI->>UsersDB: SELECT (created_at > NOW() - INTERVAL '24 hours') FROM users WHERE ...
    alt Within 24 Hours
        UsersDB-->>FastAPI: is_valid = TRUE
        FastAPI-->>Client: 200 OK (Session authorized)
    else Exceeded 24 Hours
        UsersDB-->>FastAPI: is_valid = FALSE
        FastAPI-->>Client: 401 Unauthorized ("Account expired.")
    end
```

### The Single Active Token Rule
Because `api_active_token` enforces a fixed primary key of `id = 1`, issuing a new token via `POST /token` replaces the `jti` column. If an older token is presented by any client, the database verification check (`verify_active_token`) immediately rejects it, providing instant global token revocation without requiring token blacklists or cache invalidation.

---

## 9. User and Guest Account Lifecycle

```mermaid
flowchart TD
    Start([Visitor arrives at frontend]) --> UnauthCheck{Saved session in localStorage?}
    
    UnauthCheck -->|No| ShowAuth[Display AuthenticationScreen]
    UnauthCheck -->|Yes| Rehydrate[Rehydrate user & selectedChatId]
    
    ShowAuth --> ActionChoice{User action}
    ActionChoice -->|Create Account| SignupCall[POST /signup with chosen username]
    SignupCall --> GenUUID[Server generates UUID v4 & sets created_at = NOW()]
    GenUUID --> DisplayCopy[Show UUID with one-click copy button]
    DisplayCopy --> LoginCall
    
    ActionChoice -->|Sign In| LoginCall[POST /login with username & UUID]
    Rehydrate --> ValidateSession[Execute initial /chats API request]
    
    LoginCall --> Check24h{created_at > NOW() - 24 hours?}
    ValidateSession --> Check24h
    
    Check24h -->|No - Expired| ExpiredAlert[Return 401 Unauthorized]
    ExpiredAlert --> ClearStorage[Purge localStorage 'monarch_ai_session']
    ClearStorage --> ShowAuth
    
    Check24h -->|Yes - Active| EnterWorkspace[Mount Authenticated Workspace Layout]
    EnterWorkspace --> ActiveUse[User interacts with chat and conversations]
    
    ActiveUse --> UserLogout[User clicks Logout in ControlPanel]
    UserLogout --> ClearStorage
```

---

## 10. Chat Request Lifecycle

```mermaid
sequenceDiagram
    participant User
    participant ChatUI as ChatArea.jsx
    participant State as state.jsx (useAppState)
    participant API as chatApi.js
    participant Server as main.py (FastAPI)
    participant Verify as verify_jwt.py
    participant Service as chat_service.py
    participant DB as Neon PostgreSQL
    participant LLM as groq_chat.py
    participant Groq as Groq API

    User->>ChatUI: Types message & triggers Send (Enter key)
    ChatUI->>State: handleSendMessage(cleanMessage)
    State->>State: Sets sending = true
    State->>API: sendChatMessage({user_uuid, chat_id, model, message})
    API->>Server: POST /chat (Headers: Bearer JWT)
    
    Server->>Verify: require_jwt dependency
    Verify->>DB: Check jti against api_active_token (id=1)
    DB-->>Verify: Token active
    Verify-->>Server: Token validated
    
    Server->>Service: chat_service(user_uuid, model, message, chat_id)
    Service->>DB: Check user existence and 24h validity
    DB-->>Service: User is active
    
    opt If chat_id is null (New Thread)
        Service->>DB: INSERT INTO conversations (user_uuid) RETURNING chat_id
        DB-->>Service: New chat_id
    end
    
    Service->>DB: SELECT messages WHERE user_uuid = %s AND chat_id = %s
    DB-->>Service: Chronological message history
    
    Service->>LLM: groq_chat(model, message, history)
    LLM->>LLM: Inject SYSTEM_PROMPT + history pairs + prompt
    LLM->>Groq: client.chat.completions.create(model, messages)
    Groq-->>LLM: Generated answer + token metrics
    LLM-->>Service: {message, model, usage}
    
    Service->>DB: INSERT INTO messages (user_uuid, chat_id, question, answer, model)
    Service->>DB: UPDATE conversations SET updated_at = NOW()
    DB-->>Service: Saved
    
    Service-->>Server: Complete response payload
    Server-->>API: 200 OK JSON
    API-->>State: Normalized response
    State->>State: Append newMessage to chatHistory
    State->>State: Refresh conversation thread list
    State->>State: Sets sending = false
    State-->>ChatUI: Returns true -> clears input composer
    ChatUI->>ChatUI: Renders assistant markdown bubble with syntax highlighting
```

---

## 11. Conversation and Message Data Flow

```mermaid
flowchart LR
    subgraph BrowserState["Browser Memory & Storage"]
        Composer["User Types Prompt"]
        Optimistic["Optimistic Message Append"]
        SessionStore[("localStorage<br/>'monarch_ai_session'")]
    end

    subgraph BackendMemory["Backend Execution Pipeline"]
        Validate["Validate User & 24h Eligibility"]
        QueryHist["Fetch Existing History (ASC)"]
        Assemble["Assemble Groq Payload"]
        Persist["Transactional Write (messages & conversations)"]
    end

    subgraph RelationalStorage["Neon PostgreSQL"]
        T_Users[("users")]
        T_Conv[("conversations")]
        T_Msg[("messages")]
    end

    Composer --> Validate
    Validate <--> T_Users
    Validate --> QueryHist
    QueryHist <--> T_Msg
    QueryHist --> Assemble
    Assemble --> Persist
    Persist --> T_Msg
    Persist --> T_Conv
    Persist --> Optimistic
    Optimistic --> SessionStore
```

---

## 12. LLM Request and Response Lifecycle

### Prompt Assembly and Persona Constraints
The backend ensures concise, token-efficient, and accurate conversational responses by sandwiching the conversation between a strict **System Persona** and the latest user prompt:

1. **Persona Injection (`server/LLM/prompt.py`)**:
   - Persona defines Monarch AI as a helpful, intelligent, and reliable assistant.
   - Mandates conciseness: 1–3 sentence responses for simple questions, minimal boilerplate, no unsolicited conclusions or filler.
   - Prohibits hallucination and requires admitting uncertainty when facts are missing.
2. **Context Alternation (`server/LLM/groq_chat.py`)**:
   - Prior exchanges from `messages` table are unpacked into standard role pairs:
     ```python
     {"role": "user", "content": question}
     {"role": "assistant", "content": answer}
     ```
3. **Execution**:
   - Sent via `client.chat.completions.create(model=model, messages=messages)`.
4. **Usage Extraction**:
   - Token statistics (`prompt_tokens`, `completion_tokens`, `total_tokens`) are parsed from `response.usage` and propagated to the client.

---

## 13. Database Interaction Flow

The database layer runs on **Neon PostgreSQL** using direct parameterized queries via `psycopg 3`:

```mermaid
flowchart TD
    ServiceCall["Service Operation (e.g. chat_service, signup, login)"]
    ConnFactory["auth.database.get_db_connection()"]
    ConnContext["with psycopg.connect(DATABASE_URL) as conn:"]
    CursorContext["with conn.cursor() as cursor:"]
    
    SQL_Exec["cursor.execute(SQL_STATEMENT, (param_tuple,))"]
    Commit["Automatic Context Commit"]
    Close["Automatic Connection Close"]

    ServiceCall --> ConnFactory
    ConnFactory --> ConnContext
    ConnContext --> CursorContext
    CursorContext --> SQL_Exec
    SQL_Exec --> Commit
    Commit --> Close
```

- **Connection Lifetime**: Scoped per operation; connections are opened at the start of a request handler and cleanly closed upon completion.
- **Transactions**: Python context managers (`with conn:`) automatically issue `COMMIT` upon normal block completion or `ROLLBACK` if an unhandled exception occurs.

---

## 14. Error Handling Across System Boundaries

```mermaid
flowchart TD
    Req["Incoming Request"] --> BoundaryCheck{"Boundary Layer"}
    
    BoundaryCheck -->|Network / Transport| NetError["Connection Timeout / Drop"]
    NetError --> AbortAction["AbortController triggers TimeoutError (15s/30s)"]
    AbortAction --> UI_Alert["Ant Design Alert Banner (User Retries)"]
    
    BoundaryCheck -->|Authentication| AuthError{"Auth Rejection"}
    AuthError -->|Invalid / Missing JWT| RejectJWT["401 Unauthorized (Bearer)"]
    AuthError -->|Expired Guest (>24h)| Reject24h["401 Unauthorized (Login) / 400 Bad Request (Chat)"]
    RejectJWT --> ResetClient["useAppState.handleSessionExpired() cleans localStorage"]
    Reject24h --> ResetClient
    ResetClient --> UI_AuthScreen["Return to AuthenticationScreen"]
    
    BoundaryCheck -->|Input Validation| ValError["Pydantic / ValueError"]
    ValError --> RejectVal["422 Unprocessable / 400 Bad Request"]
    RejectVal --> PreserveInput["Error displayed; input preserved in composer"]
    
    BoundaryCheck -->|External LLM| GroqError{"Groq API Failure"}
    GroqError -->|RateLimitError / AuthError| GroqExcept["400 Bad Request with error detail"]
    GroqExcept --> PreserveInput
    
    BoundaryCheck -->|Database| DBError["psycopg.Error / OperationalError"]
    DBError --> Internal500["500 Internal Server Error"]
    Internal500 --> GenericAlert["User alerted with safe error message"]
```

---

## 15. Deployment Architecture

```mermaid
flowchart TD
    subgraph DevEnvironment["Development & Source Control"]
        GitRepo["GitHub Repository (monarch-AI-Bot)"]
        LocalClient["Local Vite Server (Port 5173)"]
        LocalServer["Local Uvicorn Server (Port 8000)"]
    end

    subgraph ProductionPlatform["Production Cloud (Render)"]
        RenderService["Render Web Service (Docker)"]
        DockerBuild["Dockerfile (python:3.14-slim + uv)"]
        UvicornProd["Uvicorn ASGI Server (Port 8000)"]
        HealthProbe["Render Health Monitor (/health)"]
        
        DockerBuild --> RenderService
        RenderService --> UvicornProd
        HealthProbe -.->|Polls status| UvicornProd
    end

    subgraph ManagedCloud["External Cloud Infrastructure"]
        NeonPostgres[("Neon Serverless PostgreSQL (SSL)")]
        GroqCloud["Groq Cloud LLM Inference Engine"]
    end

    GitRepo -->|Trigger Deploy| DockerBuild
    UvicornProd <-->|psycopg 3 / SSL| NeonPostgres
    UvicornProd <-->|HTTPS API Key| GroqCloud
```

---

## 16. Security Architecture

### Key Security Safeguards
1. **Constant-Time Basic Authentication**: `APIAuth/basic_auth.py` compares administrative credentials using `hmac.compare_digest` to prevent timing attacks.
2. **Instant Global Token Revocation**: Active tokens are validated against `api_active_token (id = 1)`. Generating a new token revokes the previous token immediately across all active sessions.
3. **Strict SQL Parameterization**: All queries use positional tuples (`%s`), preventing SQL injection attacks across all database interactions.
4. **No Password Storage**: End users do not supply passwords; accounts are identified exclusively by username and server-generated UUID v4 tokens.
5. **Cascading Relational Deletion**: All child records in `conversations` and `messages` are bound to `users(user_uuid)` via `ON DELETE CASCADE`.
6. **XSS Mitigation in Frontend**: Assistant responses are rendered using `react-markdown` AST compilation rather than `dangerouslySetInnerHTML`.
7. **Secret Isolation**: All credentials, keys, and connection strings are managed through environment variables and excluded from version control.

---

## 17. Current Implementation Limitations

To maintain full transparency, the following architectural constraints reflect the verified state of the codebase:

1. **Synchronous LLM Completions (No Streaming)**: Responses are delivered in full after generation. Server-Sent Events (SSE) or WebSockets are not currently implemented.
2. **Singleton Active API Token**: The backend supports exactly one active JWT token globally via `api_active_token (id = 1)`. Issuing a token for one client revokes it for any other client using that backend instance.
3. **No Automatic Database Cleanup Cron**: While expired guest accounts (>24 hours) are immediately blocked by SQL checks (`created_at > NOW() - INTERVAL '24 hours'`), there is no automated background cron worker to physically delete expired rows from PostgreSQL.
4. **Static Title Assignment**: Conversation titles default to `null` in the database, with the frontend falling back to formatting the conversation's `updated_at` date. Automatic title summarization via LLM is not implemented.
5. **No Per-IP Rate Limiting**: Request rate limiting is not enforced at the application layer; rate limits currently depend on upstream Render edge proxies or Groq API tier limits.

