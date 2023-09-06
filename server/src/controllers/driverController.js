const axios = require("axios");
const { Drivers, Teams } = require("../db");
const { Op } = require("sequelize");
const {
  cleanArrayApi,
  cleanArrayDB,
  stringAllTeams,
} = require("../helpers/helpers");

const getAllDrivers = async function () {
  const rawArrayDB = await Drivers.findAll({
    include: {
      model: Teams,
      attributes: ["name"],
      through: { attributes: [] }, //Esto excluye el through model, que traía por default la tabla "Drivers_Teams".
    }, //Devuelve un array de objetos, si se quiere mostrar solo como un objeto, hay que hacer un map.
  });
  const dataBaseDrivers = cleanArrayDB(rawArrayDB);

  const rawArrayApi = (await axios.get(`http://localhost:5000/drivers`)).data;

  const driversApi = cleanArrayApi(rawArrayApi);

  return [...dataBaseDrivers, ...driversApi];
};

const getDriverByName = async function (name) {
  if (name) {
    //Insensitve Case
    const rawArrayDB = await Drivers.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Teams,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    const dataBaseDrivers = cleanArrayDB(rawArrayDB);
    const rawArrayApi = (await axios.get(`http://localhost:5000/drivers`)).data;
    const driversApi = cleanArrayApi(rawArrayApi);
    const filteredApi = driversApi.filter((driver) => {
      return driver.name.toLowerCase().includes(name.toLowerCase()); // Busqueda inexacta
    });
    if (filteredApi.length > 0 || dataBaseDrivers.length > 0)
      return [...filteredApi, ...dataBaseDrivers].slice(0, 15);
    else throw new Error("Driver name not found");
  }
};

const getDriverById = async function (id) {
  if (isNaN(id)) {
    const driver = await Drivers.findOne({
      where: { id },
      include: {
        model: Teams,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    return {
      id: driver.id,
      name: driver.name,
      surname: driver.surname,
      description: driver.description,
      image: driver.image,
      nationality: driver.nationality,
      dob: driver.dob,
      teams: stringAllTeams(driver.Teams),
      created: driver.created,
    };
  }
  const rawArray = (await axios.get(`http://localhost:5000/drivers`)).data;
  const driversId = cleanArrayApi(rawArray);
  const driverId = driversId.filter((dog) => dog.id === Number(id));
  return driverId[0];
};

const createDriverDb = async (
  name,
  surname,
  description,
  image,
  nationality,
  dob,
  teamId
) => {
  const newDriver = await Drivers.create({
    name,
    surname,
    description,
    image,
    nationality,
    dob,
  });

  await newDriver.setTeams(teamId);

  return newDriver;
};

module.exports = {
  getAllDrivers,
  getDriverByName,
  getDriverById,
  createDriverDb,
};
