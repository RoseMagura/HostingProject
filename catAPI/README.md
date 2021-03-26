# CatAPI

## Set Up 

When running this API for the first time on a new machine,
you will want to 
* Run `npm install` to install the dependencies (or use the backend install command from the root folder)
* Set up the environmental variables
    Create an .env file with these variables: 
    * PORT (Can be anything you choose, like 8080, but shouldn't conflict with the frontend port)
    * PGUSER (Your postgres username, like postgres)
    * PGDATABASE (Pick whatever database name you like)
    * TEST_DATABASE
    * ADMIN_PASSWORD (This is needed for the Sequelize user seeder)
    * PRIVATE_KEY (This is needed for JWT authorization and token creation)
* Create the main database

    This can be done by running `npm run createDB` or `node_modules/.bin/sequelize db:create` in this directory.
    Development is the default environment, and will use the environmental variables you defined above.

* Create the test database

    This can be done by running `npm run createTestDB` or `node_modules/.bin/sequelize db:create --env=test` in this directory.
    In this command, you will specify the environment as test.

* Run the database migrations for the main database

    This can be done by running `npm run migrate` or `node_modules/.bin/sequelize db:migrate` in this directory.

* Run the database migrations for the test database

    This can be done by running `npm run test:migrate` or `node_modules/.bin/sequelize db:migrate --env=test` in this directory.

* Populate the main database

    This can be done by running `npm run seed` or `node_modules/.bin/sequelize db:seed:all` in this directory.

* Populate the test database 

    This can be done by running `npm run test:seed` or `node_modules/.bin/sequelize db:seed:all --env=test` in this directory.

Great! Now everything is all set to go.