const express = require('express');
const router = express.Router();
const signController = require('./controllers/signinController');
const loginController = require('./controllers/loginController');
const logOutController = require('./controllers/logOutController');


router.post('/connexion', loginController.checkPasswordForEnter);

router.post('/enregistrement', signController.enterInformations);

router.get('/logout', logOutController.makeLogOut);

//middleware de fin de chaine pour indiquer à l'utilisateur qu'on n'a pas trouvé la ressource qu'il demandait

router.use((request, response) => {
    response.status(404).json({error: 'Ressource non trouvée'});
});

module.exports = router;