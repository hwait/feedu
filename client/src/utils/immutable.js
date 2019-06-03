export default class Immutable {
	static updateObjectInArray(array, action) {
		return array.map((item, index) => {
			if (index !== action.index) {
				// This isn't the item we care about - keep it as-is
				return item;
			}
			// Otherwise, this is the one we want - return an updated value
			return {
				...item,
				...action.item
			};
		});
	}
	static updateStringInArray(array, action) {
		return array.map((item, index) => {
			if (index !== action.index) {
				// This isn't the item we care about - keep it as-is
				return item;
			}
			// Otherwise, this is the one we want - return an updated value
			return action.item;
		});
	}
	static removeIndex(array, index) {
		//return [ ...array.slice(0, index), ...array.slice(index + 1) ];
		let newArray = array.slice();
		newArray.splice(index, 1);
		return newArray;
	}
	static removeItem(array, item) {
		return array.filter((x) => x !== item);
	}
	static removeItemById(array, id) {
		return array.filter((x) => x._id !== id);
	}
	static removeObject(array, item) {
		return array.filter((x) => !x.isSame(item));
	}
	static removeObjects(array, items) {
		return array.filter((x) => !items.some((y) => y.isSame(x)));
	}
	static insertItem(array, action) {
		let newArray = array.slice();
		newArray.splice(action.index, 0, action.item);
		return newArray;
	}
	static addItem(array, item) {
		let newArray = array.slice();
		newArray.splice(array.length, 0, item);
		return newArray;
	}
	static addObject(array, item) {
		console.log('==============addObject=================');
		console.log(array, item);
		console.log('====================================');
		let newArray = array.slice();
		newArray.splice(array.length, 0, item);
		return newArray;
	}
}
