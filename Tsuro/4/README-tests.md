# Phase 4: Testing Task

## Assumptions

1. This test uses the testing harness from phase 3 to construct the game board. All assumptions given in 3 also apply to 4.

2. Since there is no referee to ask whether the player has those specific tiles in hard, a temporary player object is created for testing purposes that assumes the player is being truthful. In this case the check is on whether the played tile is in the given hand. When this referee check can be made, the functionality will be changed.

## Test Descriptions

1. This tests whether given a board state, the green player can play a tile they have in the wrong positon. Should return "illegal".

2. This test tests whether given a board state, the green player can play a tile they have in the correct position. Should return "legal".

3. This tests whether given a board state, the green player can play a tile they do not have in their hand. Should return "illegal".

4. This tests whether given a board state, the green player can play a tile diagonal to their location. Should return "illegal".

5. This tests whether givena board state, the green player can play a tile that would kill them given all tiles in their hand would kill them. Should return "legal".

## Directions

To run this, run xrules either with command line arguments as laid out in the assingment or by passing in a json file.
