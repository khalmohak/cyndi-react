"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _core = require("@material-ui/core");

var _shadows = _interopRequireDefault(require("./shadows"));

var _typography = _interopRequireDefault(require("./typography"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var theme = (0, _core.createMuiTheme)({
  palette: {
    background: {
      dark: '#F4F6F8',
      "default": _core.colors.common.white,
      paper: _core.colors.common.white
    },
    primary: {
      // main: colors.indigo[500]
      main: '#025fa1' //4768b1

    },
    secondary: {
      main: '#025fa1'
    },
    text: {
      primary: _core.colors.blueGrey[900],
      secondary: _core.colors.blueGrey[600]
    }
  },
  shadows: _shadows["default"],
  typography: _typography["default"]
});
var _default = theme;
exports["default"] = _default;