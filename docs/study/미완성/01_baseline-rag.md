# RAG Agent

---
> NebulaGraph가 고가용성 보장
## 1.Out-Line
> RAG Agent Design Concept Overview

## 2.Blue-Print
### 2-1.Sequence Diagram

```mermaid
sequenceDiagram
participant dh as datahub
participant ra as rag_agent
participant es as elastic_search
participant n4 as neo4j

    dh ->> ra : POST /indexes <br> Create Index
    ra ->> es : Create for Knowledge Base Index (Vector Index)
    ra ->> n4 : Create for Knowledge Graph (Graph DB)
    ra ->> ra : Success
    ra ->> dh : Response OK
    
    dh ->> ra : POST /indexes <br> Create Index
    ra ->> es : Create for Knowledge Base Index (Vector Index)
    ra ->> n4 : Create for Knowledge Graph (Graph DB)
    ra ->> ra : Success
    ra ->> dh : Response OK
```

---

```mermaid
sequenceDiagram
actor cl as client
participant ra as rag_agent
participant llm as llm
participant n4 as neo4j


    cl ->> ra: query
    ra ->> llm: make cypher chain prompt
    llm ->> ra: cypher
    ra ->> n4: execute cypher
    n4 ->> ra: result
    ra ->> cl: result
```

# 공부 키워드
* NER
* Graph RAG
* Graph DB
* DB 기술적 의사 결정
  * nebula graph
* Data Corpus Injection Attack
