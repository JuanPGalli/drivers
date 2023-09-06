const cleanArrayApi = (arr) =>
  arr.map((elem) => {
    return {
      id: elem.id,
      name: elem.name.forename,
      surname: elem.name.surname,
      description: elem.description,
      image: elem.image.url ? elem.image.url : "defaultImage.jpg",
      nationality: elem.nationality,
      dob: elem.dob,
      teams: elem.teams,
      created: false,
    };
  });

const cleanArrayDB = (arr) =>
  arr.map((elem) => {
    return {
      id: elem.id,
      name: elem.name,
      surname: elem.surname,
      description: elem.description,
      image: elem.image,
      nationality: elem.nationality,
      dob: elem.dob,
      teams: stringAllTeams(elem.Teams),
      created: elem.created,
    };
  });

const stringAllTeams = (Teams) => {
  const teamsNames = Teams.map((team) => team.name);
  return teamsNames.join(", ");
};

module.exports = {
  cleanArrayApi,
  cleanArrayDB,
  stringAllTeams,
};
