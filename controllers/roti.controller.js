const db = require("../models");
const Roti = db.roti;
const Op = db.Sequelize.Op;

console.log("Get Controller Roti.");
// Create and Save a new Roti
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Roti
    const roti = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Create Roti in the database
    Roti.create(roti)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Roti."
            });
        });
};

// Retrieve all Roti from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    console.log("Route FindAll.");

    Roti.findAll({ where: condition })
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

// Find a single Roti with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    console.log("Route FindOne.");

    Roti.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};

// Update a Roti by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    console.log("Route Update.");

    Roti.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Roti was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Roti with id=${id}. Maybe Roti was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Roti with id=" + id
            });
        });
};

// Delete a Roti with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    console.log("Route Delete One.");

    Roti.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Roti was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Roti with id=" + id
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

    console.log("Route DeleteAll.");

    Roti.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Roti were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Roti."
            });
        });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

    console.log("Route findAllPublished.");

    Roti.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Roti."
            });
        });
};

