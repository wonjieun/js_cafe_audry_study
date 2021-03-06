let names = [];

let sort = "ascend";

let stackPeak = localStorage.length;

let Index = {
  init: () => {
    console.log("Index start");
    console.log("init localStorage: " + JSON.stringify(localStorage));
    Index.draw();
  },
  getElement: id => {
    return document.getElementById(id);
  },
  getElementValue: id => {
    return document.getElementById(id).value;
  },
  setElementValue: (id, text) => {
    document.getElementById(id).value = text;
  },
  btnCreate: e => {
    e.preventDefault();
    if (Index.validation()) {
      Index.models.name = Index.getElementValue("viewName");
      Index.models.id = Index.uuid();
      // let filterNames = names.filter(i => {
      //     let model = Index.setJsonDataToString(i);
      //     return model.name != Index.models.name;
      // });
      names.push(Index.setJsonDataToString(Index.models));
      console.log(
        "JSON Data To String: " + Index.setJsonDataToString(Index.models)
      );
      // key 값에 '숫자'를 입력하면 원하는 값이 나오지 않음. (예. 0: "0")
      // myStorage.setItem(Index.models.id, Index.models.name);
      localStorage.setItem(
        `index${stackPeak}`,
        Index.setJsonDataToString(Index.models)
      );
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
      Index.setElementValue("viewName", "");
      // document.getElementById("viewName").value = "";
      Index.draw();
    }
  },
  validation: () => {
    let inputName = Index.getElementValue("viewName");
    let patt1 = /[0-9]/;
    if (inputName === "") {
      alert("이름을 입력해주세요");
      return false;
    } else if (inputName.match(patt1) !== null) {
      alert("숫자를 입력하지 마세요");
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
      if (model.name === inputName) {
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
    // names = [];
    localStorage.clear();
    Index.draw();
  },
  btnStart: e => {
    e.preventDefault();
    let tbodyHtml = "";
    // let newNames = Index.shuffle(names);

    // 전역으로 접근 X 데드락 걸림 -> common.js 로 빼도록
    // 리팩토링 필요 디자인 패턴을 알게됨
    // 하나의 함수에 하나의 기능 필요
    // 하나의 함수에서 다른 함수를 호출 하는 것이 순수함수는 아니다
    let localNewNames = Index.shuffle(localStorage);
    console.log("shuffle >>> " + localNewNames);
    // console.log("shuffle >>> " + typeof localNewNames);
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
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
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
    let viewName = Index.getElement("viewName");
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
      let viewName = Index.getElement("viewName");
      names.map((name, i) => {
        let model = Index.setStringToJsonData(name);
        console.log(model);
        if (model.name === modelName) {
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
    Index.setElementValue("viewName", "");
    // document.getElementById("viewName").value = "";
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
    for (let i = 0; i < localStorage.length; i++) {
      console.log("localStorage: " + localStorage.getItem(`index${i}`));
      let data = Index.setStringToJsonData(localStorage.getItem(`index${i}`));
      sortNames.push(data);
    }
    if (sort === "ascend") {
      console.log("sort ascending");
      sortNames.sort(function(a, b) {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      });
      sortNames.map((name, i) => {
        localStorage.setItem(`index${i}`, Index.setJsonDataToString(name));
      });
      Index.draw();
      sort = "descend";
    } else {
      console.log("sort descending");
      sortNames.sort(function(a, b) {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
      });
      sortNames.map((name, i) => {
        localStorage.setItem(`index${i}`, Index.setJsonDataToString(name));
      });
      Index.draw();
      sort = "ascend";
    }
  },
  draw: () => {
    let tbodyHtml = "";
    for (let i = 0; i < localStorage.length; i++) {
      let data = Index.setStringToJsonData(localStorage.getItem(`index${i}`));
      console.log("localStorage: " + localStorage.getItem(`index${i}`));
      console.log("data >>> " + JSON.stringify(data.id));
      tbodyHtml += `
                <tr>
                    <td></td>
                    <td>${data.id}</td>
                    <td>${data.name}</td>
                    <td>
                        <button onclick="Index.btnRowRemove('${
                          data.id
                        }',event);">삭제</button>
                        <button onclick="Index.btnRowEdit('${
                          data.name
                        }',event);">수정</button>
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
