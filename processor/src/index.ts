import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

dotenv.config();

const TOPIC_NAME = 'test-topic'


const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
})

const client = new PrismaClient();


const main = async () => {

    const producer = kafka.producer()
    await producer.connect()



    while (true) {
        const pendingRows = await client.zapRunOutbox.findMany({
            where: {},
            take: 10,
        });

        if (pendingRows.length === 0) {
            await new Promise((r) => setTimeout(r, 1000)); // wait 1s before next poll
            continue;
        }

        console.log("Pending rows:", pendingRows);

        await producer.send({
            topic: TOPIC_NAME,
            messages: pendingRows.map((row: any) => ({
                value: row.zapRunId,
            })),
        });

        await client.zapRunOutbox.deleteMany({
            where: {
                id: { in: pendingRows.map((r: any) => r.id) },
            },
        });
    }

}
main()