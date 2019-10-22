```ts
//Interface that checks the rules for the Tsuro game. Can be called by a player, will ALWAYS be called by the referee
//     to check the validity of a given action by a player
interface ruleChecker {
    // Takes in the game state (gameBoard), which player is expected to be
    //      sending an action (turnID), the player who is intending an action (actorID),
    //       and the action intended (action)
    canTakeAction(Board gameBoard, String: turnID, String actorID, Action action): Boolean;

    //Checks in with the server to see if the player can draw cards
    canDraw(String playerID): Boolean;

    //at the begining of the game, checks whether the given player (playerID) can place their avatar
    //   at the tile (tile) on the given position (position)
    canPlaceToken(String playerID, TIle tile, position position): Boolean;
}
```

The `canTakeAction` method uses a given board state to infer if the given action is valid. This means that a player can check their move legality during their turn, or plan ahead. This does not allow for players to move on someone else's turn, and will return that the move is invalid. This function returns a `Boolean`: `true` if the move is valid for the given state, and `false` if the move is invalid for the given state.

_**NOTE:** If a player sends an out-of-date board state, this function may return true when the move is actually false given perfect knowledge._

The `canDraw` method is given a `playerId` and checks with the server to see if that player is allowed to draw at this time. Returns a `Boolean`: `true` if they can and `false` if they are not allowed to.

The `canPlaceAvatar` method is given a `tile` and `coords`, and asks the server if that player is allowed to place their avatar at the `position` on that tile. This returns a `Boolean`: `true` if the given tile and position is a valid start place for that player, and `false` otherwise.
