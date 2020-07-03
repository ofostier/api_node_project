module.exports = (sequelize, Sequelize) => {
    const Vote = sequelize.define("votes", {
        roti: {
            type: Sequelize.UUID
        },
        user: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.INTEGER
        },
        comment: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    }, {
        indexes:[
            {
                name: 'roti_user_idx',
                unique: true,
                fields: ['roti', 'user']
            }
        ]

        }

    );

    return Vote;
};
