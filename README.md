# 🤖 Policy RAG System

A retrieval-augmented generation (RAG) chatbot that answers policy questions instantly. Built for [Apmosys](https://www.apmosys.com) and designed to plug into a company website, so any visitor can get accurate, policy-specific answers without waiting on support.

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=flat-square&logo=langchain&logoColor=white)
![RAG](https://img.shields.io/badge/RAG-Pipeline-blueviolet?style=flat-square)

---

## ✨ Features

- 📄 **Ingests policy documents** and splits them into searchable chunks
- 🔎 **Semantic search** using embeddings, so questions match meaning, not just keywords
- ✅ **Grounded answers**: the LLM responds only from retrieved policy content
- 🌐 **Website-ready**: built to be embedded as a chat widget
- 🙋 **Self-service**: reduces manual support queries

---

## 🧠 How it works

```
Policy docs ──► Chunking ──► Embeddings ──► Vector store
                                                │
User question ──► Embed ──► Retrieve top chunks ┘
                                │
                                ▼
                    LLM answers using only those chunks
                                │
                                ▼
                          Answer to user
```

---

## 🛠️ Tech stack

| Layer | Tool |
|---|---|
| Language | Python |
| Framework | LangChain |
| Embeddings | `[EMBEDDING_MODEL]` |
| Vector store | `Postgres` |
| LLM | `Grok` |

---

## 🚀 Getting started

```bash
# 1. Clone the repo
git clone https://github.com/AryanDPenta/policy-rag-system.git
cd policy-rag-system

# 2. Install dependencies
pip install -r requirements.txt

# 3. Add your keys
cp .env.example .env

# 4. Ingest policy documents
python [INGEST_SCRIPT].py

# 5. Run the chatbot
python main.py
```

---

## 📁 Project structure

```
policy-rag-system/
├── [data/]          # policy documents
├── [ingest.py]      # chunking + embedding
├── [app.py]         # chatbot / API
└── requirements.txt
```

---

## 👤 Author

**Aryan Penta** · [LinkedIn](https://www.linkedin.com/in/aryan-penta-10863a252) · [GitHub](https://github.com/AryanDPenta)
