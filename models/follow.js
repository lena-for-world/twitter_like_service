module.exports = (sequelize, DataTypes) => {
    return sequelize.define('follow', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    }, {
        timestamps: true,
        paranoid: true,
    });
};