"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Controller = /*#__PURE__*/function () {
  function Controller(model, view) {
    _classCallCheck(this, Controller);

    this._model = model;
    this._view = view;
  }

  _createClass(Controller, [{
    key: "model",
    set: function set(model) {
      this._model = model;
    },
    get: function get() {
      return this._model;
    }
  }, {
    key: "view",
    set: function set(view) {
      this._view = view;
    },
    get: function get() {
      return this._view;
    }
  }]);

  return Controller;
}();
"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _position = _interopRequireDefault(require("./position.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Box = /*#__PURE__*/function () {
  function Box(id, status, position) {
    _classCallCheck(this, Box);

    this._id = id;
    this._status = status;
    this._position = position;
  }

  _createClass(Box, [{
    key: "id",
    set: function set(id) {
      this._id = id;
    },
    get: function get() {
      return this._id;
    }
  }, {
    key: "status",
    set: function set(status) {
      this._status = status;
    },
    get: function get() {
      return this._status;
    }
  }, {
    key: "position",
    set: function set(position) {
      this._position = position;
    },
    get: function get() {
      return this._position;
    }
  }]);

  return Box;
}();

exports["default"] = Box;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Model = /*#__PURE__*/function () {
  function Model() {
    _classCallCheck(this, Model);

    this._state = {};
  }

  _createClass(Model, [{
    key: "players",
    set: function set(players) {
      this._state.players = players.slice() || [];
    },
    get: function get() {
      return this._state.players;
    }
  }, {
    key: "currentPlayer",
    set: function set(player) {
      this._state.currentPlayer = player;
    },
    get: function get() {
      return this._state.currentPlayer;
    }
  }, {
    key: "currentBox",
    set: function set(box) {
      this._state.currentBox = box;
    },
    get: function get() {
      return this._state.currentBox;
    }
  }, {
    key: "currentWeapon",
    set: function set(weapon) {
      this._state.currentWeapon = weapon;
    },
    get: function get() {
      return this._state.currentWeapon;
    }
  }, {
    key: "weapons",
    set: function set(weapons) {
      this._state.weapons = weapons.slice() || [];
    },
    get: function get() {
      return this._state.weapons;
    }
  }, {
    key: "propableNextMoves",
    set: function set(slots) {
      this._state.slots = slots.slice() || [];
    },
    get: function get() {
      return this._state.slots;
    }
  }, {
    key: "state",
    set: function set(state) {
      this._state = state;
    },
    get: function get() {
      return this._state;
    }
  }]);

  return Model;
}();

exports["default"] = Model;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _position = _interopRequireDefault(require("./position.js"));

var _weapon = _interopRequireDefault(require("./weapon.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Player = /*#__PURE__*/function () {
  function Player(id, position, points, weapon) {
    _classCallCheck(this, Player);

    this._id = id;
    this._position = position;
    this._points = points;
    this._weapon = weapon;
  }

  _createClass(Player, [{
    key: "id",
    set: function set(id) {
      this._id = id;
    },
    get: function get() {
      return this._id;
    }
  }, {
    key: "position",
    set: function set(position) {
      this._position = position;
    },
    get: function get() {
      return this._position;
    }
  }, {
    key: "points",
    set: function set(points) {
      this._points = points;
    }
  }, {
    key: "weapon",
    get: function get() {
      return this._weapon;
    },
    set: function set(weapon) {
      this._weapon = weapon;
    }
  }]);

  return Player;
}();

exports["default"] = Player;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Position = /*#__PURE__*/function () {
  function Position(x, y) {
    _classCallCheck(this, Position);

    this._x = x;
    this._y = y;
  }

  _createClass(Position, [{
    key: "x",
    set: function set(x) {
      this._x = x;
    },
    get: function get() {
      return this._x;
    }
  }, {
    key: "y",
    set: function set(y) {
      this._y = y;
    },
    get: function get() {
      return this._y;
    }
  }]);

  return Position;
}();

exports["default"] = Position;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Position = _interopRequireDefault(require("./Position.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Weapon = /*#__PURE__*/function () {
  function Weapon(id, name, position, damage) {
    _classCallCheck(this, Weapon);

    this._id = id;
    this._position = position;
    this._damage = damage;
  }

  _createClass(Weapon, [{
    key: "id",
    set: function set(id) {
      this._id = id;
    },
    get: function get() {
      return this._id;
    }
  }, {
    key: "name",
    set: function set(name) {
      this._name = name;
    },
    get: function get() {
      return this._name;
    }
  }, {
    key: "position",
    set: function set(position) {
      this._position = position;
    },
    get: function get() {
      return this._position;
    }
  }, {
    key: "damage",
    set: function set(damage) {
      this._damage = damage;
    },
    get: function get() {
      return this._damage;
    }
  }]);

  return Weapon;
}();

exports["default"] = Weapon;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Position = _interopRequireDefault(require("./model/Position.js"));

var _Box = _interopRequireDefault(require("./model/Box.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var View = /*#__PURE__*/function () {
  function View() {
    _classCallCheck(this, View);

    this._board = this.createBoard().slice() || [];
    this._weapons = [];
    this._players = [];
  }

  _createClass(View, [{
    key: "createBoard",
    value: function createBoard() {
      var board = [];

      for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
          var _id = " " + i + j;

          board.push(new _Box["default"](_id, 1, new _Position["default"](i, j)));
        }
      }

      this.placeObstacles();
      return board;
    }
  }, {
    key: "getRandomInt",
    value: function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
    }
  }, {
    key: "placeObstacles",
    value: function placeObstacles() {
      var i = 1;
      var ids = [];

      while (i <= 12) {
        var x = getRandomInt(0, 99);

        var _id2 = x < 10 ? '0' + x : "" + x;

        ids.push(_id2);
        i++;
      }

      for (var _i = 0, _ids = ids; _i < _ids.length; _i++) {
        id = _ids[_i];

        for (var _i2 = 0; _i2 < 100; _i2++) {
          if (this.board[_i2].id == id.trim()) {
            this.board[_i2].status = 0;
          }
        }
      }
    }
  }, {
    key: "placeWeapons",
    value: function placeWeapons() {}
  }, {
    key: "placePlayers",
    value: function placePlayers() {}
  }]);

  return View;
}();

exports["default"] = View;