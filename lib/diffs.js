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
            currentPatch.push({type: patch.TEXT,content:newNode})
        }
    }else if(oldNode.tagName === newNode.tagName && newNode.key === oldNode.key){//当新老node相同,比较其子集
        var propsPatches = diffProps(oldNode,newNode);
        //对props
        if(propsPatches){
            currentPatch.push({type:patch.PROPS,props:propsPatches})
        }
        //对不同的子元素
        if(!isIgnoreChildren(newNode)){
            diffChildren(
                oldNode.children,
                newNode.children,
                index,
                patches,
                currentPatch
            )
        }
    }else{ //如果node不一样,用新的代替旧的
        currentPatch.push({type:patch.REPLACE,node:newNOde})
    }

    if(currentPatch.length){
        patches['index'] = currentPatch
    }
}

function diffChildren(oldChildren,newChildren,index,patches,currentPatch){
    var diffs = listDiff(oldChildren,newChildren,'key')
    newChildren = diffs.children;
    if(diffs.moves.length){


        
    }
}