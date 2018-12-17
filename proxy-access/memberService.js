import { Member } from './member';
import { membersDB } from './membersDB';

export class MemberService {
  constructor(member) {
    this.userId = member.userId;
    this.password = member.password;
  }
  checkLogin(member) {
    const filterMember = membersDB.filter(
      m => m.userId == member.userId && m.password == member.password
    );
    if (filterMember.length !== 0) {
      return filterMember[0].userId === 'admin' ? 'admin' : 'guest';
    } else return false;
  }
  checkID(memberId) {
    console.log('----- 아이디 체크 -----');
    console.log('입력한 ID > ' + memberId);
    const filterMember = membersDB.filter(m => m.userId == memberId);
    if (filterMember[0] === undefined) {
      console.log('아이디가 존재하지 않습니다.');
    } else {
      console.log('아이디가 존재합니다.');
      return filterMember[0].userId;
    }
  }
  checkPassword(memberId) {
    console.log('----- 비밀번호 체크 -----');
    console.log('입력한 ID > ' + memberId);
    console.log('비밀번호는 아래와 같습니다.');
    const filterMember = membersDB.filter(m => m.userId == memberId);
    return filterMember[0].password;
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
