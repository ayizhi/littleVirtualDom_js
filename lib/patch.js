var _ = require('util');


var REPLACE = 0;
var REORDER = 1;
var PROPS = 2;
var TEXT = 3;

function patch(node,patches){
    var walker = {index:0};
    dfsWalk(node,walker,patches);
}

function dfsWalk(node,walker,patches){
    
}


