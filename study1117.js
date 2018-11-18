for(let i=0; i<10; i++) {
    setTimeout(function() {
        // console.log(i);
    }, 100);
}

let str = "Hello study !!!";
for (let value of str) {
    console.log(value);
}

let arrays = ["1", "2", "3"];
for(let value of arrays) {
    console.log(value);
}

let map = new Map();
map.set("1", "computer");
map.set("2", "mouse");
map.set("3", "keyboard");

for(let value of map) {
    console.log(value);
}

function tagged(str, a, b) {
    let bigger;
    (a > b) ? bigger = 'A' : bigger = 'B';

    return str[0] + bigger + '가 더 큽니다.';
}

let a = 100;
let b = 200;

let str2 = tagged`A와 B 둘 중 ${a}, ${b}`;
console.log(str2);


console.log("=========================================");

function* gen() {
    for (let i=0; i<3; i++) {
        yield i;
    }
}

let generator = gen();
for (let value of generator) {
    console.log(value);
}

class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

let list = Array(
    new Product(1, "computer", "10.0"),
    new Product(2, "apple watch", "110.0"),
    new Product(3, "apple pencil", "120.0"),
    new Product(4, "apple iPad", "130.0")
)

console.log(list);

function* getProduct() {
    for (let product of list) {
        yield product;
    }
}
let myProduct = getProduct();
myProduct.next();

list.push(new Product(5, "computer", "20.0"));

function* getProductFilterName(name, vip) {
    list.sort(function(a, b) {
        return b.id - a.id;
    })
    for (let product of list) {
        if (product.name === name) {
            yield product;
        } else {
            if (product.name.includes(name)) {
                if (vip) { product.price *= 0.98; }
                yield product;
            }
        }
    }
}
let computerProduct = getProductFilterName("computer");
console.log(computerProduct.next());
console.log(computerProduct.next());
console.log(computerProduct.next());

let appleProduct = getProductFilterName("apple");
console.log(appleProduct.next());
console.log(appleProduct.next());
console.log(appleProduct.next());

let appleProductVIP = getProductFilterName("apple", true);
console.log(appleProductVIP.next());
console.log(appleProductVIP.next());
console.log(appleProductVIP.next());

console.log("=========================================");

function* gen1(n) {
    yield n + 1;
    yield* gen2(n);
    yield n + 2;
}

function* gen2(n) {
    yield n + 100;
    yield n + 200;
}

let generator2 = gen1(100);
for(let value of generator2) {
    console.log(value);
}

console.log("=========================================");

// 1. 컴퓨터만 찾기
function* getProductComputer(name) {
    for (let product of list) {
        if (product.name === name) {
            console.log(">>>>" + JSON.stringify(product));
            yield product;
        }
    }
}

// 2. 애플만 찾기
function* getProductApple(name) {
    for (let product of list) {
        if (product.name.includes(name)) {
            yield product;
        }
    }
}

// 3. 내림차순으로 정렬
function* nameSorting() {
    list.sort(function(a, b) {
        return b.id - a.id;
    })
    for (let product of list) {
        yield product;
    }
}

// 4. VIP 회원에게 할인가 적용하여 2% 할인
function* vipDiscountSale(name, vip) {
    for (let product of list) {
        if (vip) { product.price *= 0.98; }
        yield product;
    }
}

function* allFunc(name, vip) {
    if(name === "computer") {
        yield* getProductComputer(name);
    } else {
        yield* getProductApple(name);
    }
    // yield* nameSorting();
    // yield* vipDiscountSale(name, vip);
}

let doubleGen = allFunc("computer", true);
for(let value of doubleGen) {
    console.log(value);
}

console.log("==========================================================================");
console.log("\t\t\t\t로또");
console.log("==========================================================================");

let uncheckedAllTurns = [];
//let tempTurns = [];
let turns = [];

function setNumRandom() {
    let lottoNum = [];
    for(let i=0; i<7; i++) {
        lottoNum[i] = Math.floor(Math.random()*38+1);
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

function checkTurns(allTurns) {
    let lottoTurnCheck = new Set(allTurns);
    lottoTurnCheck.forEach(function(value, key) {
        turns.push(value);
    });
}

function setTurn(checkedNum) {
    checkedNum.sort(function(a, b) {
        return a-b;
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
    for (let i=0; i<9; i++) {
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
    console.log(turns);
    //FIXME: turns가 9개로 채워질 때 까지 check해서 넣기

    //TODO: 재귀함수 응용하면 Set 중복체크 관련 처리 가능
}
lottoFactory();

// 결과 yield
let lotto = lottoGen(turns);
console.log(lotto.next());
console.log(lotto.next());
console.log(lotto.next());
console.log(lotto.next());
console.log(lotto.next());
console.log(lotto.next());
console.log(lotto.next());
console.log(lotto.next());
console.log(lotto.next());
console.log(lotto.next());
// lotto.next();
// lotto.next();
// lotto.next();
// lotto.next();
