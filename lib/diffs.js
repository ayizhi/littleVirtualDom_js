var _ = require('./util');
var patch = require('./patch');
var listDiff = require('./list_diff');

function diff(oldTree,newTree){
    var index = 0;
    var patches = {};
    dfsWalk(oldTree,newTree,index,patches);
    return patches;
}

function dfsWalk(oldNode,newNode,index,patches){
    var currentPatch = [];

    //node被移除的情况
    if(newNode == null){
        //实际的dom会被移除,所以没必要做任何事
    }
    //textnode 替换的情况
    else if(_.isString(oldNode) && _.isString(newNode)){
        if(newNode !== oldNode){
            currentPatch.push({type: patch.TEXT,content: newNode});
        }
    }
    //node一样,比较属性与子元素
    else if(oldNode.tagName === newNode.tagName && oldNode.key === newNode.key){
        //比较属性
        var propsPatches = diffProps(oldNode,newNode);
        if(propsPatches){
            currentPatch.push({type: patch.PROPS,props:propsPatches})
        }
        //比较自节点(如果newNode有"ignore"属性,则不比较子节点);
        if(!isIgnoreChildren(newNode)){
            diffChildren(oldNode.children,newNode.children,index,patches,currentPatch)
        }
    }
    //node不同,用新节点替换老节点
}