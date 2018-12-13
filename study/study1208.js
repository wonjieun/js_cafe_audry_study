// class Display {
//   constructor() {}
// }

// class Feature {
//   constructor() {}
// }

// class Rect extends Display {
//   constructor() {}
// }

// const rect = new Rect();

class Member {
  constructor(userId, password) {
    this.userId = "admin";
    this.password = "1234";
    console.log(this.userId, this.password);
  }

  foo() {
    console.log("foo");
  }
}

const member = new Member("admin", "1234");

let proxy = new Proxy(member, {
  get: function(target, prop, receiver) {
    target.foo();

    // DB
    let members = [
      { user: "admin", pw: "1234" },
      { user: "admin", pw: "123" },
      { user: "admi", pw: "1234" },
      { user: "user01", pw: "1111" },
      { user: "user02", pw: "2222" },
      { user: "user03", pw: "3333" },
      { user: "user04", pw: "4444" }
    ];
    // CRUD
    let getLogin = function(member) {
      let checkMember = members.filter(m => m.user == member.userId);
      return checkMember.filter(m => m.pw == member.password);
    };

    // let boolProxy = getLogin(target) !== [] ? true : false;
    // console.log(getLogin(target));
    return getLogin(target);
  }
});

console.log("proxy.userId: " + JSON.stringify(proxy.userId));
console.log("proxy.password: " + JSON.stringify(proxy.password));
