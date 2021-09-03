// Update with your config settings.

export default {

  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "productos",
    },
    migrations: { directory: __dirname + "/db/migrations" },
    seeds: { directory: __dirname + "/db/seeds" },
  },
};
 