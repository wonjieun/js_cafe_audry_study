console.log("===============================================");
console.log("\t\t프로미스 로또");
console.log("===============================================");

let uncheckedAllTurns = [];
//let tempTurns = [];
let turns = [];

function setNumRandom() {
  let lottoNum = [];
  for (let i = 0; i < 7; i++) {
    lottoNum[i] = Math.floor(Math.random() * 38 + 1);
  }
  return lottoNum;
}

function checkNum(lottoNumber) {
  let lottoCheck = new Set(lottoNumber);
  let arrayLotto = [];
  lottoCheck.forEach(function(value, key) {
    arrayLotto.push(value);
  });
  return arrayLotto;
}

// TODO: 재귀 적용
function checkTurns(allTurns) {
  let lottoTurnCheck = new Set(allTurns);
  lottoTurnCheck.forEach(function(value, key) {
    turns.push(value);
  });
}

function setTurn(checkedNum) {
  checkedNum.sort(function(a, b) {
    return a - b;
  });
  uncheckedAllTurns.push(JSON.stringify(checkedNum));
}

function* lottoGen(turns) {
  for (let turn of turns) {
    yield turn;
  }
}

// 1~9회차 로또
// 1 ~ 38
function lottoFactory() {
  for (let i = 0; i < 9; i++) {
    // 루프로 7자리를 채우기
    let randomNum = setNumRandom();

    // 각 자리 수 마다 중복체크 (SET)
    let checkedNum = checkNum(randomNum);

    if (randomNum.length === checkedNum.length) {
      // 모든 회차 array 담기
      setTurn(checkedNum);
    }
  }
  // 각 회차 마다 정렬 중복체크 (SET)
  checkTurns(uncheckedAllTurns);

  //   console.log("turns >>> " + turns);
  //FIXME: turns가 9개로 채워질 때 까지 check해서 넣기

  //TODO: 재귀함수 응용하면 Set 중복체크 관련 처리 가능
}
lottoFactory();

// 결과 yield
let lotto = lottoGen(turns);

// 유지보수 확장성을 고려하자
// 상태 관리 필요
// map reduce filter 사용
// -> lazy evolution

function sumLotto() {
  let lottoNum = lotto.next().value;
  let sumLotto = JSON.parse(lottoNum);
  let sum = 0;
  for (let oneLotto of sumLotto) {
    sum += oneLotto;
  }
  // console.log("sum >>> " + sum);
  return sum;
}

function compareSum(args) {
  let sumArr = args.sort(function(a, b) {
    return b - a;
  });
  // console.log(sumArr);
}

// TODO: 로또 숫자의 합이 가장 큰 순서대로 출력
let promise1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve(sumLotto());
  }, 1000);
});

let promise2 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve(sumLotto());
  }, 2000);
});

let promise3 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve(sumLotto());
  }, 3000);
});

let iterable = [promise1, promise2, promise3];
Promise.all(iterable).then(
  function(value) {
    compareSum(value);
    // console.log("value >>> " + value);
  },
  function(reason) {
    console.log(reason);
  }
);

console.log("===============================================");
console.log("\t\t프록시 로그인");
console.log("===============================================");

// Proxy를 이용해서 로그인 처리
let member = {
  userId: "admin",
  password: "1234",
  calculation: function() {
    return "yes";
  }
};
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

// admin / 1234
// TODO: id, pw가 일치하면 calculation 함수를 호출
// proxy get method -> if (getLogin(member)) true else false;
let proxy = new Proxy(member, {
  // get 메소드는 . 연산을 후크하는 역할
  // target은 member
  get: function(target, prop, receiver) {
    // let result = Reflect.get(member, prop);
    // Reflect와 trap은 별개다
    // target (member)의 "userId"를 getLogin 메소드에서
    // members (DB) "user"와 비교하고 같으면 true, 다르면 false
    let boolProxy = getLogin(target) !== [] ? true : false;
    console.log(">>" + target);
    console.log(getLogin(target));
    // console.log("prop: " + prop + " target: " + JSON.stringify(target));
    return getLogin(target);
    // return boolProxy;
    // return result;
    // return getLogin(prop) ? true : false;
    // 프로퍼티 이름이 객체에 없을 때, 기본값을 false로 리턴
    // return prop in target ? target[prop] : false;
  }
});
console.log(proxy);
// console.log("proxy.userId: " + JSON.stringify(proxy.userId));
// console.log("proxy.password: " + JSON.stringify(proxy.password));

// TODO: member => proxy => state value static => call calc control
