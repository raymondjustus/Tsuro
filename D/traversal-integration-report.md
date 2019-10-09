# Task 2

1. The other team followed our specification to the letter. They used our instructions as the comment headers on each function, wrote signatures matching exactly what we asked for, and overall gave us exactly what we requested. There was no attempt to deviate from our design. Because our design seems to work fine, this is a good thing.

   The only notable marks against them are a handful of missteps in the implementation. Several times they removed the wrong index of an object from an array. In the following, they get the index of the object (edge, token) and name it `index`, then when splicing the individual nodes from the edge, or the token from the node, they use `index` again instead of the variables they created that hold the correct indecies (`indexNode`)

   ```js
   removeToken(tokenColor) {
       const token = this.getToken(tokenColor);

       const index = this.tokens.indexOf(token);
       this.tokens.splice(index, 1);

       const indexNode = token.node.tokens.indexOf(token);
       token.node.tokens.splice(index, 1);
   }
   ```

   Also, for the return methods, they returned the actual object and not a copy as we specified.

   ```js
   getNode(id) {
       const node = this.nodes.find(node => node.id === id);
       if (node === undefined) {
       throw 'Node with the given id does not exist';
       } else {
       return node;
       }
   }
   ```

   While they are not huge errors that would require a complete overhaul of the program, the basic structure of some of the functions would need to be fundamentally changed.

2. Because of how closely the other group followed our specification, it should be trivially easy to connect the client from Task 3 to this server. Having not actually done it, we do not know the 'actual' time it would take, but an estimate allowing for bugs to crop up would likely be less than an hour or two.

3. The specification we provided seems to outline the correct information exactly given that they did everything we asked and implemented it just as we would have if we had been coding it ourselves (the only differences being the minor bugs, which we imagine were just a minor mistake). Thusly, the specification seemed to be explicit enough to get what we needed.
