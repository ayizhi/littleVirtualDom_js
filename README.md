# little_virtual_dom_js
研究react ，对其中virtualdom的实现很感兴趣，于是做了这个demo


var tree = Element('div',{id:'box'},[
        Element('h1',{key:'h1',class:'title',style:'color:blue;font-size:24px'},['simple virtual dom']),
        Element('ul',{key:'list1',id:'list'},[
        Element('li',{key:'li1',class:'li'},['lalalallaa']),
        Element('li',{key:'li2',class:'li'},['hahahahahaha']),
        Element('li',{key:'li3',class:'li'},['xixiixiixixix'])
        ])])

var theRoot = tree.render()


var newTree = Element('div',{id:'box'},[
        Element('p',{key:'p',class:'title',style:'color:blue;font-size:24px'},['simple virtual dom']),
        Element('ul',{key:'list1',id:'list'},[
            Element('li',{key:'li4',class:'li'},['hahahhahah']),
            Element('li',{key:'li2',class:'li'},['xixiixiixixix']),
            Element('li',{key:'li1',class:'li'},['hahahahahaha']),
            Element('li',{key:'li5',class:'li'},['biubiubiubiu'])
            ])])


var diffs = diff(tree,newTree)

patch(theRoot,diffs)
