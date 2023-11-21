"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function endsWith(str, search) {
  return str.indexOf(search, str.length - search.length) !== -1;
}

function _default(_ref) {
  var t = _ref.types;
  return {
    visitor: {
      ExportDeclaration: {
        exit: function exit(path, state) {
          var node = path.node;
          var source = node.source && node.source.value ? node.source.value.split('?')[0] : null

          if (node.source && endsWith(source, '.liquid')) {
            var dir = _path["default"].dirname(_path["default"].resolve(state.file.opts.filename));

            var absolutePath = _path["default"].resolve(dir, source);

            var liquid = _fs["default"].readFileSync(absolutePath, "utf8");

            path.replaceWithMultiple([t.variableDeclaration("const", [t.variableDeclarator(t.identifier(node.specifiers[0].exported.name), t.stringLiteral(liquid))]), t.exportNamedDeclaration(null, [t.exportSpecifier(t.identifier(node.specifiers[0].exported.name), t.identifier(node.specifiers[0].exported.name))])]);
          }
        }
      },
      ImportDeclaration: {
        exit: function exit(path, state) {
          var node = path.node;
          var source = node.source && node.source.value ? node.source.value.split('?')[0] : null

          if (endsWith(source, '.liquid')) {
            var dir = _path["default"].dirname(_path["default"].resolve(state.file.opts.filename));

            var absolutePath = _path["default"].resolve(dir, source);

            var liquid = _fs["default"].readFileSync(absolutePath, "utf8");

            path.replaceWith(t.variableDeclaration("const", [t.variableDeclarator(t.identifier(node.specifiers[0].local.name), t.stringLiteral(liquid))]));
          }
        }
      }
    }
  };
}
