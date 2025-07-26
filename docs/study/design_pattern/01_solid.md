# SOLID Principles

---

## 0. 개요

> SOLID Overview

SOLID는 객체지향 설계의 5대 원칙으로, 소프트웨어 시스템의 유연성, 유지보수성, 확장성을 향상시키기 위한 가이드라인이다.  
각 원칙은 클래스 설계와 모듈 구조에 대한 명확한 책임 분리와 의존성 제어를 강조하며, 견고한 아키텍처 기반을 제공한다.

1. **SRP (Single Responsibility Principle)**: 단일 책임 원칙
2. **OCP (Open/Closed Principle)**: 개방-폐쇄 원칙
3. **LSP (Liskov Substitution Principle)**: 리스코프 치환 원칙
4. **ISP (Interface Segregation Principle)**: 인터페이스 분리 원칙
5. **DIP (Dependency Inversion Principle)**: 의존 역전 원칙


## 1. SRP: 단일 책임 원칙

> 클래스는 하나의 책임만 가져야 하며, 하나의 변경 이유만을 가져야 한다.

* 책임이 분리되지 않으면 변경 범위가 넓어지고, 테스트와 유지보수가 어려워진다.

### 1-1. SRP 예제

```java
// Bad Case: 여러 책임을 가진 클래스
public class FileManager {
    public void saveFile(String fileName) {}
    public void readFile(String fileName) {}
    public void deleteFile(String fileName) {}
    public void processFile(String fileName) {}
}
```

```java
// Good Case: 책임을 분리한 설계
public class FileSaver { public void saveFile(String fileName) {} }
public class FileReader { public void readFile(String fileName) {} }
public class FileDeleter { public void deleteFile(String fileName) {} }
public class FileProcessor { public void processFile(String fileName) {} }
```

## 2. OCP: 개방-폐쇄 원칙

> 소프트웨어는 확장에는 열려 있어야 하고, 수정에는 닫혀 있어야 한다.

* 기능 추가 시 기존 코드를 수정하지 않고 새로운 클래스를 통해 확장 가능해야 한다.

### 2-1. 예제

```java
// Bad Case: 연산 추가 시 switch-case를 수정해야 함
public class Calculator {
    public double calculate(String op, double a, double b) {
        switch (op) {
            case "add": return a + b;
            case "sub": return a - b;
            default: throw new IllegalArgumentException();
        }
    }
}
```

```java
// Good Case: 인터페이스를 통한 확장
public interface Operation { double operate(double a, double b); }

public class Addition implements Operation {
    public double operate(double a, double b) { return a + b; }
}

public class Calculator {
    public double calculate(Operation op, double a, double b) {
        return op.operate(a, b);
    }
}
```

## 3. LSP: 리스코프 치환 원칙

> 서브타입은 언제나 자신의 기반 타입으로 교체 가능해야 한다.

* 상위 타입의 기능을 그대로 대체할 수 있어야 하며, 행위가 일관되어야 한다.

### 3-1. 예제

```java
// Bad Case: Square는 Rectangle의 행위를 변경
class Rectangle {
    int width, height;
    public void setWidth(int w) { this.width = w; }
    public void setHeight(int h) { this.height = h; }
    public int area() { return width * height; }
}

class Square extends Rectangle {
    public void setWidth(int w) { this.width = this.height = w; }
    public void setHeight(int h) { this.width = this.height = h; }
}
```

```java
// Good Case: 공통 인터페이스를 통해 분리
interface Shape { int area(); }

class Rectangle implements Shape {
    int width, height;
    public void setWidth(int w) { this.width = w; }
    public void setHeight(int h) { this.height = h; }
    public int area() { return width * height; }
}

class Square implements Shape {
    int side;
    public void setSide(int s) { this.side = s; }
    public int area() { return side * side; }
}
```

## 4. ISP: 인터페이스 분리 원칙

> 클라이언트는 자신이 사용하지 않는 메서드에 의존하지 않아야 한다.

* 하나의 큰 인터페이스보다 여러 개의 세분화된 인터페이스로 분리하는 것이 좋다.

### 4-1. 예제

```java
// Bad Case: 모든 기능을 포함한 인터페이스
interface Worker {
    void work(); void eat(); void sleep();
}
```

```java
// Good Case: 기능별 인터페이스 분리
interface Workable { void work(); }
interface Eatable { void eat(); }
interface Sleepable { void sleep(); }

class Human implements Workable, Eatable, Sleepable {
    public void work() {}
    public void eat() {}
    public void sleep() {}
}
```

## 5. DIP: 의존 역전 원칙

> 고수준 모듈은 저수준 모듈에 의존하지 않고, 둘 다 추상화에 의존해야 한다.

* 구현 클래스가 아닌 인터페이스에 의존함으로써 유연하고 확장 가능한 설계를 이끈다.

### 5-1. 예제

```java
// Bad Case: 상위 모듈이 하위 구현 클래스에 직접 의존
class LightBulb {
    public void turnOn() {}
}

class Switch {
    private LightBulb bulb = new LightBulb();
    public void flip() { bulb.turnOn(); }
}
```

```java
// Good Case: 인터페이스를 통한 의존성 역전
interface Switchable {
    void turnOn();
}

class LightBulb implements Switchable {
    public void turnOn() {}
}

class Switch {
    private final Switchable device;
    public Switch(Switchable device) { this.device = device; }
    public void flip() { device.turnOn(); }
}
```