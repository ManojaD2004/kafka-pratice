const { Kafka, logLevel, CompressionTypes } = require("kafkajs");

async function main() {
  const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:29092", "localhost:39092", "localhost:49092"],
    logLevel: logLevel.INFO,
  });

  const producer = kafka.producer({ allowAutoTopicCreation: false });
  await producer.connect();
  await producer.send({
    topic: "test-topic",
    compression: CompressionTypes.GZIP,
    messages: [
      { key: "key1", value: "hello world", partition: 0 },
      { key: "key2", value: "hey hey!", partition: 1 },
      { key: "key1", value: "hello world", partition: 2 },
      { key: "key2", value: "hey hey!", partition: 3 },
      { key: "key1", value: "hello world", partition: 4 },
      { key: "key2", value: "hey hey!", partition: 5 },
      { key: "key1", value: "hello world", partition: 6 },
      { key: "key2", value: "hey hey!", partition: 7 },
    ],
  });

  await producer.disconnect();
}
main();
