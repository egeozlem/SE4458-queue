const amqp = require('amqplib');

const QUEUE_NAME = 'paymentQueue';

const sendToQueue = async (paymentData) => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(paymentData)));

    console.log(`Sent to ${QUEUE_NAME}:`, paymentData);
    setTimeout(() => connection.close(), 500);
};

module.exports = { sendToQueue };
