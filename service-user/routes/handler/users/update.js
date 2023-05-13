const { User } = require('../../../models');
const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    name: 'string|empty:false',
    email: 'email|empty:false',
    password: 'string|min:6',
    profession: 'string|optional',
    avatar: 'string|optional',
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate,
    });
  }

  const id = req.params.id;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found',
    });
  }

  const { email, password } = req.body;
  if (email !== undefined && email !== user.email) {
    const checkEmail = await User.findOne({ where: { email } });
    if (checkEmail) {
      return res.status(409).json({
        status: 'error',
        message: 'email already exists',
      });
    }
  }

  if (password !== undefined) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await user.update({ password: hashedPassword });
  }

  const { name, profession, avatar } = req.body;
  await user.update({ name, email, profession, avatar });

  res.json({
    status: 'success',
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      profession: user.profession,
      avatar: user.avatar,
    },
  });
};
