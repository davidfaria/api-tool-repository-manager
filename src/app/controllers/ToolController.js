import { Op } from 'sequelize';
import Tool from '../models/Tool';

class ToolController {
  async index(req, res) {
    const page = parseInt(req.query.page || 1, 10);
    const perPage = parseInt(req.query.perPage || 5, 10);

    const tools = await Tool.findAndCountAll({
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    const totalPage = Math.ceil(tools.count / perPage);

    return res.json({
      page,
      perPage,
      data: tools.rows,
      total: tools.count,
      totalPage,
    });
  }

  async search(req, res) {
    const tag = req.query.tag || '';
    const page = parseInt(req.query.page || 1, 10);
    const perPage = parseInt(req.query.perPage || 5, 10);

    const tools = await Tool.findAndCountAll({
      where: {
        tags: {
          [Op.contains]: [tag],
        },
      },
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    const totalPage = Math.ceil(tools.count / perPage);

    return res.json({
      page,
      perPage,
      data: tools.rows,
      total: tools.count,
      totalPage,
    });
  }

  async store(req, res) {
    const tool = await Tool.create(req.body);

    return res.status(201).json(tool);
  }

  async destroy(req, res) {
    const { id } = req.params;
    await Tool.destroy({ where: { id } });
    return res.status(204).send();
  }
}

export default new ToolController();
