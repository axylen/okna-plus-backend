const useConnection = connection => (query, ...values) =>
  new Promise(function(resolve, reject) {
    connection.query(query, ...values, (error, results) => {
      if (error) reject(error);
      else resolve(results);
    });
  });

module.exports = useConnection;
