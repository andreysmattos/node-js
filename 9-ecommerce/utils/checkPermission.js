const {} = require("../Exceptions");

const checkPermission = (requestUser, resourceUser) => {
  console.log({ requestUser, resourceUser });

  console.log(typeof requestUser);
  console.log(typeof resourceUser);
};

module.exports = checkPermission;
