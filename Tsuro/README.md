# Tsuro, _by `sudo-wudo`_

> The directory for `sudo-wudo`'s Tsuro game

This directory contains all code for `sudo-wudo`'s Tsuro game for CS 4500 Software Development, Section 3.

## Table of Contents

- [About the Project](#about-the-project)
- [Commit History](#commit-history)
- [Project Structure](#project-structure)

## About the Project

Tsuro is a strategy board game where players compete to be the last one left on the board. At the beginning of the game, players place their pieces along the edge of the board. Every round, players can place a tile on the board or rotate an existing tile in order to advance their tile. However, if their tile leads their piece back to the edge or into another player's piece, they are eliminated from play. The last player who remains on the board is declared the winner.

This project is to be completed by the `sudo-wudo` team, whose members include Josh Pensky, Ray Namar, Andrew Alcala, and Will Epstein. The project is part of the CS 4500 Software Development course.

## Commit History

- [Phase 1](https://github.ccs.neu.edu/cs4500-fall2019-neu/sudo-wudo/tree/6754cafd79ffd212ba9916750476cc6a186ff200)

- [Phase 2](https://github.ccs.neu.edu/cs4500-fall2019-neu/sudo-wudo/tree/5e758a03675f0a48a884e7fd115949f35e4435e2)

- [Phase 3](https://github.ccs.neu.edu/cs4500-fall2019-neu/sudo-wudo/tree/38efeea5e9cfdb0353778dd7b43dd67f9900081e)

- [Phase 4](https://github.ccs.neu.edu/cs4500-fall2019-neu/sudo-wudo/tree/2576c7ddcc11aa1ce002e7cf89a11b7cc6bddec8)

- [Phase 5 (1 late day)](https://github.ccs.neu.edu/cs4500-fall2019-neu/sudo-wudo/tree/575ea67723a96eabdae9626269210debff80ddaf)

## Project Structure

```
Tsuro
|== 1
|== 2
|== 3
|== 4
|== 5
|== Admin
|  |-- index.js
|  |-- Observer.js
|  |-- Referee.js
|
|== Common
|  |== __tests__
|  |== utils
|  |-- action.js
|  |-- avatar.js
|  |-- board.js
|  |-- boardState.js
|  |-- coords.js
|  |-- index.js
|  |-- path.js
|  |-- position.js
|  |-- renderUtils.js
|  |-- rules.js
|  |-- tiles.js
|
|== Planning
|  |-- board.md
|  |-- observer.md
|  |-- player.md
|  |-- referee.md
|  |-- rules.md
|
|== Player
|  |== Strategy
|  |  |-- Strategy.js
|  |  |-- DumbStrategy.js
|  |
|  |-- Player.js
|
|-- .babelrc
|-- package-lock.json
|-- package.json
|-- plan.md
|-- README.md
|-- webpack.config.js
```
