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

The `canTakeAction` funciton takes a gameboard from the referee or player, and uses its knowledge of the gameboard to infer if the given action is valid. If being called by a player, the player will just substitute their playerId for both `turnID` and `actorID`. This means that if a player would like to plan ahead before it is their turn they can, and on their turn they will be able to check their move legality as well. This does not allow for players to move on someone else's turn, as the referee knows whose turn it is and will call the function with the ID of the expected player as well as the move they were given. Should a player try to move, this will ensure that the move is rejected. This function returns a `Boolean`, `true` if the move is valid for the given state, and `false` if the move is invalid for the given state. NOTE: if a player sends an out of date board, this function may return true when the move is actually false given perfect knowledge.

The `canDraw` function is given a `playerID`, checks with the server to see if they are allowed to draw at this time. Returns a `Boolean`, `true` if they can and `false` if they are not allowed to.

the `canPlaceToken` function is given a `playerID`, the function asks the server if that player is allowed to place their avatar at the given `tile` and `position` on that tile. This returns a `Boolean`, `true` if the given tile and position is a valid start place for that player, and `false` otherwise.
