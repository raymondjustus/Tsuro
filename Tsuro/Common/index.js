const { InitialPlacement, TilePlacement } = require('./placement');
require('./utils/polyfills');

exports.Avatar = require('./avatar');
exports.BoardState = require('./boardState');
exports.Board = require('./board');
exports.Coords = require('./coords');
exports.InitialPlacement = InitialPlacement;
exports.Path = require('./path');
exports.Position = require('./position');
exports.RuleChecker = require('./rules');
exports.Tile = require('./tiles');
exports.TilePlacement = TilePlacement;
