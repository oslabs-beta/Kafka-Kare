const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-consumer",
  brokers: ["localhost:9093"],
});

const topic = "test-topic";
const consumer = kafka.consumer({ groupId: "test-group" });

const consumeMessages = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

consumeMessages().catch((error) => {
  console.error("Error in consumer script", error);
});
