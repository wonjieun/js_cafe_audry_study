var authFlag = '';

export let handler = {
  get: function(target, propKey, receiver) {
    const targetValue = Reflect.get(target, propKey, receiver);
    authFlag = target.checkLogin(target);
    if (typeof targetValue === 'function') {
      if (
        !authFlag ||
        (authFlag === 'guest' &&
          (propKey === 'addMember' || propKey === 'delMember'))
      ) {
        return function(...args) {
          console.log('CALL', propKey, args);
          console.log('※ 접근할 수 있는 권한이 없습니다.');
        };
      } else {
        return function(...args) {
          console.log('CALL', propKey, args);
          return targetValue.apply(this, args);
        };
      }
    } else {
      authFlag = target.checkLogin(target);
      if (authFlag) console.log('----- 로그인 성공 -----');
      else console.log('----- 로그인 실패-----');
      return authFlag;
    }
  }
};
