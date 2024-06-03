module.exports = (sequelize, DataTypes) => {
    const kehadiran = sequelize.define('kehadiran', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        kelas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        absen: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false
        },
        absensi: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        tableName: 'kehadiran',
    });
    kehadiran.associate = (models) => {
        kehadiran.belongsTo(models.users, {
            foreignKey: 'userId',
            as: 'user'
        });
    }
    return kehadiran;
}