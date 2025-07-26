# Test Containers

---

## 0. 개요

> Test Container Overview

1. 통합 테스트를 위해 Docker 컨테이너를 쉽게 관리할 수 있는 라이브러리
2. 독립적인 테스트 환경을 구성하고 DB, MQ, 마이크로 서비스 환경에서의 외부 모듈에 의존하는 테스트 시나리오를 보다 안정적으로 실행할 수 있음
3. Python에서는 `testcontainers-python` 라이브러리를 통해 이를 사용 가능

## 1. 구성 요소

### 1-1. 핵심 모듈

1. Container 클래스
    1. Docker 컨테이너의 생성, 실행, 중지 및 정리를 추상화한 기본 클래스
    2. 주요 메서드
        * start(): 컨테이너 실행
        * stop(): 컨테이너 중지
        * get_logs(): 컨테이너 로그 확인

2. 특화 컨테이너
   > Test Containers는 다양한 애플리케이션을 위한 특화된 컨테이너 클래스를 제공
    * DB Container
        * PostgreSQL, MySQL, MariaDB, Redis, MongoDB 등 지원
    * MQ Container
        * Kafka, RabbitMQ
    * 브라우저 컨테이너
        * Selenium을 통해 브라우저 테스트 환경 제공

3. 유틸리티 기능
    * 네트워크 관리
        * 컨테이너 간 네트워크 연결 설정 가능
    * 환경 변수 설정
        * 컨테이너 내부 애플리케이션에 필요한 환경 변수 주입 가능
    * 볼륨 마운트
        * 호스트 디렉토리와 컨테이너 디렉토리를 연결하여 파일 공유 가능

### 1-2. 요구 사항

1. Docker 데몬이 활성화 되어 있어야 함
2. Docker Engine 19.03 이상

### 1-3. 테스트 프레임워크 통합

1. pytest
    * pytest의 `fixture`를 사용하여 컨테이너 생명 주기를 관리할 수 있음
    * 플러그인 없이 간단히 설정 가능하며, `setup` 및 `teardown` 라이프사이클과 통합 가능

2. unittest
    * Python의 기본 테스트 프레임워크와도 호환가능
        * 수동으로 컨테이너 생명 주기를 관리 필요

### 1-4. CI/CD 통합

> GitHub Actions, GitLab CI, Jenkins와 같은 CI 도구와 원할한 통합이 가능

1. GitHub Actions 예제
    ```yaml
    jobs:
      test:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v2
          - name: Set up Python
            uses: actions/setup-python@v2
            with:
              python-version: '3.10'
          - name: Install dependencies
            run: pip install testcontainers pytest
          - name: Run tests
            run: pytest
    ```

## 2. 특징

### 2-1. 장점

1. 독립적이고 재현 가능한 테스트 환경 구현 가능
    * 동일한 컨테이너 이미지와 설정을 사용하여 Local, CI/CD, Production 환경에서 동일한 테스트의 실행 가능

2. 다양한 기술 스택 지원
    * PostgreSQL, MySQL, Redis 등 데이터베이스는 물론 Kafka, RabbitMQ와 같은 메시징 큐도 지원합니다.

3. 클린업 자동화
    * 컨테이너가 종료시 모든 리소스가 정리되어 불필요한 리소스 낭비의 방지

4. 간편한 설정 및 관리
    * 기존 Docker 설정과 달리 python script로 컨테이너의 실행 및 관리 가능

### 2-2. 단점

1. Docker 의존성
   * Docker 설치가 필요
   * host system 환경에 따라 Docker 구성 문제로 인해 테스트 실행이 지연 가능성 존재

2. 속도
   * 초기 실행 시 이미지 다운로드 및 컨테이너 초기화 시간으로 인한 테스트 성능 저하 발생 가능성 존재

3. 테스트 환경 구성
    * 네트워크 연결, 볼륨 마운트 , 환경 변수 주입 등에 시간 소요 필요

4. 리소스 사용량 증가
   * 호스트 시스템의 메모리와 CPU를 소모하여, 다수의 컨테이너 병렬 실행 시 리소스 부족 문제 발생 가능성 존재

## 3. 예제 코드

### 3-1. PostgreSQL 컨테이너 실행
 ```python
    from testcontainers.postgres import PostgresContainer
    import psycopg2
    
    # PostgreSQL 컨테이너 실행
    with PostgresContainer("postgres:13") as postgres:
        connection_url = postgres.get_connection_url()
    
        # 데이터베이스 연결
        conn = psycopg2.connect(connection_url)
        cursor = conn.cursor()
    
        # 테스트용 테이블 생성 및 데이터 삽입
        cursor.execute("CREATE TABLE test (id SERIAL PRIMARY KEY, name VARCHAR(50));")
        cursor.execute("INSERT INTO test (name) VALUES ('Postgres Test Data');")
        conn.commit()
    
        # 데이터 조회
        cursor.execute("SELECT * FROM test;")
        results = cursor.fetchall()
        print(results)  # [(1, 'Postgres Test Data')]
    
        cursor.close()
        conn.close()
 ```

### 3-2. pytest와 3-1 예제의 PostgreSQL 컨테이너 사용

 ```python
    import pytest
    from testcontainers.postgres import PostgresContainer
    import psycopg2
    
    
    @pytest.fixture(scope="module")
    def postgres_container():
        with PostgresContainer("postgres:13") as postgres:
            yield postgres
    
    
    # 테스트 함수
    def test_postgres_data(postgres_container):
        connection_url = postgres_container.get_connection_url()
    
        # PostgreSQL 데이터베이스 연결
        conn = psycopg2.connect(connection_url)
        cursor = conn.cursor()
    
        # 기존 데이터 확인
        cursor.execute("SELECT * FROM test;")
        results = cursor.fetchall()
        assert results == [(1, 'Postgres Test Data')]
    
        # 새로운 데이터 삽입
        cursor.execute("INSERT INTO test (name) VALUES ('Additional Data');")
        conn.commit()
    
        # 데이터 확인
        cursor.execute("SELECT * FROM test;")
        all_results = cursor.fetchall()
        assert all_results == [(1, 'Postgres Test Data'), (2, 'Additional Data')]
    
        cursor.close()
        conn.close()
 ```

### 3-3. 특정 registry에 login하여 이미지 실행
```python
   from testcontainers.core.container import DockerContainer
   import docker
   
   # Docker 클라이언트를 사용하여 네임스페이스에 로그인
   client = docker.from_env()
   client.login(username="id", password="password\", registry="plo-example")
   
   # agent 레포지토리의 최신 이미지 사용
   with DockerContainer("plo-example/agent:latest") as agent:
      agent.with_bind_ports(5000, 5000)
      agent.with_env("APP_ENV", "prod")
      agent.start()
   
      # 컨테이너 내부 상태 확인
      logs = agent.get_logs()
      print("Agent Logs:", logs)
```

---

## 4. Reference
1. 공식 문서 : [testcontainers-python](https://testcontainers-python.readthedocs.io/en/latest/)
2. GitHub : [testcontainers-python-github](https://github.com/testcontainers/testcontainers-python)
3. 우아한 형제들 기술 블로그 : [Elastic 병렬 테스트를 향한 여정](https://techblog.woowahan.com/18486/)

