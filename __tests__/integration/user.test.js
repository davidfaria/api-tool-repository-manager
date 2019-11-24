import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';
import User from '../../src/app/models/User';

beforeEach(async () => {
  await truncate();
});

describe('Tests Integration User', () => {
  it('Should be able to create a new User', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe(user.email);
  });

  it('Should not be able to create a new User with email duplicate', async () => {
    const user = await factory.create('User', {
      email: 'davidfaria89@gmail.com',
    });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'David Faria',
        email: 'davidfaria89@gmail.com',
        password: '123456',
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User already registered');
  });

  it('Should not be able to create a new User with input data invalid', async () => {
    const user = await factory.attrs('User', {
      password: '1234', // is Required min 6 caracters
    });

    const response = await request(app)
      .post('/users')
      .send(user);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation fails');
  });
});
