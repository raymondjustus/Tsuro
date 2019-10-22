### Tsuro Rules Checker Interface (Design Task)

```ts
/**
* Interface that checks the rules for the Tsuro game. Can be called by a player, will ALWAYS be called by the referee
* to check the validity of a given action by a player.
*/
interface ruleChecker {
    /**
    * Takes in the board state (boardState), the player who is sending the action (actorID), and the action itself (action)
    */
    canTakeAction(BoardState: boardState, string: actorId, Action: action): boolean;
    
    /**
    * Checks in with the server to see if the player can draw cards.
    */
    canDraw(string: playerID): boolean;

    /**
    * Checks whether the given player (playerID) can place their avatar in the given position (position) at the tile (tile) 
    * located at the given Coord (coord) at the start of the game.
    */
    canPlaceAvatar(string: playerId, Coords: coords, Tile: tile, Position: position): boolean;
}
```
### canTakeAction
The `canTakeAction` method uses a given board state to infer if the given action is valid. This means that a player can check their move legality during their turn, or plan ahead. This does not allow for players to move on someone else's turn, and will return that the move is invalid. This function returns a `boolean`: `true` if the move is valid for the given state, and `false` if the move is invalid for the given state.

_**NOTE:** If a player sends an out-of-date board state, this function may return true when the move is actually false given perfect knowledge._

### canDraw
The `canDraw` method is given a `playerId` and checks with the server to see if that player is allowed to draw at this time. Returns a `boolean`: `true` if they can and `false` if they are not allowed to.

### canPlaceAvatar
The `canPlaceAvatar` method is given a `tile` and `coords`, and asks the server if that player is allowed to place their avatar at the `position` on that tile. This returns a `boolean`: `true` if the given tile and position is a valid start place for that player, and `false` otherwise.
