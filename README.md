# js_cafe_audry_study
js_cafe_audry_study

#######################
http-server로 실행해라.
#######################
http-server 명령어가 해당 폴더를 서버로 구축
폴더를 서버로 만들어서 host로 접근하기 위함
호스트로 접근 하지 않으면, file://index.html 접근 되어 서버 환경처럼 테스트 불가

package.json
package.json에서 npm start에 대한 동작을 정해줄 수 있다.
여러 개의 명령어가 파이프로 연결되어 있는 명령어를 스크립팅하여 관리

서버 위에 컨테이너가 있는 것 VS 그냥 서버
tomcat, jetty, undraw -> 서버 위에 컨테이너가 있는 것들
http-server -> 그냥 서버

was에는 정적파일을 넣지 않는다
Apache는 php 해석기가 들어가 있어 was라고 본다 !!!
IIS는 asp.net ASP를 구동할 수 있다

Web Application Server (WAS)
라고 하는 것은 "언어를 해석할 수 있는 서버"
servlet을 통한 프로그래밍을 해석할 수 있는 기능이 포함