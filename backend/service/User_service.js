const { sequelize, User } = require('../models');

const getPage = function (req, res) {
    if (req.user.type === 'ADMIN') {
        User.findAndCountAll({ offset: (req.params.page - 1) * 10, limit: 10 })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err))
    }
    else {
        res.status(403).json('Not autorized');
    }
}

const edit = function (req, res) {
    if (req.user.type === 'ADMIN') {


        User.update(req.body, { where: { id: req.params.id } })
            .then(user => { console.log(req.body); return res.json({ status: user[0] }) })
            .catch(err => res.status(500).json(err))
    }
    else res.status(403).json('Not authorized');

}
const remove = function (req, res) {
    if (req.user.type === 'ADMIN') {

        User.destroy({ where: { id: req.params.id } })
            .then(user => res.json({ user }))
            .catch(err => res.status(500).json(err));
    }
    else res.status(403).json('Not authorized');

}


module.exports = {
    getPage,
    edit,
    remove

}



