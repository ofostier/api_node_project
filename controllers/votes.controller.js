const db = require("../models");
const Vote = db.votes;
const Op = db.Sequelize.Op;
const Fn = db.Sequelize.fn;
const Col = db.Sequelize.col;

console.log("Get Controller votes.");
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.roti || !req.body.user) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Vote
    const vote = {
        roti: req.body.roti,
        user: req.body.user,
        rating: req.body.rating,
        comment: req.body.comment,
        published: req.body.published ? req.body.published : false
    };

    // Save Vote in the database
    Vote.create(vote)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Vote."
            });
        });
};

// Retrieve all Vote from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    console.log("Route Votes FindAll.");

    Vote.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving votes"         });
        });
};

exports.findAndCountAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    console.log("Route Votes FindAll COUNT.");

    Vote.findAndCountAll({ where: condition })
        .then(data => {
            console.log(data.count);
            console.log(data.rows);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving votes"         });
        });
};

// Retrieve all Vote from the database.
exports.countVotes = (req, res) => {
    const id = req.params.id;
    //var condition = id ? { roti: { [Op.equal]: `%${id}%` } } : null;
    var condition = id ? { roti: { [Op.eq]: `${id}` } } : null;

    console.log("Route count Votes > " + id);


    Vote.findAll(
        {
            attributes: ['roti', [Fn('COUNT', Col('roti')), 'nb_votes'], [Fn('sum', Col('rating')), 'total'],[Fn('AVG', Col('rating')), 'average']], where: condition
        }
        )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving votes"         });
        });
};

// Find a single Vote with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    console.log("Route FindOne.");

    Tutorial.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};

// Update a Vote by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    console.log("Route Update.");

    Tutorial.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};

// Delete a Vote with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    console.log("Route Delete One.");

    Tutorial.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};

// Delete all Vote from the database.
exports.deleteAll = (req, res) => {

    console.log("Route DeleteAll.");

    Tutorial.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
};

// Find all published Vote
exports.findAllPublished = (req, res) => {

    console.log("Route findAllPublished.");

    Tutorial.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

