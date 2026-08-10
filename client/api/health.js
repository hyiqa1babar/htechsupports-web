module.exports = (req, res) => {
  return res.status(200).json({ status: 'ok', service: 'HTechSupports API Server (serverless)', timestamp: new Date().toISOString() });
};
