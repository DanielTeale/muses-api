require("dotenv").config()
const faker = require("faker")
const mongoose = require("mongoose")
require("./connect")
const EventModel = require("./models/event_model")
const ChapterModel = require("../database/models/chapter_model")

const eventPromises = []

eventPromises.push(ChapterModel.create({
  city: "Sydney"
}))
eventPromises.push(ChapterModel.create({
  city: "Melbourne"
}))
eventPromises.push(ChapterModel.create({
  city: "Brisbane"
}))
eventPromises.push(ChapterModel.create({
  city: "Perth"
}))

async function createEvents(city){
  const chapter = await ChapterModel.findOne({city: city})
  for(let i = 0; i < 10; i++) {
    eventPromises.push(EventModel.create({
      title: faker.company.companyName(),
      description: faker.lorem.paragraph(),
      date: faker.date.between('2015-01-01', '2019-12-31'),
      location: faker.address.streetAddress(),
      sponsors: [],
      chapter: chapter._id,
      approved: true,
      type: "Workshop"
    }))
  }
};


async function runSeed() {

  await createEvents("Sydney");
  await createEvents("Melbourne");
  await createEvents("Brisbane");
  await createEvents("Perth");

  Promise.all(eventPromises)
    .then(events => {
      console.log(`Seeds file successful, created ${events.length} events`)
    })
    .then(() => mongoose.disconnect())
    .catch(err => console.log(`Seeds file had an error: ${err}`))
}

runSeed()