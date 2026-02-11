

require("./module")


Node()
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