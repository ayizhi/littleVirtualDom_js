var _ = require('./util');

/**
 * @param {String} tagName
 * @param {Object} props - element的属性props,
 * @param {Array<Element|String>} - 子集
 */

function Element(tagName,props,children){
    if(!(this instanceof Element)){
        if(!_.isArray(children) && children!=null){
            children = _.slice(arguments,2).filter(_.truthy);
        }
        return new Element(tagName,props,children)
    }

    if(_.isArray(props)){
        children = props;
        props = {};
    }

    this.tagName = tagName;
    this.props = props || {};
    this.children = children || [];
    this.key = props ? props.key : void 333;

    var count = 0;

    _.each(this.children,function(child,i){
        if(child instanceof Element){
            count += child.count;
        }else{
            children[i] = '' + child;
        }
        count++
    })
    this.count = count;
}

Element.prototype = {
    //render
    render: function(){
        var t = this;
        var el = document.createElement(this.tagName);
        var props = this.props;

        for(var propName in props){
            var propValue = props[propName];
            _.setAttr(el,propName,propValue);
        }

        _.each(t.children,function(child,i){
            var childEl = (child instanceof Element) ?
                child.render : document.createTextNode(child);

            el.appendChild(childEl)
        })

        return el;
    }
}

module.exports = Element