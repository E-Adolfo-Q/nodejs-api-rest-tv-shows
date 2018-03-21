module.exports = {
  port: process.env.PORT || 8010,
  db: process.env.MONGODB_URI || 'mongodb://localhost/shows',
}