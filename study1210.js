console.log("===============================================");
console.log("\t\t프록시 로그인 체크");
console.log("===============================================");

class Member {
  constructor(userId, password) {
    this.userId = userId;
    this.password = password;
  }
}

// 입력 값
const admin = new Member("admin", "1234");
// const guest = new Member("guest", "0000");

// DB
let membersDB = [
  { userId: "admin", password: "1234" },
  { userId: "guest", password: "0000" },
  { userId: "admi", password: "1234" },
  { userId: "user01", password: "1111" },
  { userId: "user02", password: "2222" },
  { userId: "user03", password: "3333" },
  { userId: "user04", password: "4444" }
];

class MemberDao {
  constructor(member) {
    console.log("constructor");
  }
  checkLogin(member) {
    const filterMember = membersDB.filter(
      m => m.userId == member.userId && m.password == member.password
    );
    let authFlag;
    if (filterMember.length !== 0) {
      authFlag = filterMember[0].userId === "admin" ? "admin" : "guest";
    }
    return authFlag ? authFlag : false;
  }
  checkID(member) {
    // if (this.proxy.userId) {
    // console.log(this.proxy);
    console.log("아이디가 존재합니다.");
    const filterMember = membersDB.filter(m => m.userId == member.userId);
    return filterMember[0].userId;
    // }
  }
  checkPassword(memberId) {
    if (proxy.password) {
      console.log("비밀번호는 아래와 같습니다.");
      const filterMember = membersDB.filter(m => m.userId == memberId);
      return filterMember[0].password;
    }
  }
  addMember() {
    console.log(this.authFlag);
  }
  delMember() {
    console.log(this.authFlag);
  }
  editMember() {
    console.log(this.authFlag);
  }
}

const memberDao = new MemberDao(admin);

// proxy 처리
const proxy = new Proxy(admin, {
  get: function(target, prop, receiver) {
    return memberDao.checkLogin(target);
  },
  getPrototypeOf(target, prototype) {
    // console.log(Reflect.getPrototypeOf(target, prototype));
    console.log("트랩 호출");
    // memberDao.checkLogin(target);
    return Reflect.getPrototypeOf(target, prototype);
  },
  has: function(target, prop) {
    let result = Reflect.has(target, prop);
    return result;
  }
});
console.log("proxy >>");
// console.log(proxy.userId);

if (proxy.userId) {
  console.log(memberDao.checkID(admin));
  console.log(memberDao.checkPassword(proxy.userId));
} else {
  console.log("일치하는 정보가 없습니다.");
}

// let bool = "userId" in this.proxy;
// console.log(bool);

// for (let key in proxy) {
//   console.log(">> " + key);
// }
// console.log("proxy: ", proxy);
// console.log(Reflect.setPrototypeOf(proxy, admin));
// console.log(admin.userId);

// let proto = proxy.userId;
// console.log(proto);
