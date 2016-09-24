//列表对比找最小步的算法

//看我这注释应该是进不了外企了
//崇洋媚外????exo me???


/**
 * @param{Array} oldList - 原list
 * @param{Array} newList - 新list
 * @param{string} key - 关键字段名
 * move返回值中的type - 0 为remove, 1 为insert
 * **/




var oldList = [{id:'a'},{id:'b'},{id:'c'},{id:'d'},{id:'e'}]
var newList = [{id:'c'},{id:'a'},{id:'b'},{id:'c'},{id:'f'},{id:'g'}]



function listDiff(oldList,newList,key){
	var oldMap = buildKeyIndexAndFree(oldList,key);
	var newMap = buildKeyIndexAndFree(newList,key);

	console.log(oldMap,newMap)

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
			//判断是否有此key;
			if(itemKey){
				//判断newlist是否也含有此key,有则将newlist中的那一项放入children,没有则置为null,
				if(newKeyIndex.hasOwnProperty(itemKey)){
					var newItemIndex = newKeyIndex[itemKey];
					children.push(newList[newItemIndex]);
				}else{
					children.push(null);
				}
			}else{
				//如果此时item(oldlist[i])也是没有key标记,则不要,并且从新的free项中选第index个,index且自加;
				//如果freeItem中没有,则向children中push null
				var freeItem = newFree[freeIndex++];
				children.push(freeItem || null);
			}
		}
	})();


	var simulateList = children.slice(0);//slice对children的深度遍历
	//将得到的新数组去null
	//也就是只保留新老数组相同的部分,与 free之类


	(function(){
		for(var i= 0,len=simulateList.length;i<len;i++){
			if(simulateList[i] === null){
				remove(i);
				removeSimulate(i);
				i--;
			}
		}
	})();




	//处理完了new有old没有(删除)的情况,还需要处理 1,顺序,2,新增
	(function(){
		var j = 0;//i为newlist的指针,j为simualteList的指针
		for(var i = 0,len = newList.length;i<len;i++){
			var item = newList[i];
			var itemKey = getItemKey(item,key);

			var simulateItem = simulateList[j];
			var simulateItemKey = getItemKey(simulateItem,key);

			if(simulateItem){
				if(itemKey === simulateItemKey){
					j++
				}else{
					//新增
					if(!oldKeyIndex.hasOwnProperty(itemKey)){
						insert(i,item);
					}else{
						//删除掉simulatelist当前能使item对准,则删掉
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
				insert(i,item);
			}
		}
	})();

	function insert(i,item){
		var move = {index:i,item:item,type:1};
		moves.push(move);
	}

	function remove(i){
		var move = {index:i,type:0};
		moves.push(move);
	}

	function removeSimulate(i){
		simulateList.splice(i,1);
	}

	return {
		moves: moves,
		chidlren: children
	}

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

module.exports = listDiff;