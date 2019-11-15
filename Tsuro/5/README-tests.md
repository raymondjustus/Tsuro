## xobs

The `xobs` executable will generate an SVG or a PNG for a given game state.

Examples for these game states can be found at:

- `obs-tests/1-in.json` (produces `obs-tests/1-out.png`)

- `obs-tests/2-in.json` (produces `obs-tests/2-out.png`)

The `xobs` file can be run as follows:

```sh
./xobs <output path>
# output path is where the svg or png should be
# the extension used in the output path will determine which file type to use
# example:
#   ./xobs ./obs-tests/1-out.svg < ./obs-tests/1-in.json
```
