# Design Task

The following definitions outline the basic structure of the Tsuro game.

## Types

```ts
type Id = Number;
```

## Enumerations

```ts
enum Direction {
  North,
  East,
  South,
  West,
}

enum Port {
  0,
  1,
}
```

## Interfaces

```ts
// Represents a position on a single tile
interface Position {
  readonly direction: Direction;
  readonly port: Port;

  constructor(direction: Direction, port: Port): Position;
}

// Represents a path on a tile
interface Path {
  start: Position;
  end: Position;

  constructor(start: Position, end: Position): Path;
}

// Represents a tile
interface Tile {
  paths: Path[];

  constructor(paths: Path[]): Tile;

  // Rotates tile 90 degrees per rotation, clockwise
  rotate(rotations: Number): void;

  // Gets the destination for a given position on a path
  getDestinationPosition(position: Position): Position;
}

// Used for placing tiles or avatars on board
interface Coords {
  readonly x: Number;
  readonly y: Number;

  constructor(x: Number, y: Number): Coords;
}

// Represents a player action
interface Action {
  readonly tile: Tile;
  readonly coords: Coords;
  readonly rotations?: Number;

  constructor(tile: Tile, coords: Coords, rotations?: Number): Action;
}

// Represents a player (client)
interface Player {
  readonly id: Id;
  readonly name: String;
  readonly board: Board; // Copy of board, not actual board
  hand: Tile[];

  constructor(id: Id, name: String, board: Board): Player;

  // Adds tile to hand from Referee
  draw(tile: Tile): void;

  // Discards all Tiles from hand
  emptyHand(): void;

  // Sends a given action from the Player to the Referee
  sendAction(action: Action): void;
}

// The board's representation of a player
interface Avatar {
  readonly id: Id; // shares same ID as player
  readonly color: Color;
  coords: Coords;
  position: Position;

  constructor(id: Id, color: Color, coords: Coords, position: Position): Avatar;

  // Updates position
  move(coords: Coords, position: Position): void;
}

// Houses all tiles and avatars for game
interface Board {
  tiles: Tile[][];
  avatars: Avatar[];

  constructor(avatars: Avatar[]): Board;

  // Moves an avatar with given ID to a given position
  moveAvatar(avatarId: Number, position: Position): void;

  // Places given tile at given coords on board
  placeTile(tile: Tile, coords: Coords): void;
}

// Controls game flow
interface Referee {
  board: Board;
  players: Player[];
  currentPlayerId: Number;

  constructor(players: Player[]): Referee;

  // Deals one tile to Player with given ID
  dealTile(playerId: Number): void;

  // Moves a player avatar with given ID to a given position
  movePlayer(playerId: Number, coords: Coords, position: Position): void;

  // Places given tile at given coords on board
  placeTile(tile: Tile, coords: Coords): void;
}
```
