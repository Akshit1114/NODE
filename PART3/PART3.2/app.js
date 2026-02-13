
require("./module")

/*

require("./module") = IIFE or = 
(function () {
    module code
}) ()
or 
(function (module, require) {                 // here ----- IIFE has two Parameter as module and require which we use (more Parameter are there which we will see) 
    parameters : 
        // console.log(exports)
        // console.log(require)
        // console.log(module)
        // console.log(__filename)
        // console.log(__dirname)
    ------------
    function  Node() {
    console.log("Node js")
    }
    console.log("Hello")

    module.exports = Node;
    -----------
   
}) ()


*/
/*
module.exports = fn
vs
exports = fn

Node wraps your file like this:
(function (exports, require, module, __filename, __dirname) {
   // your code
});

And inside that wrapper:
exports = module.exports;

So at the beginning:
Memory:
   { }   <-- Object

exports  ---------┐
                  ├──> same object
module.exports ---┘

Both point to the SAME object.

When you do:
exports = fn;

You are NOT modifying the object.

You are just changing where exports points.

Now memory looks like:
exports  ---> fn
module.exports ---> { }

This modifies the object (works):
exports.name = "Akshit";
Because you're modifying the SAME object.

❌ This changes reference (breaks):
exports = { name: "Akshit" };
Now exports points somewhere new.
module.exports still points to old object.


*/