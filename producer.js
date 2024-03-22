const { Kafka } = require("kafkajs");
const CHANCE_MESSAGE_SEND = 0.6;

const kafka = new Kafka({
  clientId: "my-producer",
  brokers: ["localhost:9093"],
});

const topic = "test-topic";
const producer = kafka.producer();

const produceMessages = async () => {
  await producer.connect();
  setInterval(async () => {
    try {
      if (Math.random() < CHANCE_MESSAGE_SEND) {
        const message = { value: `Message from producer at ${new Date().toISOString()}` };
        console.log(`Sending message: ${message.value}`);
        await producer.send({
          topic,
          messages: [message],
        });
      }
    } catch (error) {
      console.error("Error producing message", error);
    }
  }, 1000); // Send a message every second
};

produceMessages().catch((error) => {
  console.error("Error in producer script", error);
});
