const { Comment } = require('../models/Comment');

async function getNewest() {
  return Comment.find().lean();
}

module.exports = {
    getNewest
};
