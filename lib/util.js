var _ = {};

_.type = function(obj){
    console.log(Object.prototype.toString.call(obj))
    return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g,'');
}

_.isArray = function(list){
    return _.type(list) === 'Array';
}

_.slice = function (arrayLike,index) {
    return Array.prototype.slice.call(arrayLike,index);
}
_.truthy = function(value){
    return !!value;
}

_.isString = function(string){
    return _.type(string) === 'String';
}

_.each = function (list,fn) {
    for(var i=0,len=list.length;i<len;i++){
        fn(list[i],i);
    }
}

_.toArray = function (listLike) {
    if(!listLike){
        return [];
    }


    return listLike.slice(0);
}

_.setAttr = function setAttr(node,key,value){
    switch(key){
        case 'style':
            node.style.cssText = value
            break;
        case 'value':
            var tagName = node.tagName || '';
            tagName = tagName.toLowerCase();
            if(tagName === 'input' || tagName === 'textarea'){
                node.value = value;
            }else{
                node.setAttribute(key,value);
            }
            break;
        default:
            node.setAttribute(key,value)
    }
}

module.exports = _;
