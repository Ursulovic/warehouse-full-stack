const { sequelize, Driver } = require('../models')

const getPage = function (req, res) {
    Driver.findAll({offset: (req.params.page -1)*10, limit: req.params.page * 10})
        .then(rows => {

            return res.json({rows})})
        .catch(err => res.status(500).json(err));
}


const createNew = function (req, res) {
    if (req.user.type === 'ADMIN' || req.user.type === 'MODERATOR') {

        Driver.create({
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age,
            salary: req.body.salary,
            role: req.body.salary
        })
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err))
    }
    else res.status(403).json('Not authorized');
}

const edit = function (req, res) {
    if (req.user.type === 'ADMIN' || req.user.type === 'MODERATOR') {

        Driver.update(req.body, { where: { id: req.params.id } })
            .then(driver => 'Driver with id' + driver + ' update successfuly')
            .catch(err => res.status(500).json(err))
    }
    else res.status(403).json('Not authorized');
}

const remove = function (req, res) {
    if (req.user.type === 'ADMIN' || req.user.type === 'MODERATOR') {

        Driver.findOne({ where: req.params.id })
            .then(driver => {
                driver.destroy()
                    .then(res.json('Driver ' + driver.name + ' ' + driver.surname + ' deleted succesfully'))
                    .catch(err => res.status(500).json(err))
            })
    }
    else res.status(403).json('Not authorized');

}



module.exports = {
    getPage,
    createNew,
    edit,
    remove

}
