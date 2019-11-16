const fs = require('fs');
const btoa = require('btoa');
const Canvas = require('canvas');
const D3Node = require('d3-node');
const { BoardState } = require('../Common');
const { styles } = require('../Common/utils');

const MARGIN = 25;
const MARGIN_INNER = MARGIN / 2;
const TILE_PREVIEW_SIZE = 55;
const LINE_HEIGHT = 15;
const WIDTH = 1000;
const HEIGHT = WIDTH + TILE_PREVIEW_SIZE + MARGIN;

class Observer {
  /**
   * @constructor
   * Creates a new Observer with an empty board state.
   */
  constructor(id) {
    this.id = id;

    this._boardState = new BoardState();
    this._playerColors = {};
    this._deadPlayers = new Set();

    this._currentTurn = 0;
    this._currentPlayerId = null;
    this._lastPlayerId = this._currentPlayerId;

    this._currentHand = [];
    this._lastHand = this._currentHand;
    this._lastAction = null;

    // RENDER VARIABLES
    this.d3Node = new D3Node({ canvasModule: Canvas, styles });
    this.d3 = this.d3Node.d3;
  }

  /**
   * Sets the player ID-to-colors map as given by the referee.
   *
   * @param {object} playerColors a map from player ID to
   * corresponding player color
   */
  setPlayerColors(playerColors) {
    this._playerColors = playerColors;
  }

  /**
   * Updates the currently stored board state with the latest one
   * from the referee.
   *
   * @param {BoardState} boardState the current board state
   */
  updateState(boardState) {
    this._boardState = boardState;
  }

  /**
   * Updates the player ID to that of the player whose turn it
   * currently is, as told by the referee.
   *
   * @param {string} currentPlayerId the current player's ID
   */
  updateCurrentPlayerId(currentPlayerId) {
    this._currentPlayerId = currentPlayerId;
  }

  /**
   * Updates the turn number, as told by the referee.
   *
   * @param {number} currentTurn the current turn number
   */
  updateCurrentTurn(currentTurn) {
    this._currentTurn = currentTurn;
  }

  /**
   * Updates the observer's view of the current player's hand, as
   * told by the referee.
   *
   * @param {Tile[]} currentHand the current player's hand.
   */
  updateCurrentHand(currentHand) {
    this._currentHand = currentHand;
  }

  /**
   * Updates the last action used by a player, as told by the referee.
   * This also updates the last hand and player ID to use the currently
   * set ones (in anticipation of the next turn).
   *
   * @param {Action} lastAction the last action used
   */
  updateLastAction(lastAction) {
    this._lastAction = lastAction;
    this._lastHand = this._currentHand;
    this._lastPlayerId = this._currentPlayerId;
  }

  /**
   * Removes a player from play, as decided by the referee.
   *
   * @param {string} id the ID of the player to be removed
   */
  removePlayer(id) {
    this._deadPlayers.add(id);
  }

  /**
   * @private
   * Renders an avatar icon at the given x-position.
   *
   * @param {d3.Selection} selection the selection to render the avatar to
   * @param {number} x the x-position to center the avatar
   * @param {string} [className="avatar"] the class name to give the avatar
   * @returns {d3.Selection} the avatar selection
   */
  _renderAvatar(selection, x, className = 'avatar') {
    return selection
      .append('circle')
      .attr('class', className)
      .attr('cx', x)
      .attr('cy', 2.25 * MARGIN + MARGIN_INNER)
      .attr('r', MARGIN_INNER);
  }

  /**
   * @private
   * Renders all avatars to a new group within the given selection. This will
   * fade out any currently dead or removed players, and highlight the player
   * whose turn it currently is.
   *
   * @param {d3.Selection} selection the selection to render the avatars to
   */
  _renderAvatars(selection) {
    const avatarGroup = selection.append('g');
    const radius = MARGIN_INNER;

    let avatarX = MARGIN + radius;
    Object.keys(this._playerColors).forEach(id => {
      const avatar = avatarGroup
        .append('g')
        .attr('id', id)
        .classed('dead', this._deadPlayers.has(id) || this._boardState.getAvatar(id).hasLost());

      if (this._currentPlayerId === id) {
        this._renderAvatar(avatar, avatarX, 'avatar__highlight');
      }
      this._renderAvatar(avatar, avatarX).attr('fill', this._playerColors[id]);
      avatarX += radius * 3;
    });
  }

