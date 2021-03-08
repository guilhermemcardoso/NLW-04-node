module.exports = {
    "type": "sqlite",
    "database": __dirname + "/src/database/database.sqlite",
    "entities": [__dirname + "/src/models/**.ts"],
    "migrations": [__dirname + "/src/database/migrations/**.ts"],
    "logging": false,
    "cli": {
        "migrationsDir": __dirname + "/src/database/migrations"
    }
}