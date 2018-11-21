let names = [];
let myStorage = localStorage;
let stackPeak = 0;

let Index = {
    init: () => {
        // myStorage.setItem('mydog', 'iseul');
        // myStorage.setItem('mycat', 'iseul');
        // myStorage.setItem('mybird', 'iseul');
        console.log(typeof myStorage);
        console.log("Index start");
    },
    btnCreate: (e) => {
        e.preventDefault();
        console.log("btn start called");
        Index.models.name = document.getElementById("viewName").value;
        Index.models.id = Index.uuid();
        // let filterNames = names.filter(i => {
        //     let model = Index.setJsonDataToString(i);
        //     return model.name != Index.models.name;
        // });
        names.push(Index.setJsonDataToString(Index.models));
        console.log("JSON Data To String: "+Index.setJsonDataToString(Index.models));

        // key 값에 '숫자'를 입력하면 원하는 값이 나오지 않음. (예. 0: "0")
        // myStorage.setItem(Index.models.id, Index.models.name);
        myStorage.setItem(`index${stackPeak}`, Index.setJsonDataToString(Index.models));
        stackPeak++;
        console.log(myStorage);

        console.log(myStorage.index1);
        // 숙제: Set처리하는 방법 알아보기
        // let setNames = new Set(names);
        // names = Array.from(setNames);
        // console.log(">>>>>" + Index.filterNames(names, Index.models.name));
        // names = [];
        let newNames = Index.filterNames(names, Index.models.name);
        delete names;   // 배열 내용 삭제
        names = newNames;
        // 숙제: 아래와 같이 구현 할수 있도록 연구해보기
        // let names2 = name.distinct.list();
        document.getElementById('viewName').value = "";
        Index.draw();
    },
    filterNamesStorage: () => {

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
        for (name of names) {
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
    btnTotalClear: (e) => {
        e.preventDefault();
        names = [];
        localStorage.clear();
        stackPeak = 0;
        Index.draw();
    },
    btnStart: (e) => {
        e.preventDefault();
        console.log("복불복 시작");
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
        let viewName = document.getElementById('viewName');
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
        let viewName = document.getElementById('viewName');
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
        document.getElementById('viewName').value = "";
        Index.draw();
    },
    draw: () => {
        let tbodyHtml = "";
        names.map(i => {
            let model = Index.setStringToJsonData(i);
            tbodyHtml += `
            <tr>
                <td></td>
                <td>${model.id}</td>
                <td>${model.name}</td>
                <td>
                    <button onclick="Index.btnRowRemove('${model.id}',event);">삭제</button>
                    <button onclick="Index.btnRowEdit('${model.name}',event);">수정</button>
                </td>
            </tr>
        `;
        });
        // let tbodyHtml = `
        //     <tr>
        //         <td>${Index.models.id}</td>
        //         <td>${Index.models.name}</td>
        //     </tr>
        // `;
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