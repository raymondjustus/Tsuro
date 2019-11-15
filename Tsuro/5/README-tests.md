## xobs

The `xobs` executable will generate an SVG for a given game state.

Examples for these game states can be found at:

- `obs-tests/1-in.json` (produces `obs-tests/1-out.svg`)

- `obs-tests/2-in.json` (produces `obs-tests/2-out.svg`)

The `xobs` file can be run as follows:

```sh
./xobs <output path>
# output path is where the svg should be
# example:
#   ./xobs ./obs-tests/1-out.svg < ./obs-tests/1-in.json
```
