const env = process.env.NODE_ENV;
console.log(env);
const entitiesPath =
  env === "production"
    ? "build/models/entity/**/*.js"
    : "src/models/entity/**/*.ts";

module.exports = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "19981020",
  database: "template",
  synchronize: true,
  logging: false,
  entities: [entitiesPath],
  migrations: ["src/models/migration/**/*.ts"],
  subscribers: ["src/models/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/models/entity",
    migrationsDir: "src/models/migration",
    subscribersDir: "src/models/subscriber",
  },
};
