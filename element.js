//如何把js对象渲染成dom

function Element(tagName,props,children){
    this.tagName = tagName;
    this.props = props;
    this.children = children;
}

Element.prototype = {
    render: function(){
        var t = this;
        var el = document.createElement(t.tagName);
        var props = t.props;

        for(var propName in props){
            var thisPropValue = props['propName'];
            el.setAttribute(propName,thisPropValue);
        }

        var children = t.children || [];

        children.forEach(function(child){
            var tChild = (child instanceof Element) ? child.render() : document.createTextNode(child);
            el.appendChild(tChild)
        })

        return el;
    }
}

function el(tagName,props,children){
    return new Element(tagName,props,children);
}


/**
 * <ul id='list'>
 *<li class='item'>Item 1</li>
 *<li class='item'>Item 2</li>
 *<li class='item'>Item 3</li>
 *</ul>
 * 即可转化成
 * **/


module.exports = Element;