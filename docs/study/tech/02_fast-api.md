# Fast API
---

## 0. 개요

> FastAPI는 Python 기반의 현대적인 웹 프레임워크로, RESTful API 및 비동기 서버 개발을 위해 설계되었습니다.   
> 높은 성능, 자동 문서화, 직관적인 코드 작성이 특징이며, Starlette과 Pydantic을 기반으로 합니다.

## 1. 구성 요소

### 1-1. 비동기 아키텍처

1. FastAPI는 ASGI(Asynchronous Server Gateway Interface) 표준을 따릅니다.  
   이는 기존 WSGI(Web Server Gateway Interface)와는 달리 비동기 처리를 지원하며,  
   WebSocket, HTTP/2 같은 현대적인 프로토콜과의 통합을 가능하게 합니다.

### 1-2. 핵심 구성 요소

#### 1-2-1. Starlette

* FastAPI는 Starlette을 기반으로 동작하며, ASGI 서버의 기능을 확장하는 경량 프레임워크입니다.

1. 주요 기능
    1. **라우팅**: 경로와 요청 메서드를 매핑하여 요청을 처리합니다.
    2. **미들웨어**: 요청과 응답 사이의 추가 작업(예: 로깅, 인증)을 수행합니다.
    3. **WebSocket 지원**: 실시간 양방향 통신을 위한 WebSocket 프로토콜을 지원합니다.
    4. **백그라운드 작업**: 비동기 작업 처리를 위해 `BackgroundTask`와 같은 기능을 제공합니다.
2. Example
   ```python
      from starlette.responses import JSONResponse
      from starlette.applications import Starlette
      from starlette.routing import Route
      
      async def homepage(request):
          return JSONResponse({"message": "Hello, Starlette!"})
      
      app = Starlette(routes=[
          Route("/", homepage)
      ])
   ```

#### 1-2-2. Pydantic

* FastAPI는 데이터 검증과 직렬화를 위해 Pydantic을 사용합니다.

1. 주요 기능
    1. **데이터 검증**: 입력된 데이터가 지정된 타입 및 조건에 맞는지 검사합니다.
    2. **직렬화 및 역직렬화**: Python 객체를 JSON 형식으로 변환하거나 역으로 변환합니다.
    3. **타입 힌트 활용**: Python의 타입 힌트를 활용하여 명확한 데이터 구조를 정의합니다.

2. Example
    ```python
    from pydantic import BaseModel, Field

    class Item(BaseModel):
        name: str = Field(..., description="Name of the item")
        price: float = Field(..., gt=0, description="Price must be greater than 0")
        stock: int = Field(..., ge=0, description="Stock count cannot be negative")

    # 데이터 검증
    item_data = {"name": "Laptop", "price": 1200.0, "stock": 10}
    item = Item(**item_data)
    print(item.json())
    ```

#### 1-2-3. OpenAPI

* FastAPI는 OpenAPI 스펙을 활용하여 자동으로 API 문서를 생성합니다.

1. 주요 기능
    1. **자동 문서화**: `/docs` 경로에서 Swagger UI를 통해 인터랙티브한 문서를 제공합니다.
    2. **ReDoc 지원**: `/redoc` 경로에서 OpenAPI 스펙 기반의 대안 문서를 확인할 수 있습니다.
    3. **스펙 확장**: 사용자 정의 메타데이터(예: 설명, 태그)를 추가할 수 있습니다.
2. Example
   ```python
      from fastapi import FastAPI

      app = FastAPI(
       title="Sample API",
       description="This is a sample API using OpenAPI documentation.",
       version="1.0.0"
      )

      @app.get("/items/{item_id}", summary="Get an item by ID", tags=["Items"])
      async def get_item(item_id: int):
       """
       Retrieve an item using its ID.
       - **item_id**: The ID of the item to retrieve.
       """
       return {"item_id": item_id, "name": "Sample Item"}
      ```

#### 1-2-4. JSON Schema

* FastAPI는 Pydantic 모델에서 JSON Schema를 자동으로 생성합니다.

1. 주요 기능
    1. **데이터 구조 명시**: 클라이언트와 서버 간 데이터 교환 구조를 명확히 정의합니다.
    2. **검증 규칙 제공**: 클라이언트가 요청을 보낼 때 요구되는 데이터의 제약 조건을 명시합니다.
    3. **자동 생성**: Pydantic 모델에서 정의된 필드와 타입 정보를 기반으로 JSON Schema를 생성합니다.
2. Example
      ```python
      from pydantic import BaseModel

      class User(BaseModel):
        id: int
        username: str
        email: str

      # JSON Schema 생성
      schema = User.schema()
      print(schema)
      # Output
      {
        "title": "User",
        "type": "object",
        "properties": {
            "id": {"title": "Id", "type": "integer"},
            "username": {"title": "Username", "type": "string"},
            "email": {"title": "Email", "type": "string"}
        },
        "required": ["id", "username", "email"]
      }
      ```

### 1-3. 라우팅

#### 1-3-1. 라우팅

