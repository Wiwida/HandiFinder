const {User, Role} = require('../models');
// Cryptage du mdp 
const bcrypt = require('bcrypt');
// Outil qui nous aide dans la gestion en back des email (double validation front et back)
const validator = require('email-validator');

const signinController = {

    enterInformations: async (req, res, next) => {
        // On récupère les infos de l'utilisateur qui veux s'enregistrer
        const email = req.body.email1;
        const password = req.body.password1;
        const password2 = req.body.password2;
        const pseudonyme = req.body.pseudo1;

        if (validator.validate(email) === false) {
            res.status(500).json("Champ email invalide ou utilisé et/ou pseudonyme déjà utilisé");
        };

        try {
            const emailInDb = await User.findOne({ where: {email: `${email}`}});
            const pseudoInDb = await User.findOne({ where: {pseudonyme: `${pseudonyme}`}});

            if (emailInDb === null && pseudoInDb === null && password.length >= 8 && password === password2) {

                const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

                const newUser = new User({
                    email: email,
                    password: hash,
                    pseudonyme: pseudonyme,
                });

                const result = await newUser.save();

                // Maintenant on attribue au nouvel utilisateur un role
                
                const user = await User.findOne({ where: {email: `${email}`}});
                const role = await Role.findByPk(2);

                if (user && role) {

                    await user.addUser(role);

                    const userEdit = await user.reload({
                        include: 'users'
                    });

                    res.json(userEdit); 
                };

            } else {
                
                res.status(500).json("Pseudonyme/email déjà utilisé et/ou mot de passe inférieur à 8 caractères");
            };

        } catch (error) {
            console.error(error);
            res.status(500).json({error: error.message});
        };
    },

};

module.exports = signinController;