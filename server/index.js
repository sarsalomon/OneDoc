require('dotenv').config({path: __dirname +'/.env'});
const express       = require('express');
const mongoose      = require('mongoose');
const cors          = require('cors');
const router        = require('./routes/index');
const fileUpload    = require('express-fileupload')
const path          = require('path')
const errorHandler  = require('./middleware/ErrorHandlingMiddleware');

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'data')))
app.use(fileUpload({}))
app.use('/api', router);

app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).json({message: 'Server Working'})
});

const start = async () => {
    try{
       await mongoose.connect(process.env.MONGODB_URL);
       app.listen(PORT, () => {console.log(`Server started port on ${PORT}`)});
    }catch(e){
        console.log(e);
    }
}

start();