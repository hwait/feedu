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
	static toggleObjectsInArray(array, action) {
		// Action should be {id,field}
		return array.map((item) => {
			if (item._id === action.id) {
				return { ...item, [action.field]: item[action.field] ? false : true };
			}
			return item;
		});
	}
	static updateObjectsInArray(array, items) {
		return array.map((item) => {
			const found = items.find((x) => x._id === item._id);
			return found ? found : item;
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
	static addItems(array, items) {
		return [ ...new Set([].concat.apply(array, items)) ];
	}
	static addItem(array, item) {
		let newArray = array.slice();
		newArray.splice(array.length, 0, item);
		return newArray;
	}
	static addObject(array, item) {
		let newArray = array.slice();
		newArray.splice(array.length, 0, item);
		return newArray;
	}
}
