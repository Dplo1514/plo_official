# Multi Agent System

### 0. 개요

> Multi Agent System Overview

1. Multi Agent System(MAS)는 여러 개의 독립적이고 자율적인 에이전트들이 협력, 경쟁하여 특정 문제의 해결 및 목표를 달성하기 위한 시스템
2. 분산 시스템의 한 형태로, 각 에이전트는 고유한 역할과 책임을 가지고 있으며, 환경과 상호작용하면서 독립적으로 행동함

### 1-1. 특징

1. 자율성 : 각 에이전트는 독립적으로 작동하며, 자체적인 의사결정을 내린다.
2. 분산성 : 중앙 집중식 제어 없이 에이전트들이 개별적으로 동작하면서 전체 시스템의 목표를 달성한다.
3. 협력 및 경쟁 : 에이전트 간의 상호작용을 통해 협력적 또는 경쟁적 관계를 형성한다.
4. 유연성 : 새로운 에이전트를 추가하거나 기존 에이전트를 제거해도 시스템 전체에 큰 영향을 미치지 않는다.
5. 확장성 : 시스템 규모에 따라 에이전트 수를 조정할 수 있다.

### 1-2. AI Agent

1. RAG 에이전트(Retrieval-Augmented Generation Agent)
    * 대규모 언어 모델(LLM)과 외부 데이터 검색 시스템을 결합하여 더욱 정확하고 맥락에 맞는 답변 생성.
    * 예: 챗봇, 고객 서비스 시스템.
2. OCR 기반 에이전트(Optical Character Recognition Agent)
    * 이미지나 문서에서 텍스트를 추출하여 정보를 처리.
    * 예: 문서 디지털화, 데이터 입력 자동화.
3. RIG 에이전트(Reinforcement Interactive Generation Agent)
    * 강화학습과 상호작용을 통해 고도화된 작업을 수행.
    * 예: 동적 콘텐츠 생성, 사용자 맞춤형 응답.
4. 지식 에이전트(Knowledge-Based Agent)
    * 대규모 지식 그래프나 데이터베이스를 활용해 의사결정을 내리는 에이전트.
    * 예: 추천 시스템, 의사결정 지원 도구.
5. 강화 학습 에이전트(Reinforcement Learning Agent)
    * 환경과 상호작용하며 보상을 통해 최적의 행동을 학습.
    * 예: 게임 AI, 자율 주행 차량.
6. 협력형 에이전트(Cooperative Agent)
    * 다수의 에이전트가 협력해 공동 목표를 달성.
    * 예: 군집 드론, 다중 로봇 시스템.
7. 예측 및 분석 에이전트(Predictive Analytics Agent)
    * 머신러닝 및 통계 모델을 활용해 미래를 예측하고 데이터 기반 의사결정을 지원.
    * 예: 수요 예측 시스템, 위험 관리 도구.

### 1-3. Module

1. 에이전트 (Agent) : 시스템의 기본 단위로, 특정 기능을 담당하며 환경과 상호작용한다.
2. 환경 (Environment) : 에이전트가 활동하는 공간으로, 에이전트의 행동에 따라 변화하며, 시뮬레이션 및 실시간 데이터를 포함한다.
3. 커뮤니케이션 (Communication) : 에이전트 간 정보 교환을 위한 프로토콜과 메커니즘.
4. 조정 및 협상 (Coordination and Negotiation) : 에이전트 간 협력과 자원 분배를 위한 전략.
5. 학습 (Learning) : 환경과 상호작용하며 성능을 개선하는 기능.

### 1-4. MAS Architecture  
#### 1-4-1. 중앙 집중형 MAS 아키텍처

