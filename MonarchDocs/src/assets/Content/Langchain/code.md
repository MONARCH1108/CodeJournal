---

---
Code for Calling an Ollama LLM, in Langchain

![[Pasted image 20250411165743.png]]

---
Code for getting a chat prompt template

![[Pasted image 20250411165847.png]]

---
Code for Getting an String Output parser

![[Pasted image 20250411165942.png]]

---
Code for binding all these elements in a chain, and invoke the chain for getting an response from LLM

![[Pasted image 20250411170040.png]]

---
Code for `data ingestion`

for extracting the text from a text file directly
![[Pasted image 20250411175058.png]]

for extracting the text from the Webpage directly
![[Pasted image 20250411175142.png]]

for extracting the text from the PDF file
![[Pasted image 20250411175804.png]]

---
Code for Creating the chunks inside langchain framework from the loaded document.
![[Pasted image 20250411180156.png]]

this will create chunks from the loaded text weather from PDF, text file or directly from the webpage

---
Converting these chunks into vector embeddings and storing them in Different VectorDB

Chroma DB
![[Pasted image 20250411184222.png]]

Chroma DB search 
![[Pasted image 20250411184257.png]]

FAISS DB
![[Pasted image 20250411185541.png]]

FAISS DB Search
![[Pasted image 20250411185609.png]]

---
## Chain & Retrieval
For creating a chain and retrieval system in langchain:
![[Pasted image 20250414163758.png]]

we imported our LLM, and given it a prompt template, then
![[Pasted image 20250414163905.png]]

and created a `creatr_stuff_document_chain`, with the LLM and the prompt,  then we create a retriever,
![[Pasted image 20250414164118.png]]

![[Pasted image 20250414164144.png]]

then is how we create a chain and retriever system in langchain.

---
