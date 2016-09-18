/**	
*	react 中有自己的算法使diff这个时间复杂度为O(n^3)转为O(n) , 感觉有些取巧
*	主要通过：
*	1,分层对比
*	2,基于key来匹配
*	3,基于自定义元素做优化
**/


/**
	@param {Array} oldList
	@param {Array} newList
	@return {Object} - {moves : <Array>}
					 - a list of actions that tell how to remove and insert
					 即返回的是操作步骤，结合下面的操作种类，结合patches即可完成操作
**/


/**
	我们定义了几种差异类型：

	var REPLACE = 0
	var REORDER = 1
	var PROPS = 2
	var TEXT = 3
**/

function diff (oldList,newList,key){
	var oldMap = makeKeyIndexAndFree(oldList,key);
	var newMap = makeKeyIndexAndFree(newList,key);

	var newFree = newMap.free;

	var oldKeyIndex = oldMap.keyIndex;
	var newKeyIndex = newMap.keyIndex;

	var moves = [];

	var children = [];
	var i = 0;
	var item;
	var itemKey;
	var freeIndex = 0;


	while(i<oldList.length){
		item = oldList[i];
		itemKey = getItemKey(item,key);
		if(itemKey){
			if(!newKeyIndex.hasOwnProperty(itemKey)){
				children.push(null);
			}else{
				var newItemIndex = newKeyIndex[itemKey];
				children.push(newList[newItemIndex]);
			}
		}else{
			var freeItem = newFree[freeIndex++];
			children.push(freeItem || null)
		}
		i++
	}

	var simulateList = children.slice(0);

	i = 0;

	//删除不再存在的item
	while(i<simulateList.length){
		if(simulateList[i] == null){
			remove(i);
			removeSimulate(i)
		}else{
			i++
		}
	}

	// i 是对newlist中item的指针
	// j 是对simulateList中item的指针
	var j = i = 0;
	while(i < newList.length){
		item = newList[i];
		itemKey = getItemKey(item,key);

		var simulateItem = simulateList[j];
		var simulateItemKey = getItemKey(simulateItem,key);

		if(simulateItem){
			if(itemKey === simulateItemKey){
				j++
			}else{
				//new item , just insert it
				if(!oldKeyIndex.hasOwnProperty(itemKey)){
					insert(i,item)
				}else{
					// if remove current simulateItem make item in right place
					// then just remove it
					var nextItemKey = getItemKey(simulateList[j+1],key);
					if(nextItemKey === itemKey){
						remove(i);
						removeSimulate(j);
						j++
					}else{
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
		var move = {index: index,type: 0}
		moves.push(move)
	}

	function insert(index,item){
		var move = {index: index,item: item,type:1}
	}

	function removeSimulate(index){
		simulateList.splice(index,1);
	}

	return {
		moves: moves,
		children: children
	}

}

/**
	* 把list转化为key－item的obj
	* @param{Array} list
	* @param{String|Function} key
**/
function makeKeyIndexAndFree(list,key){
	var keyIndex = {};
	var free = [];
	for(var i=0,len=list.length;i<len;i++){
		var item = list[i];
		var itemKey = getItemKey(item,key);
		if(itemKey){
			keyIndex[itemKey] = i;
		}else{
			free.push(item);
		}
	}

	return{
		keyIndex: keyIndex,
		free: free,
	}
}

function getItemKey(item,key){
	if(!item || !key) return void 2333 //void是javascript中定义的一个操作符void后面跟一个表达式，void操作符会立即执行后面的表达式，并且统一返回undefined
	return typeof key === 'string' ? item[key] : key(item)
}

exports.makeKeyIndexAndFree = makeKeyIndexAndFree // exports for test
exports.diff = diff


