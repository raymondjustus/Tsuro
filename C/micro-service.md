| Server                                                     |     | Client                                                         |     | User                        |
| ---------------------------------------------------------- | --- | -------------------------------------------------------------- | --- | --------------------------- |
|                                                            |     |                                                                | <-  | Starts the client           |
|                                                            | <-  | Connect to server                                              |     |                             |
| Connection Successful                                      | ->  |                                                                |     |                             |
|                                                            |     | Show Message                                                   | ->  |                             |
|                                                            |     |                                                                | <-  | Req. new Labyrinth          |
|                                                            | <-  | newLabyrinth()                                                 |     |                             |
| only return if error                                       | ->  |                                                                |     |                             |
|                                                            |     | show if error                                                  | ->  |                             |
| ---------------------------------                          | --  | --                                                             | --  | --                          |
|                                                            |     |                                                                | <-  | Req. adding a new node      |
|                                                            | <-  | addNode(id: string)                                            |     |                             |
| only returns on error if                                   | ->  |                                                                |     |                             |
|                                                            |     | Show if error                                                  | ->  |                             |
| ---------------------------------                          | --  | --                                                             | --  | --                          |
|                                                            |     |                                                                | <-  | Req. adding a new edge      |
|                                                            | <-  | addEdge(id1: string, id2: string)                              |     |                             |
| only returns on error                                      | ->  |                                                                |     |                             |
|                                                            |     | Show if error                                                  | ->  |                             |
| ---------------------------------                          | --  | --                                                             | --  | --                          |
|                                                            |     |                                                                | <-  | Req. adding a new taken     |
|                                                            | <-  | addToken(color:string, id: string)                             |     |                             |
| only returns on error                                      | ->  |                                                                |     |                             |
|                                                            |     | Show if error                                                  | ->  |                             |
| ---------------------------------                          | --  | --                                                             | --  | --                          |
|                                                            |     |                                                                | <-  | Req. removing a node        |
|                                                            | <-  | removeNode(id: string)                                         |     |                             |
| only returns on error                                      | ->  |                                                                |     |                             |
|                                                            |     | Show if error                                                  | ->  |                             |
| ---------------------------------                          | --  | --                                                             | --  | --                          |
|                                                            |     |                                                                | <-  | Req. removing an edge       |
|                                                            | <-  | removeEdge(id1: string, id2: string)                           |     |                             |
| only returns on error                                      | ->  |                                                                |     |                             |
|                                                            |     | Show if error                                                  | ->  |                             |
| ---------------------------------                          | --  | --                                                             | --  | --                          |
|                                                            |     |                                                                | <-  | Req. removing a token       |
|                                                            | <-  | removeToken(tokenColor: string)                                |     |                             |
| only returns on error                                      | ->  |                                                                |     |                             |
|                                                            |     | Show if error                                                  | ->  |                             |
| ---------------------------------                          | --  | --                                                             | --  | --                          |
|                                                            |     |                                                                | <-  | Req. get a Node             |
|                                                            | <-  | getNode(id: string)                                            |     |                             |
| return copy of Node or error                               | ->  |                                                                |     |                             |
|                                                            |     | Show Node or error                                             | ->  |                             |
| ---------------------------------                          | --  | --                                                             | --  | --                          |
|                                                            |     |                                                                | <-  | Req. get an Edge            |
|                                                            | <-  | getEdge(id1: string, id2: string)                              |     |                             |
| return copy of Edge or error                               | ->  |                                                                |     |                             |
|                                                            |     | Show Edge or error                                             | ->  |                             |
| ---------------------------------                          | --  | --                                                             | --  | --                          |
|                                                            |     |                                                                | <-  | Req. get a token            |
|                                                            | <-  | getToken(color: string)                                        |     |                             |
| return copy of Token or error                              | ->  |                                                                |     |                             |
|                                                            |     | Show Token or error                                            | ->  |                             |
| ---------------------------------                          | --  | --                                                             | --  | --                          |
|                                                            |     |                                                                | <-  | Req. get the Labyrinth      |
|                                                            | <-  | getLabyrinth()                                                 |     |                             |
| return copy of the Labyrinth or error                      | ->  |                                                                |     |                             |
|                                                            |     | Show Labrynth or error                                         | ->  |                             |
| ---------------------------------                          | --  | --                                                             | --  | --                          |
|                                                            |     |                                                                | <-  | Req. check if a path exists |
|                                                            | <-  | isTherePathFromTokenToNode(tokenColor: string, nodeId: string) |     |                             |
| return Boolean or error                                    | ->  |                                                                |     |                             |
|                                                            |     | Show Boolean or error                                          | ->  |                             |
| ---------------------------------                          | --  | --                                                             | --  | --                          |
| --                                                         | --  | --                                                             | <-  | Closing the connection      |
|                                                            | <-  | Sending connection termination to server                       |     |                             |
| Server terminating, sending final labyrinth as goodbye msg | ->  |                                                                |     |                             |
|                                                            |     | Showing final labyrinth                                        | ->  |                             |
|                                                            |     | Showing connection terminated                                  | ->  |                             |
