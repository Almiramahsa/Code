const { User } = require('../../../models');

module.exports = async (req, res) => {
  const userIds = req.query.user_ids || [];
  const sqlOptions = {
    attributes: ['id', 'name', 'email', 'role', 'profession', 'avatar'],
    where: {},
  };
  if (userIds.length) {
    sqlOptions.where.id = userIds;
  }
  try {
    const users = await User.findAll(sqlOptions);
    return res.json({
      status: 'success',
      data: users,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};
