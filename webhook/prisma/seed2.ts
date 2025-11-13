import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();


// this code credit goes to gemeni Ai

async function main() {
    console.log("Starting seeder...");

    // 1. Clean the database (optional, but good for repeatable seeds)
    // Delete in reverse order of dependencies
    console.log("Cleaning existing data...");
    await prismaClient.action.deleteMany();
    await prismaClient.trigger.deleteMany();
    await prismaClient.zapRunOutbox.deleteMany();
    await prismaClient.zapRun.deleteMany();
    await prismaClient.zap.deleteMany();
    await prismaClient.user.deleteMany();
    await prismaClient.availableAction.deleteMany();
    await prismaClient.availableTrigger.deleteMany();
    console.log("Data cleaned.");

    // 2. Create Available Triggers & Actions (from your seeder)
    console.log("Creating Available Triggers and Actions...");
    await prismaClient.availableTrigger.create({
        data: {
            id: "webhook",
            name: "Webhook",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIovxkR9l-OlwpjTXV1B4YNh0W_s618ijxAQ&s",
        }
    });

    await prismaClient.availableAction.create({
        data: {
            id: "send-sol",
            name: "Send Solana",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT10458YI0Lf1-Zx4fGwhWxI_x4oPCD034xaw&s"
        }
    });

    await prismaClient.availableAction.create({
        data: {
            id: "email",
            name: "Send Email",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nd82eFk5SaBPRIeCpmwL7A4YSokA-kXSmw&s"
        }
    });
    console.log("Available Triggers and Actions created.");

    // 3. Create User 1 and their Zap (Webhook -> Send SOL)
    console.log("Creating User 1 (Alice) and Zap 1...");
    const alice = await prismaClient.user.create({
        data: {
            name: "Alice",
            email: "alice@example.com",
            password: "password123", // Remember to hash passwords in a real app
        }
    });

    await prismaClient.zap.create({
        data: {
            // This is the AvailableTrigger ID.
            // Your schema has this field, so we'll populate it.
            triggerId: "webhook", 
            userId: alice.id,
            // We use a nested create to create the related Trigger and Action
            // records at the same time. Prisma handles linking them.
            trigger: {
                create: {
                    // This links to the AvailableTrigger
                    triggerId: "webhook", 
                    metadata: { "description": "Catches webhooks for Alice's SOL send" }
                }
            },
            actions: {
                create: [
                    {
                        // This links to the AvailableAction
                        actionId: "send-sol", 
                        sortingOrder: 0,
                        metadata: { 
                            "amount": "0.1", 
                            "recipientAddress": "ALICE_WALLET_ADDRESS_HERE" 
                        }
                    }
                ]
            }
        }
    });
    console.log("User 1 and Zap 1 created.");

    // 4. Create User 2 and their Zap (Webhook -> Send Email)
    console.log("Creating User 2 (Bob) and Zap 2...");
    const bob = await prismaClient.user.create({
        data: {
            name: "Bob",
            email: "bob@example.com",
            password: "password456", // Remember to hash passwords in a real app
        }
    });

    await prismaClient.zap.create({
        data: {
            triggerId: "webhook",
            userId: bob.id,
            trigger: {
                create: {
                    triggerId: "webhook",
                    metadata: { "description": "Catches webhooks for Bob's email alert" }
                }
            },
            actions: {
                create: [
                    {
                        actionId: "email",
                        sortingOrder: 0,
                        metadata: {
                            "to": "bob-alerts@example.com",
                            "subject": "Webhook Received!",
                            "body": "The webhook was triggered with data: {{trigger.body}}"
                        }
                    }
                ]
            }
        }
    });
    console.log("User 2 and Zap 2 created.");
    console.log("Seeding complete!");
}

main()
    .catch((e) => {
        console.error("Error during seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prismaClient.$disconnect();
    });