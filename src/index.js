const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();


const instagramRoute = require('./routes/instagram');


dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('DB Connect'))
.catch((e) => console.log(e));

mongoose.Promise = global.Promise;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/instagram', instagramRoute);

app.listen(3333, () => {
    console.log('Backend is running')
});