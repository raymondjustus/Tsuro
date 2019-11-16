# Phase 5: Testing Task

## Part 1: `xref`

### Assumptions

If the test harness is given more than 5 players, there will be an error noted but the game will continue with the first 5 players.

### Test Descriptions

1. This tests the referee's game running abilities using the minimum number of players (eg. 3). It should show Johnny as the winner and Freddy and Thomas as the losers.

2. This tests the referee's game running abilities using the minimum number of players (eg. 5). It should show Samantha as the winner and Alberta, Maria, Jen, and Laura as the losers.

### Directions

To run this, run `xrules` either with command line arguments as laid out in the assignment or by passing in a JSON file.

## Part 2: `xobs`

### Assumptions

The `xobs` executable will generate an SVG or a PNG for a given game state.

Examples for these game states can be found at:

- `obs-tests/1-in.json` (produces `obs-tests/1-out.png`)

- `obs-tests/2-in.json` (produces `obs-tests/2-out.png`)

### Directions

The `xobs` file can be run as follows:

```sh
./xobs <output path>
# output path is where the svg or png should be
# the extension used in the output path will determine which file type to use
# example:
#   ./xobs ./obs-tests/1-out.svg < ./obs-tests/1-in.json
```