``` mermaid
   graph TD
   CentralController[Central Controller]
   Agent1[Agent 1]
   Agent2[Agent 2]
   Agent3[Agent 3]

   CentralController --> Agent1
   CentralController --> Agent2
   CentralController --> Agent3
   Agent1 -->|Feedback| CentralController
   Agent2 -->|Feedback| CentralController
   Agent3 -->|Feedback| CentralController
```
* 중앙 컨트롤러는 에이전트들에게 작업을 분배하고, 결과를 수집하여 전체 시스템의 목표를 조율합니다.
   1. 장점: 간단한 설계, 중앙집중식 데이터 관리 가능.
   2. 단점: 중앙 컨트롤러에 과부하가 발생할 수 있고, 장애 발생 시 전체 시스템에 영향.

#### 1-4-2. 분산형 MAS 아키텍처
``` mermaid
   graph TD
   Agent1[Agent 1]
   Agent2[Agent 2]
   Agent3[Agent 3]

   Agent1 -->|Coordination| Agent2
   Agent2 -->|Coordination| Agent3
   Agent3 -->|Coordination| Agent1
```
* 각 에이전트가 독립적으로 동작하며, 상호 협력과 자율성을 통해 목표를 달성합니다.
   1. 장점: 확장성과 유연성이 뛰어남, 중앙 장애에 대한 의존성 없음.
   2. 단점: 복잡한 상호작용 설계 필요, 초기 개발 비용이 높을 수 있음.

#### 1-4-3. 하이브리드 MAS 아키텍처
``` mermaid
   graph TD
   MasterAgent[Master Agent]
   SubAgent1[Sub Agent 1]
   SubAgent2[Sub Agent 2]
   SubAgent3[Sub Agent 3]
   SubAgent4[Sub Agent 4]

   MasterAgent --> SubAgent1
   MasterAgent --> SubAgent2
   MasterAgent --> SubAgent3
   SubAgent3 -->|Delegates Task| SubAgent4
   SubAgent4 -->|Reports Status| SubAgent3
```

* 중앙 에이전트(Master Agent)가 전반적인 조율을 수행하며, 각 Sub Agent가 독립적으로 작동합니다.
   1. 장점: 중앙 관리의 이점을 유지하면서 부분적으로 분산 처리 가능.
   2. 단점: 중앙 관리와 분산 관리의 복잡성을 동시에 다뤄야 함.

### 1-5. MAS Model
#### 1-5-1. Object Management Group (OMG) Model
1. 특징
   1. 일반적인 패턴과 정책을 사용하여 협업하는 에이전트들과 에이전시들로 구성되어 있습니다.
2. 구성 요소
   1. 에이전트: 능력과 상호작용 유형에 따라 정의되며, 동시 실행과 보안을 지원합니다.
   2. 에이전시: 에이전트들의 동시 실행, 보안 등을 지원하는 구성 요소입니다.
3. Blue Print
   ``` mermaid 
   graph TD
       OMG[OMG Model]
       OMG --> Agent
       OMG --> Agency
       Agent --> Capability
       Agent --> InteractionType
       Agency --> Concurrency
       Agency --> Security
   ``` 


#### 1-5-2. FIPA(Foundation for Intelligent Physical Agents) Model
1. 특징
   1. 에이전트 통신, 협상, 관리와 같은 요소를 포함한 표준 모델입니다.
2. 구성 요소
   1. 에이전트(Agent): 자율적으로 동작하며 특정 기능을 수행합니다.
   2. 에이전트 플랫폼(Agent Platform): 에이전트의 실행 환경을 제공합니다.
   3. 디렉토리 퍼실리테이터(Directory Facilitator): 에이전트 검색 및 레지스트리 관리를 담당합니다.
   4. 에이전트 관리 시스템(Agent Management System): 에이전트의 생명 주기를 관리합니다.
   5. 에이전트 통신 채널(Agent Communication Channel): 에이전트 간의 통신을 지원합니다. 
   6. 에이전트 통신 언어(Agent Communication Language): 에이전트 간 메시지 전달을 위한 언어입니다.
3. Blue Print
   ``` mermaid 
   graph TD
    FIPA[FIPA Model]
    FIPA --> Agent
    FIPA --> AgentPlatform
    FIPA --> DirectoryFacilitator
    FIPA --> AgentManagementSystem
    FIPA --> CommunicationChannel
    FIPA --> CommunicationLanguage
   ``` 
   
