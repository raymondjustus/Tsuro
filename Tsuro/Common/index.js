require('./utils/polyfills');
const { InitialAction, IntermediateAction } = require('./action');
const { InitialPlacement, TilePlacement } = require('./placement');

exports.Avatar = require('./avatar');
exports.BoardState = require('./boardState');
exports.Board = require('./board');
exports.Coords = require('./coords');
exports.InitialAction = InitialAction;
exports.InitialPlacement = InitialPlacement;
exports.IntermediateAction = IntermediateAction;
exports.Path = require('./path');
exports.Position = require('./position');
exports.RuleChecker = require('./rules');
exports.Tile = require('./tiles');
exports.TilePlacement = TilePlacement;
