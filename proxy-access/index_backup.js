import { Member } from './member';
import { Event } from './event';
// import, export는 babel이 있어야 함
// default를 쓰지 않으면 { Member }로 써주어야 함
// const { Member } = require('./member');

let Index = {
  init: () => {
    console.log('main init');
    Index.draw();
  },

  setInputValue: e => {
    document.getElementsByClassName('input-highlight')[0].innerHTML =
      e.target.value;
  },
  draw: () => {
    let tbodyHtml = '';
    Member.map(member => {
      console.log(member);
      tbodyHtml += `
                  <tr>
                      <td>${member.userId}</td>
                      <td>${member.password}</td>
                  </tr>
              `;
    });
    document.querySelector('tbody').innerHTML = tbodyHtml;
  }
};

window.Index = Index;
