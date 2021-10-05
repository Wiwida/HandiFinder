require('dotenv').config();

const express = require('express');

const session = require('express-session');
// Initialisation ou réactualisation pour savoir si l'user à des cookies
// const userSessionMW = require('./app/middlewares/sessionUserMW');

const app = express();

const PORT = process.env.PORT || 3000;

const router = require('./app/router');

const cors = require('cors');
// Cookies
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'Guess it !',
    cookie: {
        secure: false,
        maxAge: 1000*60*60*2 // 2 heures
    }
}));

app.use(cors({
    origin: ['localhost', 'null']
}));


//pour avoir notre application dans un seul dossier, on va faire en sorte qu'express puisse nous "servir" index.html comme une ressource statique
app.use(express.static('./public'));

app.use(userSessionMW);

app.use(express.urlencoded({extended: true}));

//on ajoute ce middleware pour "transformer" les infos d'un formData en propriétés de request.body
const multer = require('multer');
const upload = multer()
app.use(upload.none());

app.use(router);


app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});