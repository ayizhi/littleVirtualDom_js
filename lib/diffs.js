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
    else{
        currentPatch.push({type: patch.REPLACE,node: newNode})
    }
    if(currentPatch.length){
        patches[index] = currentPatch
    }
}

function diffChildren(oldChildren,newChildren,index,patches,currentPatch) {
    var diffs = listDiff(oldChildren,newChildren,'key');
    newChildren = diffs.children;

    if(diffs.moves.length){
        var reorderPatch = {type: patch.REORDER,moves:diffs.moves};
        currentPatch.push(reorderPatch);
    }

    var leftNode = null;
    var currentNodeIndex = index;
    _.each(oldChildren,function(child,i){
        var newNode = newChildren[i];
        currentNodeIndex = (leftNode && leftNode.count)
            ? currentNodeIndex + leftNode.count + 1
            : currentNodeIndex + 1;
        dfsWalk(child,newNode,currentNodeIndex,patches);
        leftNode = child;
    })
}

function diffProps(oldNode,newNode){
    var count = 0;
    var newProps = newNode.props;
    var oldProps = oldNode.props;

    var key,value;
    var propsPatches = {};

    //找到不同的props
    for(key in oldProps){
        value = oldProps[key];
        if(newProps[key] != value){
            count++;
            propsPatches[key] = newProps[key];
        }
    }

    //找到新的props
    for(key in newProps){
        value = newProps[key];
        if(!oldProps.hasOwnProperty(key)){
            count++
            propsPatches[key] = newProps[key];
        }
    }

    //如果属性全想通
    if(count === 0){
        return null;
    }

    return propsPatches;
}

function isIgnoreChildren(node){
    return (node.props && node.props.hasOwnProperty('ignore'))
}

module.exports = diff;