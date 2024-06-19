require('dotenv').config({path: __dirname +'/.env'});
// const telegrambot   = require('./bot/tg')
const express       = require('express');
const mongoose      = require('mongoose');
const cors          = require('cors');
const router        = require('./routes/index');
const fileUpload    = require('express-fileupload')
const path          = require('path')
// const https         = require('https')
// const fs 		  = require('fs')
const errorHandler  = require('./middleware/ErrorHandlingMiddleware');

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api',express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router);

app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).json({message: 'Server Working'})
});

const start = async () => {
    try{
       await mongoose.connect(process.env.MONGODB_URL);
    //    const sslServer = https.createServer(
    //         {
    //         key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    //         cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    //         },
    //         app
    //     )

    //     sslServer.listen(PORT, () => console.log(`Secure Server started port on ${PORT}`))
       app.listen(PORT, () => {console.log(`Server started port on ${PORT}`)});
    }catch(e){
        console.log(e);
    }
}

start();