```
Server              Client            User
  |                          +<------------------------------------------------|Start the client
  |  Connect to socket       |                                                 |
  |<=========================|                                                 |
  |                          |                                                 |
  |------------------------> |                                                 |
  |     Send Conn Success    |-----------------------------------------------> |
  |                          | Show response                                   |
  |                          |                                                 |
  |                          |<------------------------------------------------|
  |                          |  Send ["lab", {from: str, to: str}...]          |
  |<-------------------------|                                                 |
  |           getLabyrinth() |                                                 |
  |------------------------> |                                                 |
  | Labyrinth or Error       |                                                 |
  |<-------------------------|                                                 |
  |    for all {from, to}    |                                                 |
  |         getNode(from)    |                                                 |
  |         getNode(to)      |                                                 |
  |------------------------> |                                                 |
  | Nodes or Error           |                                                 |
  |<-------------------------|                                                 |
  |     for all {from, to}   |                                                 |
  |       getEdge(from, to)  |                                                 |
  |       getEdge(to, from)  |                                                 |
  |------------------------->|                                                 |
  | Edges or Error           |                                                 |
  |<-------------------------|                                                 |
  |        addEdge(str, str) |                                                 |
  |                          | --------------------------------------------->  |
  |                          |                    Print  success or Error      |
                           . . .
  |                          |<------------------------------------------------|
  |                          |  Send ["add" , token:color-string, name:string] |
  |<-------------------------|                                                 |
  |          getLabyrinth()  |                                                 |
  |------------------------> |                                                 |
  | Labyrinth or Error       |                                                 |
  |<-------------------------|                                                 |
  |           getToken(str)  |                                                 |
  |------------------------> |                                                 |
  | Token or Error           |                                                 |
  |<-------------------------|                                                 |
  |           getNode(str))  |                                                 |
  |------------------------> |                                                 |
  | Node or Error            |                                                 |
  |<-------------------------|                                                 |
  |     addToken(token, name)|                                                 |
  |------------------------> |                                                 |
  | Error on failure         |                                                 |
  |                          | --------------------------------------------->  |
  |                          |                    Print  success or Error      |
                           . . .
  |                          |<------------------------------------------------|
  |                          | Send  ["move", token:color-string, name:string] |
  |<-------------------------|                                                 |
  |          getLabyrinth()  |                                                 |
  |------------------------> |                                                 |
  | Labyrinth or Error       |                                                 |
  |<-------------------------|                                                 |
  |           getToken(str)  |                                                 |
  |------------------------> |                                                 |
  | Token or Error           |                                                 |
  |<-------------------------|                                                 |
  |           getNode(str))  |                                                 |
  |------------------------> |                                                 |
  | Node or Error            |                                                 |
  |<-------------------------|                                                 |
  |     removeToken(token)   |                                                 |
  |------------------------> |                                                 |
  | Error on failure         |                                                 |
  |<-------------------------|                                                 |
  |     addToken(token, name)|                                                 |
  |------------------------> |                                                 |
  | Error on failure         |                                                 |
  |                          | --------------------------------------------->  |
  |                          |                    Print  success or error      |
  |                          |                                                 |
                           . . .
  |                          |               Send eof/end connection via STDIN |
  |<------------------------ |                                                 |
  |           getLabyrinth() |                                                 |
  |------------------------> |                                                 |
  | Labyrinth or error       |                                                 |
  |                          |-----------------------------------------------> |
  |                          | Print Labyrinth or error                        |
  |<-------------------------|                                                 |
  |      Terminate Connection|                                                 |
  |            X             |                                                 |
  |                          |-----------------------------------------------> |
  |                          | Print 'connection terminated'                   |
```
