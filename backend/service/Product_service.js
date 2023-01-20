const { sequelize, Product } = require('../models')

const getPage = function (req, res) {
    Product.findAll({ offset: (req.params.page - 1) * 10, limit: req.params.page * 10 })
        .then(rows => {
            return res.json({ rows })
        })
        .catch(err => res.status(500).json(err))
}


//get page for certain category
const getPageCategory = function (req, res) {
    Product.findAndCountAll({ where: {category_id: req.params.id},
        offset: (req.query.page - 1) * 10,
        limit: req.query.page * 10
    }).then(resp => res.json(resp))

}

//crud
const createNew = function (req, res) {
    if (req.user.type === 'ADMIN' || req.user.type === 'MODERATOR') {

        Product.create({
            category_id: req.body.category_id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            expire_date: req.body.expire_date
        })
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err))

    }
    else res.status(403).json('Not authorized');
}

const edit = function (req, res) {
    if (req.user.type === 'ADMIN' || req.user.type === 'MODERATOR') {

        Product.update(req.body, { where: { id: req.params.id } })
            .then(product => res.json(stat))
            .catch(err => res.status(500).json(err))
    }
    else res.status(403).json('Not authorized');

}

const remove = function (req, res) {
    if (req.user.type === 'ADMIN' || req.user.type === 'MODERATOR') {

        Product.findOne({ where: { id: req.params.id } })
            .then(product => {
                product.destroy()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json(err))
            })
    }
    else res.status(403).json('Not authorized');

}



module.exports = {
    getPage,
    createNew,
    edit,
    remove,
    getPageCategory

}



