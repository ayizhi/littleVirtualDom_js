// module.exports = diff;
// var _ = require('./util')
// var patch = require('./patch')
// var listDiff = require('./list_diff')


function diff(oldTree,newTree){
    var index = 0;
    var patches = {};
    dfsWalk(oldTree,newTree,index,patches);
    return patches
}

function dfsWalk(oldNode,newNode,index,patches) {
    var currentPatch = [];

    if(newNode === null){    //被删除
        //当reorder的时候就会被抹去,所以不用做任何事情
    }else if(_.isString(oldNode) && _.isString(newNode)){//处理文本节点
        if(newNode !== oldNode){
            currentPatch.push({ype: patch.TEXT})
        }
    }
}