#### 1-5-3. KAoS 모델
1. 특징 
   1. 에이전트를 위한 개방형 분산 아키텍처로, 다양한 에이전트 구현을 정의하며 에이전트 간 커뮤니케이션을 위해 대화 정책을 사용합니다.

2. 구성 요소 
   1. 도메인 관리 서비스(Domain Management Service): 에이전트와 관련된 정책 정의 및 관리를 담당합니다. 
   2. 디렉토리 서비스(Directory Service): 에이전트 검색 및 등록을 지원합니다. 
   3. 보안 서비스(Security Service): 에이전트 간 상호작용의 보안과 접근 제어를 제공합니다. 
   4. 대화 관리 서비스(Conversation Management Service): 대화 정책을 사용하여 에이전트 간 통신을 중재하고 관리합니다. 
   5. 정책 관리 서비스(Policy Management Service): 에이전트의 행동을 제어하는 규칙과 정책을 정의하고 적용합니다.
3. Blue Print
   ``` mermaid 
   graph TD
    KAoS[KAoS Model]
    KAoS --> DomainManagementService
    KAoS --> DirectoryService
    KAoS --> SecurityService
    KAoS --> ConversationManagementService
    KAoS --> PolicyManagementService
   ``` 
#### 1-5-4. OAA(Open Agent Architecture) 모델:
1. 특징
   1. 에이전트들이 퍼실리테이터를 통해 상호작용하며, API를 통해 애플리케이션과 연동됩니다.

2. 구성 요소
   1. 사용자 인터페이스 에이전트(User Interface Agent): 사용자의 요청을 처리합니다.
   2. 자연어 처리 에이전트(NL to ICL Agent): 자연어를 내부 통신 언어로 변환합니다.
   3. 애플리케이션 에이전트(Application Agent): 특정 애플리케이션 기능을 수행합니다. 
   4. 메타 에이전트(Meta-Agent): 다른 에이전트들의 조정을 담당합니다. 
   5. 퍼실리테이터 에이전트(Facilitator Agent): 에이전트 간의 커뮤니케이션을 중재합니다.
3. Blue Print
   ``` mermaid 
   graph TD
    OAA[OAA Model]
    OAA --> UserInterfaceAgent
    OAA --> NLPAgent
    OAA --> ApplicationAgent
    OAA --> MetaAgent
    OAA --> FacilitatorAgent
   ``` 
#### 1-5-5. Zeus
1. 특징 
   1. 제우스는 강력한 에이전트 개발 툴킷으로, 에이전트 기반 시스템의 설계 및 구현을 지원합니다. 
   2. 에이전트들은 역할 기반 작업을 수행하며, 작업 계획 수립과 실행을 지원합니다. 
   3. 개방형 아키텍처를 통해 상호작용과 통합이 용이합니다.

2. 구성 요소 
   1. 에이전트(Agent): 자율적인 행동과 의사결정을 통해 특정 작업을 수행합니다. 
   2. 작업 관리자(Task Manager): 에이전트가 수행해야 할 작업을 계획하고 관리합니다. 
   3. 통신 관리자(Communication Manager): 에이전트 간의 메시지 전달 및 통신을 처리합니다. 
   4. 협상 관리자(Negotiation Manager): 에이전트 간의 협상을 통해 작업 할당 및 조정을 수행합니다. 
   5. 디렉토리 관리자(Directory Manager): 에이전트의 검색 및 등록을 지원합니다. 
   6. 지식 기반(Knowledge Base): 에이전트의 의사결정을 위한 규칙과 데이터를 저장합니다.

3. Blue Print
   ``` mermaid 
   graph TD
   Zeus[Zeus Model]
   Zeus --> Agent
   Zeus --> TaskManager
   Zeus --> CommunicationManager
   Zeus --> NegotiationManager
   Zeus --> DirectoryManager
   Zeus --> KnowledgeBase
   ```