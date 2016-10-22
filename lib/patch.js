
var REPLACE = 0
var REORDER = 1
var PROPS = 2
var TEXT = 3

function patch(node,patches){
    var walker = {index:0}
    dfsWalk(node,walker,patches)
}

function dfsWalk(node,walker,patches){
    var currentPatches = patches[walker.index]
    var len = node.childNodes ? node.childNodes.length : 0
    for(var i=0;i<len;i++){
        var child = node.childNodes[i]
        walker.index++
        dfsWalk(child,walker,patches)
    }

    if(currentPatches){
        applyPatches(node,currentPatches)
    }
}

function applyPatches(node,currentPatches){
    _.each(currentPatches,function(currentPatch){
        switch(currentPatch.type){
            case REPLACE:
                var newNode = (typeof currentPatch.node === 'string')
                    ? document.createTextNode(currentPatch.node)
                    : currentPatch.node.render()
                node.parentNode.replaceChild(newNode,node)
                break;
            case REORDER:
                reorderChildren(node,currentPatch.moves)
                break;
            case PROPS:
                setProps(node,currentPatch.props)
                break
            case TEXT:
                if(node.textContent){
                    node.textContent = currentPatch.content
                }else{
                    node.nodeValue = currentPatch.content
                }
                break
            default:
                throw new Error(
                    'Unknown patch type ' + currentPatch.type
                )
        }
    })
}

function reorderChildren(node,moves){
    var staticNodeList = _.toArray(node.children)
    var maps = {}

    _.each(staticNodeList,function(node){
        if(node.nodeType === 1){
            
        }
    })
}