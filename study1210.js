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
// const admin = new Member("guest1", "0000");

// DB
let membersDB = [
  { userId: "admin", password: "1234" },
  { userId: "guest1", password: "0000" },
  { userId: "guest2", password: "1111" },
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
  addMember(memberId) {
    membersDB.push({ userId: memberId, password: "0000" });
  }
  delMember(member) {
    console.log("delMember");
    if (member.password === undefined) {
      membersDB.map((val, index) => {
        console.log(val);
        if (val.userId === member.userId) {
          console.log(index);
          membersDB.splice(index, 1);
        }
      });
    }
  }
  editMember(member) {
    console.log("edit");
  }
}

const memberDao = new MemberDao(admin);

// proxy 처리
const proxy = new Proxy(admin, {
  get: function(target, prop, receiver) {
    return memberDao.checkLogin(target);
  },
  has: function(target, prop) {
    let result = Reflect.has(target, prop);
    return result;
  },
  set: function(target, prop, value, receiver) {
    console.log(`${prop}: ${value} 추가`);
    memberDao.addMember(value);
    console.log(membersDB[membersDB.length - 1]);
  },
  deleteProperty: function(target, prop) {
    console.log(Reflect.deleteProperty(target, prop));
    Reflect.deleteProperty(target, prop);
    console.log(target);
    memberDao.delMember(target);
    console.log();
    // console.log(membersDB[membersDB.length - 1]);
    return true;
  }
});
console.log(proxy.userId);
// console.log(proxy.userId);
const newMember = "jieun";

if (proxy.userId) {
  console.log(memberDao.checkID(admin));
  console.log(memberDao.checkPassword(admin.userId));
  if (proxy.userId === "admin") {
    proxy.userId = newMember;
    console.log(proxy.userId);
    let val = delete proxy.password;
    console.log(val);
  }
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

membersDB.map((val, index) => {
  console.log(val);
});
