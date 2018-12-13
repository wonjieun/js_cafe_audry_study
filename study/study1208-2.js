console.log("===============================================");
console.log("\t\t프록시 로그인 체크");
console.log("===============================================");

/* member, memberdao
  ---- admin ----
  ---- guest ----
  loginCheck()      // 로그인 체크
  IDCheck()         // ID찾기
  passwordCheck()   // PW찾기
  ---- guest ----
  addMember()       // 
  delMember()
  editMember()
  ---- admin ----
*/

class Member {
  constructor(userId, password) {
    this.userId = userId;
    this.password = password;
    console.log(this.userId, this.password);
  }
}

// 입력 값
const admin = new Member("admin", "1234");
// const guest = new Member("guest", "0000");

// DB
let membersDB = [
  { userId: "admin", password: "1234" },
  { userId: "admin", password: "123" },
  { userId: "admi", password: "1234" },
  { userId: "user01", password: "1111" },
  { userId: "user02", password: "2222" },
  { userId: "user03", password: "3333" },
  { userId: "user04", password: "4444" }
];

class MemberDao {
  constructor() {
    console.log("constructor");
  }
  checkLogin(member) {
    const filterMember = membersDB.filter(
      m => m.userId == member.userId && m.password == member.password
    );
    console.log(filterMember);
    // TODO: filterName이 존재하면 return true
    return filterMember;
  }
  checkID(id) {}
  checkPassword(password) {}
  addMember(member) {}
  delMember(member) {}
  editMember(member) {}
}

const memberDao = new MemberDao();
// proxy 처리
const proxy = new Proxy(admin, {
  get: function(target, prop, receiver) {
    // target으로 직접 접근 시, target의 객체 타입, 속성 타입 모두
    // 출력 되어 여러 번 호출. 원하는 결과를 도출할 수 없음
    memberDao.checkLogin(Reflect.get(target, prop, receiver));
    return Reflect.get(target, prop, receiver);
  }
});

for (let key in proxy) {
  console.log(">> " + key);
}
console.log("proxy: ", proxy);

// TODO: node upgrade 하기
