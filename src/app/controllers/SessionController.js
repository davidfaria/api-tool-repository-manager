import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user)
      return res.status(400).json({
        code: 400,
        message: 'User or Password invalid',
      });

    if (!(await user.checkPassword(password)))
      return res
        .status(401)
        .json({ code: 401, message: 'Password does not match' });

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
