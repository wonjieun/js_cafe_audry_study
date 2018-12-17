console.log('===============================================');
console.log('\t\t프록시 로그인 체크');
console.log('===============================================');

class Member {
  constructor(userId, password) {
    this.userId = userId;
    this.password = password;
  }
}

// 입력 값
const admin = new Member('admin', '1234');
const guest = new Member('guest1', '0000');

// DB
let membersDB = [
  { userId: 'admin', password: '1234' },
  { userId: 'guest1', password: '0000' },
  { userId: 'guest2', password: '1111' },
  { userId: 'admi', password: '1234' },
  { userId: 'user01', password: '1111' },
  { userId: 'user02', password: '2222' },
  { userId: 'user03', password: '3333' },
  { userId: 'user04', password: '4444' }
];

class MemberDao {
  constructor(member) {
    console.log('constructor');
  }
  checkLogin(member) {
    const filterMember = membersDB.filter(
      m => m.userId == member.userId && m.password == member.password
    );
    let authFlag;
    if (filterMember.length !== 0) {
      authFlag = filterMember[0].userId === 'admin' ? 'admin' : 'guest';
    }
    return authFlag ? authFlag : false;
  }
  checkID(member) {
    console.log('아이디가 존재합니다.');
    const filterMember = membersDB.filter(m => m.userId == member.userId);
    return filterMember[0].userId;
  }
  checkPassword(memberId) {
    if (proxy.password) {
      console.log('비밀번호는 아래와 같습니다.');
      const filterMember = membersDB.filter(m => m.userId == memberId);
      return filterMember[0].password;
    }
  }
  addMember(memberId) {
    membersDB.push({ userId: memberId, password: '0000' });
  }
  delMember(member) {
    console.log('delMember');
    if (member.password === undefined) {
      membersDB.map((val, index) => {
        if (val.userId === member.userId) {
          console.log(index);
          membersDB.splice(index, 1);
        }
      });
    }
  }
  editMember(member) {
    console.log('edit');
  }
}

const memberDao = new MemberDao(admin);

// proxy 처리
const proxy = new Proxy(guest, {
  get: function(target, prop, receiver) {
    return memberDao.checkLogin(target);
  },
  has: function(target, prop) {
    let result = Reflect.has(target, prop);
    if (prop === 'userId') {
      console.log(memberDao.checkID(target));
    } else {
      console.log(memberDao.checkPassword(target.userId));
    }
    return result;
  },
  set: function(target, prop, value, receiver) {
    if (auth === 'admin') {
      console.log(`${prop}: ${value} 추가`);
      memberDao.addMember(value);
    } else {
      console.log('member add 접근 금지');
    }
  },
  deleteProperty: function(target, prop) {
    // console.log(Reflect.deleteProperty(target, prop));
    Reflect.deleteProperty(target, prop);
    memberDao.delMember(target);
    return true;
  }
});
console.log(proxy.userId);

var auth = proxy.userId;
// console.log(proxy.userId);
let boolId = 'userId' in proxy;
console.log(boolId);

let boolPw = 'password' in proxy;
console.log(boolPw);

const newMember = 'jieun';
proxy.userId = newMember;

membersDB.map((val, index) => {
  console.log(val);
});
// TODO: 파일 분리 member: model, memberDao: service, proxy 공통 처리 (commonjs): proxy, main: view
// 빌드 하면 파일 하나로 번들링
// html 간단하게

// ES6
// Promise, Proxy, Module

let admin = new MemberDao({ userId: 'admin', password: '1234' });

let adminUser = new Proxy(admin, proxyCallBack);

adminUser.isLogin();

adminUser.add();
