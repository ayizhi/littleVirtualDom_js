// module.exports = diff;
// var _ = require('./util')
// var patch = require('./patch')
// var listDiff = require('./list_diff')

(function (window){
    function diff(oldTree,newTree){
        var index = 0;
        var patches = {};
        dfsWalk(oldTree,newTree,index,patches);
        return patches
    }

    function dfsWalk(oldNode,newNode,index,patches) {
        console.log('000000000')
        var currentPatch = [];
        if(newNode === null){    //被删除
            console.log(11111111)
            //当reorder的时候就会被抹去,所以不用做任何事情
            console.log(currentPatch,'======')
        }else if(_.isString(oldNode) && _.isString(newNode)){//处理文本节点
            console.log(22222222)
            if(newNode !== oldNode){
                currentPatch.push({type: patch.TEXT,content:newNode})
            }
            console.log(currentPatch,'======')

        }else if(oldNode.tagName === newNode.tagName && newNode.key === oldNode.key){//当新老node相同,比较其子集
            console.log(3333333)
            var propsPatches = diffProps(oldNode,newNode);
            //对props
            if(propsPatches){
                currentPatch.push({type:patch.PROPS,props:propsPatches})
            }

            console.log(currentPatch,'======')
            //对不同的子元素
            if(!isIgnoreChildren(newNode)){
                console.log(8888888)
                diffChildren(
                    oldNode.children,
                    newNode.children,
                    index,
                    patches,
                    currentPatch
                )
            }
        }else{ //如果node不一样,用新的代替旧的
            currentPatch.push({type:patch.REPLACE,node:newNode})
            console.log(currentPatch,'======')
        }

        if(currentPatch.length){
            console.log(99999999999)
            console.log(currentPatch,'======')
            patches['index'] = currentPatch
        }
    }

    function diffChildren(oldChildren,newChildren,index,patches,currentPatch){
        console.log(55555555)
        console.log(oldChildren,newChildren,index);
        var diffs = listDiff(oldChildren,newChildren,'key')
        console.log(diffs,'+++++++=======++++++')
        newChildren = diffs.children;
        if(diffs.moves.length){
            var reorderPatch = {type:patch.REORDER,moves:diffs.moves}
            currentPatch.push(reorderPatch)
        }
        var leftNode = null;
        var currentNodeIndex = index;
        _.each(oldChildren,function(child,i){
            console.log(666666666666)
            var newChild = newChildren[i]
            currentNodeIndex = (leftNode && leftNode.count)
                ? currentNodeIndex + leftNode.count + 1
                : currentNodeIndex + 1

            console.log(currentNodeIndex,newChild)

            dfsWalk(child,newChild,currentNodeIndex,patches)
            leftNode = child
        })
        console.log(777777777)
    }

    function diffProps(oldNode,newNode) {
        var count = 0;
        var oldProps = oldNode.props;
        var newProps = newNode.props;

        var key,value;
        var propsPatches = {};

        //找到不同的props
        for(key in oldProps){
            value = oldProps[key];
            if(newProps[key] !== value){
                count++
                propsPatches[key] = newProps[key]
            }
        }

        //找出新的props
        for(key in newProps){
            value = newProps[key];
            if(!oldProps.hasOwnProperty(key)){
                count++;
                propsPatches[key] = newProps[key]
            }
        }

        if(count === 0){
            return null;
        }

        return propsPatches;
    }

    function isIgnoreChildren(node) {
        return (node.props && node.props.hasOwnProperty('ignore'))
    }

    window.diff = diff
})(window)
