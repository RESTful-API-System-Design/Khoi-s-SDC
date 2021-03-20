const pool = require('./database_config.js');

const getReviewByID = (request, response) => {
  const productID = parseInt(request.params.id);
  pool.databaseConfig.query(`SELECT * FROM reviews WHERE product_id = $1`, [productID], (error, results) => {
    if(error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
}



module.exports.getReviewByID = getReviewByID;
