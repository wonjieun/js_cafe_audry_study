# ECMAScript 6 뿌시기

## http-server 실행한당

```
yarn add global http-server
http-server
```

or

```
npm install -g http-server
http-server
```

- http-server 명령어가 해당 폴더를 서버로 구축
- 폴더를 서버로 만들어서 host로 접근하기 위해서 사용
- 호스트로 접근하지 않으면, <u>**file://index.html**</u> 접근 (파일 더블클릭)하여 서버 환경처럼 테스트 불가

---

## http-server 무엇?

- node용 웹 서버
- html 페이지 개발 시, 데이터 요청 등의 인터페이스가 필요하면 웹서버를 통해 페이지 실행. 이 때, 간단하게 사용할 수 있는 웹서버

---

## package.json 뭐냐?

- package.json에서 npm start에 대한 동작을 정해줄 수 있다.
- 여러 개의 명령어가 파이프로 연결되어 있는 명령어를 스크립팅하여 관리

---

## Web Server / WAS (Web Application Server) / Just... Server(?)

서버 위에 컨테이너가 있는 것 VS 그냥 서버<br/>

- tomcat, jetty, undraw -> 서버 위에 컨테이너가 있는 것들
- http-server -> 그냥 서버

- was에는 정적파일을 넣지 않는다
- Apache는 php 해석기가 들어가 있어 was라고 본다 !!!
- IIS는 asp.net ASP를 구동할 수 있다

**Web Application Server (WAS)**
라고 하는 것은 "언어를 해석할 수 있는 서버"

- servlet을 통한 프로그래밍을 해석할 수 있는 기능이 포함

---

# ESCMAScript 6 문법 export, import가 안됨 !!!

## Babel 프리컴파일러 설치

```
npm install babel-cli -g
```

## Babel 사양 설치 (deprecated)

```
npm install --save-dev @babel/preset-es2015s
```

## preset 파일 만들기

`.babelrc`

```
{
  "presets": ["@babel/preset-env"]
}

```

## 컴파일 하기 src는 소스 폴더, dist 빌드되서 나오는 폴더

```
babel src -d dist -w
```

## 실행

```
node ./dist/main.js
```

---

#### ※ 가끔 npm, node 관련 오류 발생할 때 ※

```
npm cache verify
```
