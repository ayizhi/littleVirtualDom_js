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
	@return {Object} - a list of actions that tell how to remove and insert
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




}

