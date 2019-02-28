//const users = require('../routes/api/users');
const isEmpty = require('../utils/isempty');
let req = {
	body: {}
};

let res = {};

test('route users/tests ', () => {
	expect(isEmpty({})).toBe(true);
});
