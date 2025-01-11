const { Kafka, logLevel } = require("kafkajs");

async function main() {
  const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:29092", "localhost:39092", "localhost:49092"],
    logLevel: logLevel.INFO,
  });

  const admin = kafka.admin();
  await admin.connect();
  console.log(await admin.describeCluster());
  await admin.disconnect();
}
main();
