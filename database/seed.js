require("dotenv").config()
const faker = require("faker")
require("./connect")
const EventModel = require("./models/event_model")

const eventPromises = []
for(let i = 0; i < 10; i++) {
  eventPromises.push(EventModel.create({
    title: faker.company.companyName(),
    description: faker.lorem.paragraph(),
    date: faker.date.recent()
  }))
}

Promise.all(eventPromises)
  .then(events => {
    console.log(`Seeds file successful, created ${events.length} products`)
  })
  .catch(err => console.log(`Seeds file had an error: ${err}`))
  .finally(() => mongoose.disconnect())