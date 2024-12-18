const express = require('express');
const bodyParser = require('body-parser');
const paymentController = require('./controllers/paymentController');

const app = express();
app.use(bodyParser.json());

app.post('/process-payment', paymentController.processPayment);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running`);
});
