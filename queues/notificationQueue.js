const amqp = require('amqplib');

const QUEUE_NAME = 'notificationQueue';

const sendToQueue = async (notificationData) => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(notificationData)));

    console.log(`Sent to ${QUEUE_NAME}:`, notificationData.user);
    setTimeout(() => connection.close(), 500);
};

module.exports = { sendToQueue };
