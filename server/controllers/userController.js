
class userController {

    async getUser(req, res) {
        const { hashed_password, resetPasswordLink, ...userInfo } = req.profile._doc;
        res.status(200).json(userInfo);
    }
}

module.exports = new userController();
