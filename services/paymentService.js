const amqp = require('amqplib');
const notificationQueue = require('../queues/notificationQueue');

const QUEUE_NAME = 'paymentQueue';

const processPayments = async () => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log(`Waiting ${QUEUE_NAME}...`);

    channel.consume(QUEUE_NAME, async (msg) => {
        if (msg) {
            const paymentData = JSON.parse(msg.content.toString());
            console.log('Processing payment:', paymentData);


            setTimeout(() => {
                console.log('Payment processed:', paymentData);


                notificationQueue.sendToQueue({
                    user: paymentData.user,
                    message: 'Your payment has been successful.',
                });

                channel.ack(msg);
            }, 2000);
        }
    });
};

processPayments();
