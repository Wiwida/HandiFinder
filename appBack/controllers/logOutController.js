const logOutController = {
    // On deconnecte l'user (on lui 'enleve' les cookies)
    makeLogOut: async (req, res) => {

        //on test les infos du user dans la session
        req.session.user = false;

        res.json(userLogOut);
    }
};


module.exports = logOutController;