# Proxy login

README.md

```
touch README.md
```

Parcel

```
yarn global add parcel-bundler
```

1.
build:
`babel`
build > ES6 -> ES5

2.
bundling:
`webpack`
bundling ? 파일을 하나로 묶기

3.
build -> bundling
결과물: 파일 한 개 (예. index.js)

4.
index.html에서 index.js를 링크 걸기

## babel, webpack 설정 해야 하니까 그냥 parcel로 하자.

```
parcel index.html
```

---

## window.onload 에러 발생

- window 객체 안에 생성자가 onload
- window 클래스 안에 내가 만든 객체 넣어주기

```
window.Index = Index;
```
