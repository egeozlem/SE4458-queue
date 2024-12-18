const amqp = require('amqplib');

const QUEUE_NAME = 'notificationQueue';

const processNotifications = async () => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log(`Waiting ${QUEUE_NAME}...`);

    channel.consume(QUEUE_NAME, (msg) => {
        if (msg) {
            const notificationData = JSON.parse(msg.content.toString());
            console.log('email to:', notificationData.user);
            console.log('Message:', notificationData.message);

            // Simulate email sending
            setTimeout(() => {
                console.log('Email sent');
                channel.ack(msg);
            }, 1000);
        }
    });
};

processNotifications();
