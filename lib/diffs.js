
(function (window){
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
            currentPatch.push({type:patch.REPLACE,node:newNode})
        }

        if(currentPatch.length){
            patches[index] = currentPatch
        }
    }

    function diffChildren(oldChildren,newChildren,index,patches,currentPatch){
        var diffs = listDiff(oldChildren,newChildren,'key')
        newChildren = diffs.children;
        if(diffs.moves.length){
            var reorderPatch = {type:patch.REORDER,moves:diffs.moves}
            currentPatch.push(reorderPatch)
        }
        var leftNode = null;
        var currentNodeIndex = index;
        _.each(oldChildren,function(child,i){
            var newChild = newChildren[i]
            currentNodeIndex = (leftNode && leftNode.count)
                ? currentNodeIndex + leftNode.count + 1
                : currentNodeIndex + 1


            dfsWalk(child,newChild,currentNodeIndex,patches)
            leftNode = child
        })
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
