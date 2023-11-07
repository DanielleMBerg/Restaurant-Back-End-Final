const { parse } = require("pg-connection-string");

module.exports = ({ env }) => {
  const { host, port, database, user, password } = parse(env("postgres://restaurant_app_backend_user:OwvRRfc7LRpfHYRtFKpj95bgAkMXRYpv@dpg-cl4qckc72pts739l0bn0-a/restaurant_app_backend"));

  return {
    connection: {
      client: "postgres",
      connection: {
        host,
        port,
        database,
        user,
        password
      },
      debug: false,
    },
  };
};
