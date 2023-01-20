const { sequelize, Category } = require('../models');


//admin
const getPage = function (req, res) {
    if (req.user.type === 'ADMIN' || req.user.type === 'MODERATOR') {
        Category.findAndCountAll({ offset: (req.params.page - 1) * 10, limit: 10 })
            .then(rows => {
                console.log('AAAAAAAAAAAAAAAAAA');
                return res.json({ rows })
            })
            .catch(err => res.status(500).json(err));
    }
    else {
        res.status(403).json('Not authorized');

    }
}


//both
const getPageNumber = async function (req, res) {
    const count = await Category.count();


    return res.json({ count });

}



//user
const getNames = function (req, res) {
    Category.findAll({ attributes: ['name', 'id'], raw: true })
        .then(rows => {
            return res.json({ rows });
        }).catch(err => res.status(500).json(err));
}


//crud
const createNew = function (req, res) {
    console.log(req.user.type);
    if (req.user.type === 'ADMIN' || req.user.type === 'MODERATOR') {
        Category.create({
            name: req.body.name,
            description: req.body.description,
            avg_weight: req.body.avg_weight,
            avg_price: req.body.avg_price,
            tax: req.body.tax
        })
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err));
    }
    else res.status(403).json('Not authorized');
}

const edit = function (req, res) {
    if (req.user.type === 'ADMIN' || req.user.type === 'MODERATOR') {

        Category.update(req.body, { where: { id: req.params.id } })
            .then(rows => { console.log(req.params.id); return res.json({ status: rows[0] }) })
            .catch(err => res.status(500).json(err))
    }
    else res.status(403).json('Not authorized');
}

const remove = function (req, res) {
    if (req.user.type === 'ADMIN' || req.user.type === 'MODERATOR') {

        Category.destroy({ where: { id: req.params.id } })
            .then(status => res.json({ status }))
            .catch(err => res.status(500).json(err))

    }
    else res.status(403).json('Not authorized');

}




module.exports = {
    getPageNumber,
    getPage,
    createNew,
    edit,
    remove,
    getNames

}

