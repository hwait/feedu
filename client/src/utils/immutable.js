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
	static removeItem(array, index) {
		//return [ ...array.slice(0, index), ...array.slice(index + 1) ];
		let newArray = array.slice();
		newArray.splice(index, 1);
		return newArray;
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
}
