const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Drivers",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 15],
            msg: "Name must be between 2 and 15 characters long",
          },
        },
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 15],
            msg: "Surname must be between 2 and 15 characters long.",
          },
        },
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        defaultValue: "No description available.",
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "/defaultImage.jpg",
      },
      nationality: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: "Nationality can only contain letters and no spaces.",
          },
        },
      },
      dob: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isDate: {
            msg: "DOB must be a valid date of birth ie.: 1980-01-25",
          },
          isBefore: {
            args: "2006-01-01",
            msg: "The driver must be at least 18 years old",
          },
        },
      },
      created: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
