"use strict";
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          username: "admin",
          password: bcrypt.hashSync(
            process.env.ADMIN_PASSWORD,
            bcrypt.genSaltSync(8)
          ),
          firstName: "Admin",
          lastName: "User",
          admin: true,
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
