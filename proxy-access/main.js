var Main = {
  init: () => {
    console.log('main init');
  },
  setInputValue: e => {
    // console.log(e.target.value);
    // innerHTML, innerText
    // span태그를 조작할 때 index를 반드시 사용
    document.getElementsByClassName('input-highlight')[0].innerHTML =
      e.target.value;
  }
};
