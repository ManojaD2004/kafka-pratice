const { Kafka, logLevel } = require("kafkajs");

async function main() {
  const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
    logLevel: logLevel.INFO,
  });

  const consumer = kafka.consumer({ groupId: "test-group2" });

  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        key: message.key.toString(),
        value: message.value.toString(),
        topic,
        partition,
      });
    },
  });
}
main();
