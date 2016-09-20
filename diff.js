//在实际的代码中，会对新旧两棵树进行一个深度优先的遍历，这样每个节点都会有一个唯一的标记：
//在深度优先遍历的时候，每遍历到一个节点就把该节点和新的的树进行对比。如果有差异的话就记录到一个对象里面。

function diff(oldTree,newTree){
    var index = 0;//当前节点的标记
    var patches = {};//用来记录每个节点差异的对象
    dfIterator(oldTree,newTree,index,patches);
    return patches;
}

//对两个棵树依据深度遍历
function dfIterator(oldNode,newNode,index,patches){
    if(oldNode === newNode){
        return
    }
    //var moves = diffCurrent(oldNode,newNode,index)

    //遍历子节点
    diffChildren(oldNode.children,newNode.children,index,patches)
}

function diffChildren(oldChildren,newChildren,index,patches){
    var leftNode = null;
    var currentNodeIndex = index;
    oldChildren.forEach(function(child,i){
        var newChild = newChildren[i];
        currentNodeIndex = (leftNode && leftNode.count) // 计算节点标识
        ? currentNodeIndex + leftNode.count + 1
        : currentNodeIndex + 1;

        dfIterator(child,newChild,currentNodeIndex,patches);
        leftNode = child;
    })
}


/**
 * var REPLACE = 0
 * var REORDER = 1
 * var PROPS = 2
 * var TEXT = 3
 **/


/**
 * 可能会有的dom操作:
 * 替换掉原来的节点，例如把上面的div换成了section
 * 移动、删除、新增子节点，例如上面div的子节点，把p和ul顺序互换 ———— 需要列表对比算法
 * 修改了节点的属性
 * 对于文本节点，文本内容可能会改变。例如修改上面的文本节点2内容为Virtual DOM 2。
 **/


//差异类型
var REPLACE = 0
var REORDER = 1
var PROPS = 2
var TEXT = 3

