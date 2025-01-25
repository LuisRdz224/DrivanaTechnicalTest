import { DataTypes } from 'sequelize';

export const defineVehicleModel = (sequelize) => {
    return sequelize.define('Vehicle', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price_per_day: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        reservations: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: [],
        },
    },
        {
            timestamps: false,
        }
    );
};
