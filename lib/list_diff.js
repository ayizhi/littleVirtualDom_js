//列表对比找最小步的算法

//看我这注释应该是进不了外企了
//崇洋媚外????exo me???


/**
 * @param{Array} oldList - 原list
 * @param{Array} newList - 新list
 * @param{string} key - 关键字段名
 * @return {Object} - {moves:<Array>}
 *                  - move返回值中的type - 0 为remove, 1 为insert
 * **/




(function(window){

    function listDiff(oldList,newList,key){


        //将新老list中,有key与没key的区分开(有key —— keyIndex,没key —— freeList),这个key是属性name
        var oldMap = buildKeyIndexAndFree(oldList,key)
        var newMap = buildKeyIndexAndFree(newList,key)

        var newFree = newMap['freeList'];


        var oldKeyIndex = oldMap.keyIndex;
        var newKeyIndex = newMap.keyIndex;


        var moves = [];//最终返回的结果

        var children = [];
        var i = 0;
        var item,
            itemKey,
            freeIndex=0;

        //首先新老对比,检查相对于新,老集是否有元素被删除(只是得到是否被删除,保留新老共存的跟free元素)
        while(i<oldList.length){
            item = oldList[i];
            itemKey = getItemKey(item,key)
            if(itemKey){
                if(!newKeyIndex.hasOwnProperty(itemKey)){
                    children.push(null)
                }else{
                    var newItemIndex = newKeyIndex[itemKey]
                    children.push(newList[newItemIndex])
                }
            }else{
                var freeItem = newFree[freeIndex++]
                children.push(freeItem || null)
            }
            i++
        }

        var simulateList = children.slice(0)



        //将不存在的元素移除
        i=0;
        while(i<simulateList.length){
            if(simulateList[i] === null){
                remove(i)
                removeSimulate(i)
            }else{
                i++
            }
        }

        //现在我们得到了处理后的simulateList,即新老交集,与老元素的free元素
        //i是newList元素的指针
        //j是simulateList元素的指针
        var j = i = 0;
        while(i<newList.length){
            item = newList[i]
            itemKey = getItemKey(item,key)

            var simulateItem = simulateList[j]
            var simulateItemKey = getItemKey(simulateItem,key)

            if(simulateItem){
                if(itemKey === simulateItemKey){
                    j++
                }else{
                    //如果是新的item,直接插入,(新有老没有,则插入)
                    if(!oldKeyIndex.hasOwnProperty(itemKey)){
                        insert(i,item)
                    }else{
                        //如果删掉当前simulateList能使当前指针对应的newList与simulateList相等,则删除
                        var nextItemKey = getItemKey(simulateList[j+1],key)
                        if(nextItemKey === itemKey){
                            remove(i)
                            removeSimulate(j)
                            j++
                        }else{
                            //否则,插入元素
                            insert(i,item)
                        }
                    }
                }
            }else{
                insert(i,item)
            }
            i++
        }



        function remove(index){
            var move = {index:index,type:0}
            moves.push(move)
        }

        function insert(index){
            var move = {index:index,item:item,type:1}
            moves.push(move)
        }

        function removeSimulate(index){
            simulateList.splice(index,i)
        }

        return{
            moves:moves,
            children:children
        }


    }
    function buildKeyIndexAndFree(list,key){
        var keyIndex = {};
        var freeList = [];
        for(var i=0,len=list.length;i<len;i++){
            var item = list[i]
            var itemKey = getItemKey(item,key);
            if(itemKey){
                keyIndex[itemKey] = i;
            }else{
                freeList.push(item)
            }
        }

        return {
            keyIndex: keyIndex,
            freeList: freeList
        }
    }

    function getItemKey(item,key){
        if(!item || !key){
            return undefined;
        }
        return typeof key === 'string' ? item[key] : undefined
    }


    window.Element = Element
})(window)



// module.exports = listDiff