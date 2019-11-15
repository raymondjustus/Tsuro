const fs = require('fs');
const D3Node = require('d3-node');
const { BoardState } = require('../Common');
const { RENDER_STYLES } = require('../Common/utils/constants');

const MARGIN = 20;
const MARGIN_INNER = MARGIN / 2;
const TILE_PREVIEW_SIZE = 45;
const WIDTH = 800;
const HEIGHT = WIDTH + TILE_PREVIEW_SIZE + MARGIN;

class Observer {
  constructor() {
    this.d3Node = new D3Node({ styles: RENDER_STYLES });
    this.d3 = this.d3Node.d3;

    this._boardState = new BoardState();

    this._currentHand = [];
    this._lastHand = this._currentHand;

    this._currentPlayerId = null;
    this._lastPlayerId = this._currentPlayerId;

    this._currentTurn = 0;
    this._lastAction = null;
    this._playerColors = {};
    this._deadPlayers = new Set();
  }

  setPlayerColors(playerColors) {
    this._playerColors = playerColors;
  }

  updateBoardState(boardState) {
    this._boardState = boardState;
  }

  updateCurrentPlayerId(currentPlayerId) {
    this._currentPlayerId = currentPlayerId;
  }

  updateCurrentTurn(currentTurn) {
    this._currentTurn = currentTurn;
  }

  updateCurrentHand(currentHand) {
    this._currentHand = currentHand;
  }

  updateLastAction(lastAction) {
    this._lastAction = lastAction;
    this._lastHand = this._currentHand;
    this._lastPlayerId = this._currentPlayerId;
  }

  removePlayer(id) {
    this._deadPlayers.add(id);
  }

  _renderAvatar(selection, x, className = 'avatar') {
    return selection
      .append('circle')
      .attr('class', className)
      .attr('cx', x)
      .attr('cy', 2.25 * MARGIN + MARGIN_INNER)
      .attr('r', MARGIN_INNER);
  }

  _renderAvatars(selection) {
    const avatarGroup = selection.append('g');
    const radius = MARGIN_INNER;

    let avatarX = MARGIN + radius;
    Object.keys(this._playerColors).forEach(id => {
      const avatar = avatarGroup
        .append('g')
        .attr('id', id)
        .classed('dead', this._deadPlayers.has(id));

      if (this._currentPlayerId === id) {
        this._renderAvatar(avatar, avatarX, 'avatar__highlight');
      }
      this._renderAvatar(avatar, avatarX).attr('fill', this._playerColors[id]);
      avatarX += radius * 3;
    });
  }

  _renderLastAction(selection, width) {
    if (this._lastAction) {
      let tileX = width - MARGIN;

      this._lastHand.forEach(tile => {
        tileX -= TILE_PREVIEW_SIZE;

        const tileGroup = selection.append('g');
        tileGroup.classed('dead', !tile.isEqualToRotated(this._lastAction.tile));
        tile.render(tileGroup, tileX, MARGIN, TILE_PREVIEW_SIZE);

        tileX -= MARGIN_INNER;
      });

      selection
        .append('text')
        .attr('dx', tileX)
        .attr('dy', MARGIN)
        .attr('text-anchor', 'end')
        .append('tspan')
        .text('Last move');

      this._renderAvatar(selection, tileX - MARGIN_INNER).attr(
        'fill',
        this._playerColors[this._lastPlayerId]
      );
    }
  }

  _renderMeta(selection, width) {
    selection
      .append('text')
      .attr('dx', MARGIN)
      .attr('dy', MARGIN)
      .text(this._currentTurn)
      .append('tspan')
      .text('Turn ')
      .lower();

    this._renderAvatars(selection);
    this._renderLastAction(selection, width);
  }

  render(selection, x, y, width, height) {
    selection
      .append('g')
      .append('rect')
      .attr('class', 'background')
      .attr('x', x)
      .attr('y', y)
      .attr('width', width)
      .attr('height', height);

    this._renderMeta(selection, width);

    const boardSize = width - 2 * MARGIN;
    this._boardState.render(selection, x + MARGIN, height - boardSize - MARGIN, boardSize);
  }

  /**
   *
   * @param {string} path
   */
  renderToFile(path) {
    const svg = this.d3Node.createSVG(WIDTH, HEIGHT);

    this.render(svg, 0, 0, WIDTH, HEIGHT);

    const svgFile = fs.createWriteStream(path);
    svgFile.write(this.d3Node.svgString());
    svgFile.end();
  }
}

module.exports = Observer;
