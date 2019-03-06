const req = require('supertest');
const express = require('express');
const app = express();

let request = req('http://localhost:5000/api/users/');

const validInput = {
	name: 'test',
	surname: 'tests',
	email: 'test@gmail.com',
	password: 'a1234567',
	password2: 'a1234567',
	role: 0,
	classn: 0,
	active: true,
	users: []
};
describe('User Register Form Validation:', () => {
	test('Should contain field: name', (done) => {
		const { name, ...uc } = validInput;
		request //
			.post('register')
			.send(uc)
			.expect(422)
			.then((response) => {
				expect(response.body.errors[0].param).toBe('name');
			})
			.then((err) => {
				if (err) throw done(err);
				done();
			});
	});
	test('Should contain field: email', (done) => {
		const { email, ...uc } = validInput;
		request //
			.post('register')
			.send(uc)
			.expect(422)
			.then((response) => {
				expect(response.body.errors[0].param).toBe('email');
			})
			.then((err) => {
				if (err) throw done(err);
				done();
			});
	});
	test('Should contain field: password', (done) => {
		const { password, ...uc } = validInput;
		request //
			.post('register')
			.send(uc)
			.expect(422)
			.then((response) => {
				expect(response.body.errors[0].param).toBe('password');
			})
			.then((err) => {
				if (err) throw done(err);
				done();
			});
	});
	test('Should contain field: password2', (done) => {
		const { password2, ...uc } = validInput;
		request //
			.post('register')
			.send(uc)
			.expect(422)
			.then((response) => {
				expect(response.body.errors[0].param).toBe('password2');
			})
			.then((err) => {
				if (err) throw done(err);
				done();
			});
	});
	test('Name should be min 2 smbs', (done) => {
		const uc = { ...validInput, name: 'a' };
		request //
			.post('register')
			.send(uc)
			.expect(422)
			.then((response) => {
				expect(response.body.errors[0].param).toBe('name');
			})
			.then((err) => {
				if (err) throw done(err);
				done();
			});
	});
	test('Name should be max 30 smbs', (done) => {
		const uc = { ...validInput, name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' };
		request //
			.post('register')
			.send(uc)
			.expect(422)
			.then((response) => {
				expect(response.body.errors[0].param).toBe('name');
			})
			.then((err) => {
				if (err) throw done(err);
				done();
			});
	});
	test('Email must be in format', (done) => {
		const uc = { ...validInput, email: 'aaaa.gmail.com' };
		request //
			.post('register')
			.send(uc)
			.expect(422)
			.then((response) => {
				expect(response.body.errors[0].param).toBe('email');
			})
			.then((err) => {
				if (err) throw done(err);
				done();
			});
	});
	test('Password should be min 6 smbs', (done) => {
		const uc = { ...validInput, password: '12345', password2: '12345' };
		request //
			.post('register')
			.send(uc)
			.expect(422)
			.then((response) => {
				expect(response.body.errors[0].param).toBe('password');
			})
			.then((err) => {
				if (err) throw done(err);
				done();
			});
	});
	test('Password should be max 30 smbs', (done) => {
		const uc = {
			...validInput,
			password: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
			password2: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
		};
		request //
			.post('register')
			.send(uc)
			.expect(422)
			.then((response) => {
				expect(response.body.errors[0].param).toBe('password');
			})
			.then((err) => {
				if (err) throw done(err);
				done();
			});
	});
	test('Password must be equal to password2', (done) => {
		const uc = { ...validInput, password2: '1234567' };
		request //
			.post('register')
			.send(uc)
			.expect(422)
			.then((response) => {
				expect(response.body.errors[0].param).toBe('password2');
			})
			.then((err) => {
				if (err) throw done(err);
				done();
			});
	});
});

describe('User not permitted actions:', () => {
	test('Get current User 404', (done) => {
		request // Get current User
			.get('test@fakeemail.com')
			.expect(404)
			.then(done());
	});
	test('Remove non-existing User 401', (done) => {
		request //
			.delete('delete')
			.expect(401)
			.then(done());
	});
});

describe('Permitted User actions:', () => {
	test('Register User "test"', (done) => {
		request //
			.post('register')
			.send(validInput)
			.expect(200)
			.then((response) => {
				expect(response.body.hasOwnProperty('_id')).toBe(true);
			})
			.then((err) => {
				if (err) throw done(err);
				done();
			});
	});
	let token;
	test('login', (done) => {
		request // User login
			.post('login')
			.send({ email: validInput.email, password: validInput.password })
			.expect(200)
			.then((response) => {
				token = response.body.token;
				expect(response.body.success).toBe(true);
			})
			.then((err) => {
				if (err) throw done(err);
				done();
			});
	});
	test('GET User info', (done) => {
		request //
			.get('user/test@gmail.com')
			.expect(200)
			.then((response) => {
				expect(response.body.name).toBe('test');
			})
			.then((err) => {
				if (err) throw done(err);
				done();
			});
	});
	test('GET current User info', (done) => {
		request //
			.post('current')
			.set('Authorization', token)
			.expect(200)
			.then((response) => {
				expect(response.body.name).toBe('test');
			})
			.then((err) => {
				if (err) throw done(err);
				done();
			});
	});

	test('Change User Role', (done) => {
		request //
			.post('role')
			.set('Authorization', token)
			.send({ role: 1 })
			.expect(200)
			.then((response) => {
				expect(response.body.success).toBe(true);
			})
			.then((err) => {
				if (err) throw done(err);
				done();
			});
	});
	test('Select all teachers (should return one)', (done) => {
		request //
			.get('teachers')
			.expect(200)
			.then((response) => {
				expect(Array.isArray(response.body)).toBe(true);
			})
			.then((err) => {
				if (err) throw done(err);
				done();
			});
	});

	test('Remove User "test"', (done) => {
		request //
			.delete('delete')
			.set('Authorization', token)
			.expect(200)
			.then((response) => {
				expect(response.body.hasOwnProperty('success')).toBe(true);
			})
			.then((err) => {
				if (err) throw done(err);
				done();
			});
	});
});