* 라우팅은 HTTP 요청이 특정 URL 경로와 매칭되었을 때 해당 요청을 처리할 로직을 실행하는 과정입니다.
* FastAPI는 Python 타입 힌트를 활용하여 경로와 데이터를 명확하게 매핑하며, 간결하고 직관적인 코드를 작성할 수 있도록 지원합니다.

1. 주요 기능
    1. **HTTP 메서드 라우팅**
        - GET, POST, PUT, DELETE 등 HTTP 메서드별로 처리할 엔드포인트를 정의합니다.
        - Python 데코레이터를 사용하여 간단히 작성할 수 있습니다.
    2. **경로 매개변수**
        - 경로에서 동적으로 값을 받아 처리하며, Python 타입 힌트로 데이터 타입을 검증할 수 있습니다.
    3. **쿼리 매개변수**
        - URL의 쿼리 문자열을 통해 데이터를 전달받고 기본값, 필수 여부를 설정할 수 있습니다.
    4. **요청 본문 데이터**
        - POST 및 PUT 요청에서 본문 데이터를 Pydantic 모델로 검증 및 파싱합니다.
    5. **커스텀 경로 파라미터**
        - 정규 표현식을 사용하여 경로 매핑을 세밀하게 설정할 수 있습니다.

2. Example
   ```python
   from fastapi import FastAPI
   from pydantic import BaseModel

   app = FastAPI()

   # HTTP 메서드 라우팅과 경로 매개변수
   @app.get("/items/{item_id}")
   async def read_item(item_id: int):
       """
       경로 매개변수를 사용하여 아이템 정보를 반환합니다.
       - **item_id**: 요청한 아이템의 ID
       """
       return {"item_id": item_id}

   # 쿼리 매개변수
   @app.get("/search/")
   async def search_items(name: str, limit: int = 10):
       """
       쿼리 매개변수를 사용하여 검색 조건을 설정합니다.
       - **name**: 검색할 아이템 이름
       - **limit**: 검색 결과 제한 개수 (기본값: 10)
       """
       return {"name": name, "limit": limit}

   # POST 요청과 본문 데이터 처리
   class Item(BaseModel):
       name: str
       description: str = None
       price: float
       stock: int

   @app.post("/items/")
   async def create_item(item: Item):
       """
       Pydantic 모델을 사용하여 본문 데이터를 검증하고 처리합니다.
       """
       return {"item": item}

   # 커스텀 경로 파라미터
   @app.get("/files/{file_path:path}")
   async def read_file(file_path: str):
       """
       경로 파라미터를 사용하여 파일 경로를 처리합니다.
       - **file_path**: 요청 경로의 모든 값을 처리
       """
       return {"file_path": file_path}

   # 라우팅 메타데이터 추가
   @app.get(
       "/users/{user_id}",
       summary="Retrieve user by ID",
       description="사용자 ID를 기반으로 정보를 반환합니다.",
       tags=["Users"]
   )
   async def get_user(user_id: int):
       """
       사용자를 조회하는 엔드포인트입니다.
       """
       return {"user_id": user_id, "username": "John Doe"}

### 1-4. 의존성 주입 (Dependency Injection)

#### 1-4-1. Dependency Injection

* 의존성 주입(Dependency Injection)은 특정 함수가 실행될 때 외부에서 필요한 객체나 데이터를 제공받아 동작하는 설계 방식입니다.

1. 주요 기능
    1. Depends
        - FastAPI는 `Depends`를 활용하여 공통 로직(예: 데이터베이스 연결, 인증)을 재사용 가능하게 분리하며, 코드의 가독성과 유지보수를 용이하게 합니다.

2. Example
   ```python
   from fastapi import FastAPI, Depends

   app = FastAPI()

   # 공통 의존성 함수 정의
   def get_db():
       """
       데이터베이스 연결 객체를 반환하는 공통 함수
       """
       db_connection = {"db_name": "example_db", "status": "connected"}
       return db_connection

   # 의존성을 사용하는 엔드포인트
   @app.get("/items/")
   async def read_items(db=Depends(get_db)):
       """
       데이터베이스 연결 객체를 의존성으로 주입받아 사용
       """
       return {"db_status": db["status"]}
   
   # 인증 토큰 검증 함수
   def verify_token(token: str):
       if token != "valid-token":
           raise HTTPException(
               status_code=status.HTTP_401_UNAUTHORIZED,
               detail="Invalid authentication token"
           )
       return {"user_id": 123}

   # 엔드포인트에서 의존성으로 주입
   @app.get("/protected/")
   async def protected_route(user=Depends(verify_token)):
       """
       인증된 사용자만 접근 가능한 엔드포인트
       """
       return {"user": user}
   
   # 비동기 의존성 함수 정의
   async def get_data():
       await asyncio.sleep(1)  # 비동기 작업 시뮬레이션
       return {"data": "Async fetched data"}

   # 의존성을 사용하는 엔드포인트
   @app.get("/async-data/")
   async def async_route(data=Depends(get_data)):
       """
       비동기 의존성 데이터를 사용
       """
       return {"result": data}
      
   # 의존성 A
   def dependency_a():
       return {"key": "value from A"}

   # 의존성 B
   def dependency_b(a=Depends(dependency_a)):
       return {"key": "value from B", "depends_on": a}

   # 다중 의존성 사용
   @app.get("/multiple-deps/")
   async def multiple_dependencies_route(b=Depends(dependency_b)):
       """
       의존성 B는 A에 의존하며, 최종적으로 B의 데이터를 반환
       """
       return {"result": b}
   ```

### 1-5. 데이터 모델

#### 1-5-1. 데이터 모델링

* 데이터 모델링은 FastAPI에서 데이터의 구조를 정의하고, 요청/응답 데이터를 처리하는 핵심 요소입니다.
* FastAPI는 Pydantic의 `BaseModel`을 사용하여 데이터를 정의하며, Python 타입 힌트를 통해 유효성을 검증하고 데이터를 직렬화/역직렬화합니다.
* 이를 통해 개발자는 명확한 데이터 구조를 작성할 수 있으며, 클라이언트-서버 간 데이터 교환을 간단하게 처리할 수 있습니다.

1. 주요 기능
    1. **데이터 구조 정의**
        - Pydantic의 `BaseModel`을 사용하여 데이터 필드와 타입을 명시적으로 정의합니다.
    2. **입력 데이터 검증**
        - 요청 본문의 데이터를 자동으로 검증하며, 잘못된 데이터가 들어오면 명확한 오류 메시지를 반환합니다.
    3. **응답 데이터 직렬화**
        - Python 객체를 JSON 형식으로 자동 변환하여 클라이언트에 반환합니다.
    4. **기본값 및 제약 조건**
        - 필드에 기본값과 제약 조건(예: 최소값, 최대값)을 설정할 수 있습니다.
    5. **문서화 통합**
        - 정의된 데이터 모델이 OpenAPI 문서로 자동 생성됩니다.

2. Example
   ```python
   from pydantic import BaseModel
   
   class Item(BaseModel):
    name: str
    description: str = None
    price: float
    stock: int = 0
    is_available: bool = True    
   ```
### 1-6. 미들웨어

#### 1-6-1. MiddleWare
* 미들웨어는 요청(Request)과 응답(Response)을 처리하는 과정에서 중간에 개입하여 추가 작업을 수행하는 컴포넌트입니다.  
* FastAPI는 Starlette의 미들웨어 시스템을 사용하며, 요청 로깅, 인증, 응답 헤더 추가 등 전역적인 작업을 처리하는 데 유용합니다.  
* 사용자 정의 미들웨어를 작성하거나 제공되는 미들웨어를 바로 사용할 수 있습니다.

1. 주요 기능
   1. **요청 처리**
      - 요청 데이터를 가로채서 추가 작업(예: 데이터 검증, 인증)을 수행합니다.
   2. **응답 처리**
      - 응답 데이터를 수정하거나 커스텀 헤더를 추가하는 작업을 처리합니다.
   3. **전역 적용**
      - 애플리케이션 레벨에서 모든 요청과 응답에 대해 일괄적으로 적용됩니다.
   4. **사용자 정의 가능**
      - 특정 요구 사항에 맞춰 미들웨어를 자유롭게 작성할 수 있습니다.

2. Example
   ```python
   from fastapi import FastAPI
   from starlette.middleware.base import BaseHTTPMiddleware
   from starlette.responses import Response

   app = FastAPI()

   # 사용자 정의 미들웨어
   class CustomMiddleware(BaseHTTPMiddleware):
       async def dispatch(self, request, call_next):
           print("미들웨어 시작: 요청 처리")
           response = await call_next(request)  # 요청을 다음 처리기로 전달
           print("미들웨어 종료: 응답 반환")
           return response

   # 미들웨어 추가
   app.add_middleware(CustomMiddleware)

   @app.get("/")
   async def root():
       return {"message": "Hello, FastAPI"}
   
   # 응답 헤더 추가
   @app.middleware("http")
   async def add_custom_header(request, call_next):
       """
       모든 응답에 X-Custom-Header 추가
       """
       response = await call_next(request)
       response.headers["X-Custom-Header"] = "CustomValue"
       return response

   # 요청 처리 시간 측정
   @app.middleware("http")
   async def measure_request_time(request, call_next):
       """
       요청 처리 시간을 측정하여 응답 헤더에 추가
       """
       start_time = time.time()
       response = await call_next(request)
       process_time = time.time() - start_time
       response.headers["X-Process-Time"] = str(process_time)
       print(f"Request processed in {process_time} seconds")
       return response
   # 인증 미들웨어
   @app.middleware("http")
   async def authentication_middleware(request: Request, call_next):
       """
       Authorization 헤더에서 토큰 검증
       """
       token = request.headers.get("Authorization")
       if token != "valid-token":
           raise HTTPException(status_code=401, detail="Invalid or missing token")
       response = await call_next(request)
       return response
   # 사용자 정의 에러 처리
   @app.middleware("http")
   async def handle_errors(request: Request, call_next):
       """
       요청 처리 중 발생하는 오류를 전역적으로 처리
       """
       try:
           response = await call_next(request)
       except Exception as e:
           return Response(f"Error: {str(e)}", status_code=500)
       return response
   ```