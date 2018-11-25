let names = [];

let sort = "ascend";

// let myStorage = localStorage;

let stackPeak = 0;

let Index = {
    init: () => {
        console.log("Index start");
        Index.draw();
    },
    btnCreate: e => {
        e.preventDefault();
        if (Index.validation()) {
            Index.models.name = document.getElementById("viewName").value;
            Index.models.id = Index.uuid();
            // let filterNames = names.filter(i => {
            //     let model = Index.setJsonDataToString(i);
            //     return model.name != Index.models.name;
            // });
            names.push(Index.setJsonDataToString(Index.models));
            console.log("JSON Data To String: "+Index.setJsonDataToString(Index.models));
            console.log(localStorage.index0);
            console.log(typeof localStorage.index1);
            console.log(typeof localStorage);
            // key 값에 '숫자'를 입력하면 원하는 값이 나오지 않음. (예. 0: "0")
            // myStorage.setItem(Index.models.id, Index.models.name);
            localStorage.setItem(`index${stackPeak}`, Index.setJsonDataToString(Index.models));
            stackPeak++;
            console.log(localStorage);

            // 숙제: Set처리하는 방법 알아보기
            // let setNames = new Set(names);
            // names = Array.from(setNames);
            // console.log(">>>>>" + Index.filterNames(names, Index.models.name));
            // names = [];
            let newNames = Index.filterNames(names, Index.models.name);
            delete names; // 배열 내용 삭제
            names = newNames;
            // 숙제: 아래와 같이 구현 할수 있도록 연구해보기
            // let names2 = name.distinct.list();
            document.getElementById("viewName").value = "";
            Index.draw();
        }
    },
    validation: () => {
        let inputName = document.getElementById("viewName").value;
        let patt1 = /[0-9]/;
        if (inputName === '') {
            alert("이름을 입력해주세요");
            return false;
        } else if (inputName.match(patt1) !== null) {
            alert("숫자를 입력하지마세요");
            return false;
        }
        return true;
    },
    filterNames: (names, inputName) => {
        // 숙제: filter, map으로 처리하는 방법 알아보기
        // let resultFilterNames = names.map(i => {
        //     let model = Index.setJsonDataToString(i);
        //     if (model.name == inputName) {
        //         continue;
        //     }
        // })
        let resultFilterNames = [];
        let doubleCount = 0;
        for (let name of names) {
            let model = Index.setStringToJsonData(name);
            if (model.name == inputName) {
                doubleCount++;
            }
            if (doubleCount > 1) {
                continue;
            }
            let newModel = {
                id: model.id,
                name: model.name
            };
            resultFilterNames.push(Index.setJsonDataToString(newModel));
        }
        return resultFilterNames;
    },
    btnTotalClear: e => {
        e.preventDefault();
        names = [];
        localStorage.clear();
        Index.draw();
    },
    btnStart: e => {
        e.preventDefault();
        let tbodyHtml = "";
        let newNames = Index.shuffle(names);
        names = newNames;
        names.map((name, i) => {
            let model = Index.setStringToJsonData(name);
            tbodyHtml += `
            <tr>
                <td>${i + 1}</td>
                <td>${model.id}</td>
                <td>${model.name}</td>
                <td>
                    <button onclick="Index.btnRowRemove('${
                model.id
                }',event);">삭제</button>
                    <button onclick="Index.btnRowEdit('${
                model.name
                }',event);">수정</button>
                </td>
            </tr>
        `;
        });
        document.querySelector("#historyList > tbody").innerHTML = tbodyHtml;
    },
    shuffle: array => {
        var currentIndex = array.length,
            temporaryValue,
            randomIndex; // ...?

        // While there remain elements to shuffle...
        // shuffle할 elements가 남아있는 동안
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            // 현재 element와 바꾸기
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    },
    setJsonDataToString: data => JSON.stringify(data),
    setStringToJsonData: data => JSON.parse(data),
    uuid: () => {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
    btnRowRemove: (modelId, e) => {
        e.preventDefault();
        names.map((name, i) => {
            let model = Index.setStringToJsonData(name);
            if (model.id == modelId) {
                names.splice(i, 1);
            }
        });
        Index.draw();
    },
    btnRowEdit: (modelName, e) => {
        e.preventDefault();
        let viewName = document.getElementById("viewName");
        viewName.value = modelName;
        viewName.focus();
        let buttonHtml = `
            <button onclick="Index.btnRowEditComplete('${modelName}',event)">완료</button>
            <button onclick="Index.drawResetButton()">취소</button>
        `;
        document.querySelector("form > div").innerHTML = buttonHtml;
    },
    btnRowEditComplete: (modelName, e) => {
        e.preventDefault();
        if (Index.validation()) {
            let viewName = document.getElementById("viewName");
            names.map((name, i) => {
                let model = Index.setStringToJsonData(name);
                console.log(model);
                if (model.name == modelName) {
                    model.name = viewName.value;
                    name = Index.setJsonDataToString(model);
                    names.splice(i, 1, name);
                }
            });
            viewName.value = "";
            Index.draw();
            Index.drawResetButton();
        }
    },
    /**
     * TODO:
     *  생성, 전체삭제, 복불복 toggle 처리
     * */
    drawResetButton: () => {
        let buttonHtml = `
            <button onclick="Index.btnCreate(event);">생성</button>
            <button onclick="Index.btnTotalClear(event);">전체삭제</button>
            <button onclick="Index.btnStart(event);">복불복</button>
        `;
        document.querySelector("form > div").innerHTML = buttonHtml;
        document.getElementById("viewName").value = "";
        Index.draw();
    },
    /*---------------------------------------------------
    Array.prototype.sort()
    : 배열의 요소를 정렬하여 그 배열을 반환
    기본 정렬 순서는 문자열의 유니코드 코드 포인트를 따름.
    
    arr.sort([compareFunction])
    compareFunction(a, b) < 0 (return val = -1)
        - 정렬순서: a b
    compareFunction(a, b) = 0
        - 정렬순서: 변경 X
    compareFunction(a, b) > 0 (return val = 1)
        - 정렬순서: b a
    -----------------------------------------------------*/
    sortingName: () => {
        let sortNames = [];
        names.map((name) => {
            let model = Index.setStringToJsonData(name);
            sortNames.push(model);
        });
        // console.log(sortNames);
        // console.log(typeof sortNames);      Object
        // console.log(typeof sortNames.name); string
        if(sort === "ascend") {
            console.log("sort ascending");
            // delete names; -> 안됌? 왜
            names = [];
            sortNames.sort(function(a, b) {
                console.log(typeof a.name);
                let nameA = a.name.toUpperCase();
                let nameB = b.name.toUpperCase();
                return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
            });
            sortNames.map((name, i) => {
                names.push(Index.setJsonDataToString(name));
            });
            Index.draw();
            sort = "descend";
        } else {
            console.log("sort descending");
            names = [];
            sortNames.sort(function(a, b) {
                console.log(typeof a.name);
                let nameA = a.name.toUpperCase();
                let nameB = b.name.toUpperCase();
                return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
            });
            sortNames.map((name, i) => {
                names.push(Index.setJsonDataToString(name));
            });
            Index.draw();
            sort = "ascend";
        }
    },
    draw: () => {
        let tbodyHtml = "";
        for (let i=0; i<localStorage.length; i++) {
            console.log("localStorage: " + localStorage.getItem(`index${i}`));
            let data = Index.setStringToJsonData(localStorage.getItem(`index${i}`));
            tbodyHtml += `
                <tr>
                    <td></td>
                    <td>${data.id}</td>
                    <td>${data.name}</td>
                    <td>
                        <button onclick="Index.btnRowRemove('${data.id}',event);">삭제</button>
                        <button onclick="Index.btnRowEdit('${data.name}',event);">수정</button>
                    </td>
                </tr>
            `;
        }
        document.querySelector("#historyList > tbody").innerHTML = tbodyHtml;
    },
    event: () => {
        console.log("draw");
    },
    models: {
        id: "",
        name: ""
    }
};