import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';
import Tool from '../../src/app/models/Tool';

beforeEach(async () => {
  await truncate();
});

describe('Tests Integration Tools', () => {
  it('Should be able to list all tools', async () => {
    const tools = await factory.createMany('Tool', 5);

    // Obs. params default (PAGE: 1, PER_PAGE: 5)

    const response = await request(app).get('/tools');

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(tools.length);
  });

  it('Should be able to search tools by tag name', async () => {
    await factory.create('Tool', {
      tags: ['api', 'json'],
    });
    await factory.create('Tool', {
      tags: ['node'],
    });
    await factory.create('Tool', {
      tags: ['node', 'git hub'],
    });

    const params = {
      tag: 'node',
    };

    const response = await request(app).get('/tools/search', {
      params,
    });

    expect(response.status).toBe(200);
  });

  it('Should be able to create a new tool', async () => {
    const tool = {
      title: 'Notion',
      link: 'https://notion.so',
      description:
        'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
      tags: [
        'organization',
        'planning',
        'collaboration',
        'writing',
        'calendar',
      ],
    };

    const response = await request(app)
      .post('/tools')
      .send(tool);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(tool.title);
  });

  it('Should be able to delete tool by id', async () => {
    const tool = await factory.create('Tool');
    const response = await request(app).delete(`/tools/${tool.id}`);
    expect(response.status).toBe(204);

    const checkDeleted = await Tool.findByPk(tool.id);

    expect(checkDeleted).toBeNull();
  });
});
