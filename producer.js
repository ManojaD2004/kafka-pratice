const { Kafka, logLevel, CompressionTypes } = require("kafkajs");

async function main() {
  const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
    logLevel: logLevel.INFO,
  });

  const producer = kafka.producer();

  await producer.connect();
  await producer.send({
    topic: "test-topic",
    compression: CompressionTypes.GZIP,
    messages: [
      { key: "key1", value: "hello world" },
      { key: "key2", value: "hey hey!" },
    ],
  });

  await producer.disconnect();
}
main()
