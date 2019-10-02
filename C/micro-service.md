```
Server              Client            User
  |                          +<------------------------------------------------|Start the client
  |  Connect to socket       |                                                 |
  |<-------------------------|                                                 |
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
  |         addNode(from)    |                                                 |
  |         addNode(to)      |                                                 |
  |       addEdge(from, to)  |                                                 |
  |------------------------> |                                                 |
  | Error on failure of Edge |                                                 |
  |                          | --------------------------------------------->  |
  |                          |                    Print  success or Error      |
                           . . .
  |                          |<------------------------------------------------|
  |                          |  Send ["add" , token:color-string, name:string] |
  |<-------------------------|                                                 |
  |    addToken(color, name) |                                                 |
  |------------------------> |                                                 |
  | Error if:                |                                                 |
  |    - token Exists        |                                                 |
  |    - invalid Color       |                                                 |
  |    - Node doesn't exist  |                                                 |
  |                          | --------------------------------------------->  |
  |                          |                    Print  success or Error      |
                           . . .
  |                          |<------------------------------------------------|
  |                          | Send  ["move", token:color-string, name:string] |
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
  |                          |               Send end of connection to Server  |
  |<-------------------------|                                                 |
  |      Terminate Connection|                                                 |
  |            X             |                                                 |
  |                          |-----------------------------------------------> |
  |                          | Print 'connection terminated'                   |
```