  /**
   * @private
   * Renders the last action to the given selection. This includes the player
   * to make the last action, the cards in the player's hand, and highlighting
   * the tile that was chosen from the hand.
   *
   * @param {d3.Selection} selection the selection to render the action to
   * @param {boolean} renderAsSvg whether this should render for SVG file
   * formats
   */
  _renderLastAction(selection, renderAsSvg) {
    if (this._lastAction) {
      let tileX = WIDTH - MARGIN;

      this._lastHand.forEach(tile => {
        tileX -= TILE_PREVIEW_SIZE;

        const tileGroup = selection.append('g');
        tileGroup.classed('dead', !tile.isEqualToRotated(this._lastAction.tile));
        tile.render(tileGroup, tileX, MARGIN, TILE_PREVIEW_SIZE);

        tileX -= MARGIN_INNER;
      });

      const text = selection
        .append('text')
        .attr('class', 'text bold')
        .attr('dx', tileX - (renderAsSvg ? 0 : 100))
        .attr('dy', MARGIN + LINE_HEIGHT)
        .text('Last move');

      if (renderAsSvg) {
        text.attr('text-anchor', 'end');
      }

      this._renderAvatar(selection, tileX - MARGIN_INNER).attr(
        'fill',
        this._playerColors[this._lastPlayerId]
      );
    }
  }

  /**
   * @private
   * Renders the meta data to the game, including turn number, avatar and turn
   * order, and the last action made.
   *
   * @param {d3.Selection} selection the selection to render the action to
   * @param {boolean} renderAsSvg whether this should render for SVG file
   * formats
   */
  _renderMeta(selection, renderAsSvg) {
    selection
      .append('text')
      .attr('class', 'text')
      .attr('dx', MARGIN)
      .attr('dy', MARGIN + LINE_HEIGHT)
      .text(` ${this._currentTurn}`)
      .append('tspan')
      .attr('class', 'bold')
      .text('Turn')
      .lower();

    this._renderAvatars(selection);
    this._renderLastAction(selection, renderAsSvg);
  }

  /**
   * Renders the entire screen to the given selection, including
   * the meta info and current board state.
   *
   * @param {d3.Selection} selection the current D3 selection
   * @param {boolean} [renderAsSvg=true] whether this should render for
   * SVG file formats
   */
  render(selection, renderAsSvg = true) {
    selection
      .append('g')
      .append('rect')
      .attr('class', 'background')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', WIDTH)
      .attr('height', HEIGHT);

    this._renderMeta(selection, renderAsSvg);

    const boardSize = WIDTH - 2 * MARGIN;
    this._boardState.render(
      selection,
      MARGIN,
      HEIGHT - boardSize - MARGIN,
      boardSize,
      this._lastAction ? this._lastAction.coords : null
    );
  }

  /**
   * @private
   * Renders the given SVG string to an SVG at the given path.
   *
   * @param {string} path the path to output the file
   * @param {string} svgString the SVG string as generated by D#
   */
  _renderToSvg(path, svgString) {
    const svgFile = fs.createWriteStream(path);
    svgFile.write(svgString);
    svgFile.end();
  }

  /**
   * @private
   * Renders the given SVG string to a PNG at the given path.
   *
   * @param {string} path the path to output the file
   * @param {string} svgString the SVG string as generated by D#
   */
  _renderToPng(path, svgString) {
    const canvas = this.d3Node.createCanvas(WIDTH, HEIGHT);
    const context = canvas.getContext('2d');

    const image = new Canvas.Image();
    image.onload = function() {
      context.drawImage(image, 0, 0, WIDTH, HEIGHT);
    };
    image.src = `data:image/svg+xml;base64,${btoa(svgString)}`;

    canvas.pngStream().pipe(fs.createWriteStream(path));
  }

  /**
   * Renders the current game state screen to a file at the
   * given path.
   *
   * @param {string} path the path to render the state to
   */
  renderToFile(path) {
    const shouldCreateSvg = path.endsWith('svg');
    const shouldCreatePng = path.endsWith('png');
    if (!shouldCreateSvg && !shouldCreatePng) {
      throw 'Cannot convert to given file type.';
    }

    const svg = this.d3Node.createSVG(WIDTH, HEIGHT);
    this.render(svg, shouldCreateSvg);
    const svgString = this.d3Node.svgString();

    if (shouldCreateSvg) {
      this._renderToSvg(path, svgString);
    } else if (shouldCreatePng) {
      this._renderToPng(path, svgString);
    }
  }
}

module.exports = Observer;
