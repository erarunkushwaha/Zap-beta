import { Kafka } from "kafkajs";

const TOPIC_NAME = 'test-topic'


const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
})
const consumer = kafka.consumer({ groupId: 'worker' })

const main = async () => {

    // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic:TOPIC_NAME, fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })

}

main().catch(console.error);