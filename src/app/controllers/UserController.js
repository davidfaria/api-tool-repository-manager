import User from '../models/User';

class UserController {
  async store(req, res) {
    const exists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (exists)
      return res.status(400).json({
        code: 400,
        message: 'User already registered',
      });

    const { id, name, email } = await User.create(req.body);

    return res.status(201).json({ id, name, email });
  }
}

export default new UserController();
