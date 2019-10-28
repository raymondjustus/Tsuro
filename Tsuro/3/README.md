# Phase 3: Testing Task

## Assumptions

1. This test is used only for testing placements, _not_ order.

   Threfore, placements can be either initial or intermediate, passed in any order.

   Therefore, we cannot pass initial placements into the `Board`'s constructor. Instead, we must use the `placeAvatar` and `placeTile` methods instead.

2. Only the testing suite needs to know the `tile-index` or `rotation` for a tile at a given `x` and `y`.

   Therefore, a separate `jsonBoard` object is used for keeping track of the `tile-index` and `rotation` values for tiles.

   This is not used to inform any code functionality more than providing the desired responses as outlined in the task.

3. Responses are to be given for every color, in the order in which they are listed in the task description. This is: `"white"`, `"black"`, `"red"`, `"green"`, and `"blue"`.
