// var _ = exports
var _ = new Object

_.type = function(obj){
    return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g,'')
}

_.isArray = function(list){
    return _.type(list) === 'Array'
}

_.slice = function(arrayLike,index){
    return Array.prototype.slice.call(arrayLike,index)
}

_.truth = function(value){
    return !!value
}

_.isString = function(list){
    return _.type(list) === 'String'
}

_.each = function(array,fn){
    for(var i=0,len=array.length;i<len;i++){
        fn(array[i],i)
    }
}

_.setAttr = function(node,key,value){
    switch(key){
        case 'style':
            node.style.cssText = value
            break
        case 'value':
            var tagName = node.tagName || ''
            tagName = tagName.toLowerCase()
            if(tagName === 'input' || tagName === 'textarea'){
                node.value = value
            }else{
                node.setAttribute(key,value)
            }
            break
        default:
            node.setAttribute(key,value)
            break
    }
}

_.isDom = function(dom){
    typeof HTMLElement === 'object'
        ? (function (obj){
            return obj instanceof HTMLElement;
    })(dom)
        : (function(obj){
            return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string'
    })(dom)
}


