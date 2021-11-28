import Server from "./services/server";
import Config from "./config/config";
import { Logger } from "./services/logger";
import os, { version } from "os";
import cluster from "cluster";
import minimist from 'minimist';
import { TestHttpWithAxios } from "./http/client";

const optionalObject = {
  alias: {
    h: 'help',
    v: 'version',
  },
  default: {
    port: '8081',
  }
}

const ARGS_PORT = minimist(process.argv, optionalObject)

const NUM_CPUs = os.cpus().length;
const CLUSTER_MODE = false;

if (CLUSTER_MODE) {
  if (cluster.isMaster) {
    console.log(`NUMERO DE CPUS ===> ${NUM_CPUs}`);
    console.log(`PID MASTER ${process.pid}`);

    for (let i = 0; i < NUM_CPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker) => {
      console.log(`Worker ${worker.process.pid} died at ${Date()}`);
      cluster.fork();
    });
  } else {
    init();
  }
} else {
  init();
}

async function init() {
  const PORT = ARGS_PORT;
  const server = Server.listen(PORT, () => {
    Logger.info(`Server up in port ${PORT} - PID WORKER ${process.pid}`);


  server.on("error", (error) => Logger.error(`Server error: ${error}`));
  })

    /* .then(
      TestHttpWithAxios
    ); */
}

