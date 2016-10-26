// var _ = require('./util.js')

function Element(tagName,props,children){

    if(!(this instanceof Element)){
        if(!_.isArray(children) && children != null){
            children = _.slice(arguments,2).filter(_.truth)
        }
        return new Element(tagName,props,children)
    }


    if(_.isArray(props)){
        children = props
        props = {}
    }

    this.tagName = tagName;
    this.props = props || {};
    this.children = children || [];
    this.key = props ? props.key : void 2333;

    var count = 0;

    _.each(this.children,function(child,i){
        if(child instanceof Element){
            count += child.count
        }else{
            children[i] = '' + child
        }
        count++
    })
    this.count = count
}

Element.prototype.render = function(){
    var t = this;
    var el = document.createElement(t.tagName)
    var props = t.props


    for(var propName in props){
        var propValue = props[propName]
        _.setAttr(el,propName,propValue)
    }


    _.each(t.children,function(child){
        var childNode = (child instanceof Element)
            ? child.render()
            : document.createTextNode(child);
        childNode && el.appendChild(childNode)
    })

    document.body.appendChild(el)
    return el
}




// module.exports = Element