//列表对比找最小步的算法


/**
 * @param{Array} oldList - 原list
 * @param{Array} newList - 新list
 * @param{string} key - 关键字段名
 * **/


var oldList = [{id:'a'},{id:'b'},{id:'c'},{id:'d'},{id:'e'}]
var newList = [{id:'c'},{id:'a'},{id:'b'},{id:'c'},{id:'f'},{id:'g'}]



function listDiff(oldList,newList,key){
	var oldMap = buildKeyIndexAndFree(oldList);
	var newMap = buildKeyIndexAndFree(newList);

	var newFree = newMap['freeList'];

	var oldKeyIndex = oldMap.keyIndex;
	var newKeyIndex = newMap.keyIndex;

	var moves = [];

	//先对老的list与新的list进行对比,找出哪些被删除掉,并生成新的simulateList
	var children = [];
	var item,itemKey,freeIndex = 0;
	(function(){
		for(var i = 0,len = oldList.length;i<len;i++){
			item = oldList[i];
			itemKey = getItemKey(item,key);
			if(itemKey){
				//判断newlist是否也含有此key,有则将newlist中的那一项放入children,没有则置为null,
				if(newList.hasOwnProperty(itemKey)){
					var newItemIndex = newKeyIndex[itemKey];
					children.push(newList[newItemIndex]);
				}else{
					children.push(null);
				}
			}
		}
	})();

}


//将位置与key绑定,并且将没有key的自由(free)元素筛出
function buildKeyIndexAndFree(list,key){
	var keyIndex = {};
	var freeList = [];
	for(var i= 0,len=list.length;i<len;i++){
		var item = list[i];
		var itemKey = getItemKey(item,key);
		if(itemKey){
			keyIndex[itemKey] = i;
		}else{
			freeList.push(item)
		}
	}

	return{
		keyIndex: keyIndex,
		freeList: freeList
	}
}

//知道{k:v}中的k,提取出v
function getItemKey(item,key){
	if(!item || !key){
		return undefined;
	}
	return typeof key === 'string' ? item[key] : undefined
}