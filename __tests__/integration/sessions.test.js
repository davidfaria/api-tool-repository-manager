import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

beforeEach(async () => {
  await truncate();
});

describe('Tests Integration Session', () => {
  it('Should be able to return user with token after sessions login', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      });
    expect(response.status).toBe(200);
  });

  it('Should not be able to authenticate with credentials invalid', async () => {
    const user = await factory.create('User', {
      email: 'davidfaria89@gmail.com',
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'davi@gmail.com',
        password: 'davi1234',
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User or Password invalid');
  });

  it('Should not be able to authenticate with password invalid', async () => {
    const user = await factory.create('User', {
      email: 'davidfaria89@gmail.com',
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'davidfaria89@gmail.com',
        password: 'davi1234',
      });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Password does not match');
  });
});
