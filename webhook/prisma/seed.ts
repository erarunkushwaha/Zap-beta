import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();

// this code credit goes to claude Ai

async function main() {
    // Clear existing data (optional - comment out if you want to keep existing data)
    await prismaClient.zapRunOutbox.deleteMany({});
    await prismaClient.zapRun.deleteMany({});
    await prismaClient.action.deleteMany({});
    await prismaClient.trigger.deleteMany({});
    await prismaClient.zap.deleteMany({});
    await prismaClient.user.deleteMany({});
    await prismaClient.availableAction.deleteMany({});
    await prismaClient.availableTrigger.deleteMany({});

    console.log("Cleared existing data...");

    // Create Available Triggers
    const webhookTrigger = await prismaClient.availableTrigger.create({
        data: {
            id: "webhook",
            name: "Webhook",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIovxkR9l-OlwpjTXV1B4YNh0W_s618ijxAQ&s",
        }
    });
    console.log("Created webhook trigger");

    // Create Available Actions
    const sendSolAction = await prismaClient.availableAction.create({
        data: {
            id: "send-sol",
            name: "Send Solana",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT10458YI0Lf1-Zx4fGwhWxI_x4oPCD034xaw&s"
        }
    });

    const emailAction = await prismaClient.availableAction.create({
        data: {
            id: "email",
            name: "Send Email",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nd82eFk5SaBPRIeCpmwL7A4YSokA-kXSmw&s"
        }
    });
    console.log("Created available actions");

    // Create Users
    const user1 = await prismaClient.user.create({
        data: {
            name: "John Doe",
            email: "john@example.com",
            password: "hashed_password_123" // In production, use proper password hashing
        }
    });

    const user2 = await prismaClient.user.create({
        data: {
            name: "Jane Smith",
            email: "jane@example.com",
            password: "hashed_password_456"
        }
    });
    console.log("Created users");

    // Create Zap 1 for User 1: Webhook -> Send Solana
    const zap1 = await prismaClient.zap.create({
        data: {
            triggerId: "webhook",
            userId: user1.id,
        }
    });

    await prismaClient.trigger.create({
        data: {
            zapId: zap1.id,
            triggerId: "webhook",
            metadata: {
                url: `https://hooks.zapier.com/${zap1.id}`
            }
        }
    });

    await prismaClient.action.create({
        data: {
            zapId: zap1.id,
            actionId: "send-sol",
            sortingOrder: 1,
            metadata: {
                amount: "0.1",
                address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
            }
        }
    });
    console.log(`Created Zap 1 for ${user1.name}: Webhook -> Send Solana`);

    // Create Zap 2 for User 1: Webhook -> Send Email -> Send Solana
    const zap2 = await prismaClient.zap.create({
        data: {
            triggerId: "webhook",
            userId: user1.id,
        }
    });

    await prismaClient.trigger.create({
        data: {
            zapId: zap2.id,
            triggerId: "webhook",
            metadata: {
                url: `https://hooks.zapier.com/${zap2.id}`
            }
        }
    });

    await prismaClient.action.create({
        data: {
            zapId: zap2.id,
            actionId: "email",
            sortingOrder: 1,
            metadata: {
                email: "notify@example.com",
                subject: "Payment Notification",
                body: "A payment has been triggered"
            }
        }
    });

    await prismaClient.action.create({
        data: {
            zapId: zap2.id,
            actionId: "send-sol",
            sortingOrder: 2,
            metadata: {
                amount: "0.5",
                address: "9xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
            }
        }
    });
    console.log(`Created Zap 2 for ${user1.name}: Webhook -> Send Email -> Send Solana`);

    // Create Zap 3 for User 2: Webhook -> Send Email
    const zap3 = await prismaClient.zap.create({
        data: {
            triggerId: "webhook",
            userId: user2.id,
        }
    });

    await prismaClient.trigger.create({
        data: {
            zapId: zap3.id,
            triggerId: "webhook",
            metadata: {
                url: `https://hooks.zapier.com/${zap3.id}`
            }
        }
    });

    await prismaClient.action.create({
        data: {
            zapId: zap3.id,
            actionId: "email",
            sortingOrder: 1,
            metadata: {
                email: "jane@example.com",
                subject: "Webhook Alert",
                body: "Your webhook has been triggered!"
            }
        }
    });
    console.log(`Created Zap 3 for ${user2.name}: Webhook -> Send Email`);

    console.log("\n✅ Seeding completed successfully!");
    console.log(`\nTest your webhook endpoint with:`);
    console.log(`POST http://localhost:3000/hooks/catch/${user1.id}/${zap1.id}`);
    console.log(`POST http://localhost:3000/hooks/catch/${user1.id}/${zap2.id}`);
    console.log(`POST http://localhost:3000/hooks/catch/${user2.id}/${zap3.id}`);
}

main()
    .catch((e) => {
        console.error("Error seeding database:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prismaClient.$disconnect();
    });