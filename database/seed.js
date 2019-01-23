require("dotenv").config()
const faker = require("faker")
const mongoose = require("mongoose")
require("./connect")
const EventModel = require("./models/event_model")
const ChapterModel = require("../database/models/chapter_model")
const ResourceModel = require("../database/models/resource_model");

async function createResources() {
  for (let i = 0; i < 10; i++) {
    allPromises.push(ResourceModel.create({
      title: faker.lorem.sentence(),
      description: faker.lorem.text(),
      link: faker.internet.url()
    }));
  }
}

const allPromises = [];

allPromises.push(ChapterModel.create({
  city: "Sydney"
}))
allPromises.push(ChapterModel.create({
  city: "Melbourne"
}))
allPromises.push(ChapterModel.create({
  city: "Brisbane"
}))
allPromises.push(ChapterModel.create({
  city: "Perth"
}))

async function createEvents(city){
  const chapter = await ChapterModel.findOne({city: city})
  for(let i = 0; i < 10; i++) {
    eventPromises.push(EventModel.create({
      image: faker.image.imageUrl(),
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

  await createResources();

  Promise.all(allPromises)
    .then(entries => {
      console.log(`Seeds file successful, created ${entries.length} entries.`)
    })
    .then(() => mongoose.disconnect())
    .catch(err => console.log(`Seeds file had an error: ${err}`))
}

runSeed()