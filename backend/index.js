const express = require("express")
const database = require("./src/databsae/db.config")
require('dotenv').config();
const app=express();
const cors = require("cors")
app.use(cors())
app.use(express.urlencoded({ extended: true}) );
app.use(express.json());
database.mongoose.connect(database.url, {})
    .then(() => {
        console.log("connected to database")
    })
    .catch(err => {
        console.log(err)
    })
app.get('/', (req, res)=>{
    res.send({message: 'Hello, Word!'}) ;
})
app.use('/uploads', express.static('uploads'));
require('./src/api/routes/routes')(app)

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur prêt sur le port ${PORT}`);
});