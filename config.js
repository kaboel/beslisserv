module.exports = {
  name: 'beslisser',
  port: process.env.PORT || 4400,
  dbUri: `mongodb+srv://beslisser:dcHBgQSfnlE9gA0W@kluster-0-co84f.mongodb.net/beslisser?retryWrites=true&w=majority`,
  secret: `beslissecret`
}
