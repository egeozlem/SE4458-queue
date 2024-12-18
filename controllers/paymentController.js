const paymentQueue = require('../queues/paymentQueue');

exports.processPayment = async (req, res) => {
    const { user, paymentType, cardNo } = req.body;

    if (!user || !paymentType || !cardNo) {
        return res.status(400).json({ error: 'Invalid' });
    }

    try {
        await paymentQueue.sendToQueue({ user, paymentType, cardNo });
        res.status(200).json({ message: 'Payment request sent to queue' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process payment' });
    }
};
