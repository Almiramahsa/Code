const { sequelize } = require('.');

module.export = (Sequelize, DataTypes) => {
  const Media = sequelize.define(
    'Media',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: dalse,
      },
      image: {
        type: DataTypes.STRING,
        alowNull: false,
      },
      creatAt: {
        field: 'created_At',
        type: DataTypes.DATE,
        allowNull: false,
      },
      updateAt: {
        field: 'update_At',
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'media',
    }
  );
};
