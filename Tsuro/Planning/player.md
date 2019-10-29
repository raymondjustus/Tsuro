# Player

```ts
type Id = string;

interface Player {
  id: Id;
  name: string;
  hand: Tile[];

  /**
   * Adds the given tile to the player's hand.
   */
  draw(tile: Tile): void;
}
```
