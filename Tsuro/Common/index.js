require('./utils/polyfills');
const { InitialAction, IntermediateAction } = require('./action');

exports.Avatar = require('./avatar');
exports.Tile = require('./tiles');
exports.BoardState = require('./boardState');
exports.Board = require('./board');
exports.Coords = require('./coords');
exports.InitialAction = InitialAction;
exports.IntermediateAction = IntermediateAction;
exports.Path = require('./path');
exports.Position = require('./position');
exports.RenderUtils = require('./renderUtils');
exports.RuleChecker = require('./rules');
