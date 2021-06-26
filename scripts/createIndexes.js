db.subscription.createIndex({ newsletterId: 1 })
db.subscription.createIndex({ email: 1 }, { unique: true })
