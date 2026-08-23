Langchain is a framework for LLM applications
some of the common components of Langchain:
	1. models.
	2. prompts.
	3. indexes.
	4. Chains.
	5. Agents.

---
Different types of Langchain Framework:

Langsmith: 
1. it will help you to monitor and debug your application, all the reports we can see in langchain dashboard itself. 
2. more like a LLM Operations or LLMOP's

Langserve:
1. we want out LLM application in form of API, 
2. Lang serve uses Fast API, we can easily create an API, of out LLM app, to access all its services,

Langchain:
1. From Data ingestion to transformation, this is the most important part, 

Agents & Retrieval:
LCEL (langchain expression language):
Model I/O:
Retriever:
Agent tooling:

---
## Rag with Langchain
![[Pasted image 20250411170832.png]]

1. Data Loading
	- We will have multiple formats of files, from which we will load the data from.
	- this step is also called `data injestion` 
	- after this we will load the data, we will perform feature engineering like dividing them into chunks, 
	- this chunking is because of the context limit, present in the LLM's,
	- then we will convert the text chunks into vector embeddings, 
2. vector Store
	- Vector stores like Chroma dB, faiss index, are vector databases in which we will store, our embeddings.
	- the search will initially happen in the Vector DB, and the relevant chunks will extracted from the DB and passed to the LLM
and then the relevant answer will be given by the LLM
---
