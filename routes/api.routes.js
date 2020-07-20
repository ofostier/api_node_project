module.exports = app => {
    const roti = require("../controllers/roti.controller.js");
    const votes = require("../controllers/votes.controller.js");

    var router = require("express").Router();

    console.log("GET ROUTE FILE JSX");
    ///////////////////////////////////////
    // ROUTES ROTI
    ///////////////////////////////////////
    // Create a new Roti
    router.post("/roti", roti.create);

    // Retrieve all Roti
    router.get("/rotis", roti.findAll);

    // Retrieve all published Roti
    router.get("/published", roti.findAllPublished);

    // Retrieve a single Roti with id
    router.get("/roti/:id", roti.findOne);

    // Update a Roti with id
    router.put("/roti/:id", roti.update);

    // Delete a Roti with id
    router.delete("/:id", roti.delete);

    // Delete All Roti
    router.delete("/", roti.deleteAll);

    ///////////////////////////////////////
    // ROUTE VOTES
    ///////////////////////////////////////
    // Create a new vote
    router.post("/vote", votes.create);

    // List all votes
    router.get("/votes", votes.findAll);
    // Count all votes for a ROTI ID
    router.get("/votes/stat/:id", votes.countVotes);
    router.get("/rotiti/:roti", roti.findOne);

    ///////////////////////////////////////

    app.use('/api', router);
};
