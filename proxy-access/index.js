import { MemberService } from './memberService';
import { membersDB } from './membersDB';
import { handler } from './proxy';

let admin = new MemberService({ userId: 'admin', password: '1234' });
let guest = new MemberService({ userId: 'guest', password: '0000' });
let another = new MemberService({ userId: 'someone', password: '9999' });

let adminUser = new Proxy(admin, handler);
let guestUser = new Proxy(guest, handler);
let anotherUser = new Proxy(another, handler);

// adminUser .연산자를 사용할 때만 'get' trap call...
adminUser.isLogin;
adminUser.checkID('admin');
console.log('> ' + adminUser.checkPassword('admin'));

console.log('----- 멤버 추가 -----');
adminUser.addMember('jieun');

membersDB.map(val => {
  console.log(val);
});
