const {
  Kafka,
  logLevel,
  CompressionTypes,
  ConfigResourceTypes,
} = require("kafkajs");

async function main() {
  const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:29092", "localhost:39092", "localhost:49092"],
    logLevel: logLevel.INFO,
  });

  const admin = kafka.admin();
  await admin.connect();
    await admin.createTopics({
      topics: [{ topic: "test-topic", numPartitions: 8, replicationFactor: 3 }],
    });
  await admin.disconnect();
}
main();
