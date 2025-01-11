const { Kafka, logLevel } = require("kafkajs");

async function main() {
  const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:29092", "localhost:39092", "localhost:49092"],
    logLevel: logLevel.INFO,
  });

  const consumer = kafka.consumer({ groupId: "test-some" });

  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  await consumer.run({
    partitionsConsumedConcurrently: 3,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        key: message.key ? message.key.toString() : null,
        value: message.value ? message.value.toString() : null,
        topic,
        partition,
      });
    },
  });
}
main();
