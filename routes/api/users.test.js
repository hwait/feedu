const req = require('supertest');
const express = require('express');
const app = express();

let request = req('http://localhost:5000/api/users/');

const validInput = {
	name: 'test',
	email: 'test@gmail.com',
	password: '123456',
	password2: '123456'
};
describe('User Register Form Validation:', () => {
	test('Should contain field: name', (done) => {
		const { name, ...uc } = validInput;
		request //
			.post('register')
			.send(uc)
			.expect(400)
			.then((response) => {
				expect(response.body.hasOwnProperty('name')).toBe(true);
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
			.expect(400)
			.then((response) => {
				expect(response.body.hasOwnProperty('email')).toBe(true);
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
			.expect(400)
			.then((response) => {
				expect(response.body.hasOwnProperty('password')).toBe(true);
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
			.expect(400)
			.then((response) => {
				expect(response.body.hasOwnProperty('password2')).toBe(true);
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
			.expect(400)
			.then((response) => {
				expect(response.body.hasOwnProperty('name')).toBe(true);
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
			.expect(400)
			.then((response) => {
				expect(response.body.hasOwnProperty('name')).toBe(true);
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
			.expect(400)
			.then((response) => {
				expect(response.body.hasOwnProperty('email')).toBe(true);
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
			.expect(400)
			.then((response) => {
				expect(response.body.hasOwnProperty('password')).toBe(true);
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
			.expect(400)
			.then((response) => {
				expect(response.body.hasOwnProperty('password')).toBe(true);
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
			.expect(400)
			.then((response) => {
				expect(response.body.hasOwnProperty('password2')).toBe(true);
			})
			.then((err) => {
				if (err) throw done(err);
				done();
			});
	});
});
describe('User not permitted actions:', () => {
	test('Get current User 401', (done) => {
		request // Get current User
			.get('current')
			.expect(401)
			.then(done());
	});
	test('Remove non-existing User 401', (done) => {
		request //
			.delete('delete')
			.expect(401)
			.then(done());
	});
});
describe('Authorized User actions:', () => {
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

	test('currentuser', (done) => {
		request // Get current User
			.get('current')
			.set('Authorization', token)
			.expect(200)
			.then((response) => {
				expect(response.body.name).toBe('test');
			})
			.then(done());
	});
	test('Remove User "test"', (done) => {
		request //
			.delete('delete')
			.set('Authorization', token)
			.expect(200)
			.then((response) => {
				expect(response.body.hasOwnProperty('success')).toBe(true);
			})
			.then(done());
	});
});
