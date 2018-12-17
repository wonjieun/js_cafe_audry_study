// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"member.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Member = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Member = function Member(userId, password) {
  _classCallCheck(this, Member);

  this.userId = userId;
  this.password = password;
};

exports.Member = Member;
},{}],"membersDB.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.membersDB = void 0;
var membersDB = [{
  userId: 'admin',
  password: '1234'
}, {
  userId: 'guest',
  password: '0000'
}];
exports.membersDB = membersDB;
},{}],"memberService.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemberService = void 0;

var _member = require("./member");

var _membersDB = require("./membersDB");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MemberService =
/*#__PURE__*/
function () {
  function MemberService(member) {
    _classCallCheck(this, MemberService);

    this.userId = member.userId;
    this.password = member.password;
  }

  _createClass(MemberService, [{
    key: "checkLogin",
    value: function checkLogin(member) {
      var filterMember = _membersDB.membersDB.filter(function (m) {
        return m.userId == member.userId && m.password == member.password;
      });

      if (filterMember.length !== 0) {
        return filterMember[0].userId === 'admin' ? 'admin' : 'guest';
      } else return false;
    }
  }, {
    key: "checkID",
    value: function checkID(memberId) {
      console.log('----- 아이디 체크 -----');
      console.log('입력한 ID > ' + memberId);

      var filterMember = _membersDB.membersDB.filter(function (m) {
        return m.userId == memberId;
      });

      if (filterMember[0] === undefined) {
        console.log('아이디가 존재하지 않습니다.');
      } else {
        console.log('아이디가 존재합니다.');
        return filterMember[0].userId;
      }
    }
  }, {
    key: "checkPassword",
    value: function checkPassword(memberId) {
      console.log('----- 비밀번호 체크 -----');
      console.log('입력한 ID > ' + memberId);
      console.log('비밀번호는 아래와 같습니다.');

      var filterMember = _membersDB.membersDB.filter(function (m) {
        return m.userId == memberId;
      });

      return filterMember[0].password;
    }
  }, {
    key: "addMember",
    value: function addMember(memberId) {
      _membersDB.membersDB.push({
        userId: memberId,
        password: '0000'
      });
    }
  }, {
    key: "delMember",
    value: function delMember(member) {
      console.log('delMember');

      if (member.password === undefined) {
        _membersDB.membersDB.map(function (val, index) {
          if (val.userId === member.userId) {
            console.log(index);

            _membersDB.membersDB.splice(index, 1);
          }
        });
      }
    }
  }, {
    key: "editMember",
    value: function editMember(member) {
      console.log('edit');
    }
  }]);

  return MemberService;
}();

exports.MemberService = MemberService;
},{"./member":"member.js","./membersDB":"membersDB.js"}],"proxy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = void 0;
var authFlag = '';
var handler = {
  get: function get(target, propKey, receiver) {
    var targetValue = Reflect.get(target, propKey, receiver);
    authFlag = target.checkLogin(target);

    if (typeof targetValue === 'function') {
      if (!authFlag || authFlag === 'guest' && (propKey === 'addMember' || propKey === 'delMember')) {
        return function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          console.log('CALL', propKey, args);
          console.log('※ 접근할 수 있는 권한이 없습니다.');
        };
      } else {
        return function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          console.log('CALL', propKey, args);
          return targetValue.apply(this, args);
        };
      }
    } else {
      authFlag = target.checkLogin(target);
      if (authFlag) console.log('----- 로그인 성공 -----');else console.log('----- 로그인 실패-----');
      return authFlag;
    }
  }
};
exports.handler = handler;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _memberService = require("./memberService");

var _membersDB = require("./membersDB");

var _proxy = require("./proxy");

var admin = new _memberService.MemberService({
  userId: 'admin',
  password: '1234'
});
var guest = new _memberService.MemberService({
  userId: 'guest',
  password: '0000'
});
var another = new _memberService.MemberService({
  userId: 'someone',
  password: '9999'
});
var adminUser = new Proxy(admin, _proxy.handler);
var guestUser = new Proxy(guest, _proxy.handler);
var anotherUser = new Proxy(another, _proxy.handler); // adminUser .연산자를 사용할 때만 'get' trap call...

adminUser.isLogin;
adminUser.checkID('admin');
console.log('> ' + adminUser.checkPassword('admin'));
console.log('----- 멤버 추가 -----');
adminUser.addMember('jieun');

_membersDB.membersDB.map(function (val) {
  console.log(val);
});
},{"./memberService":"memberService.js","./membersDB":"membersDB.js","./proxy":"proxy.js"}],"C:/Users/jieun/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62786" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["C:/Users/jieun/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/proxy-access.e31bb0bc.map