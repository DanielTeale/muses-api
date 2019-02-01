require("dotenv").config()
const faker = require("faker");
const mongoose = require("mongoose");
require("./connect");
const EventModel = require("./models/event_model");
const ChapterModel = require("../database/models/chapter_model");
const SponsorModel = require("./models/sponsor_model");
const ResourceModel = require("../database/models/resource_model");
const UserModel = require("../database/models/user_model");

const allPromises = []

async function createUsers(city) {
  const chapter = await ChapterModel.findOne({ city: city });
  for (let i = 0; i < 50; i++) {
    allPromises.push(UserModel.create({
      email: faker.internet.email(),
      name: faker.name.findName(),
      chapter: chapter._id,
    }));
  }
}

async function createResources() {
  for (let i = 0; i < 10; i++) {
    allPromises.push(ResourceModel.create({
      title: faker.lorem.sentence(),
      description: faker.lorem.text(),
      link: faker.internet.url()
    }));
  }
}

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

async function createEvents(city) {
  const chapter = await ChapterModel.findOne({ city: city })
  const sponsors = await SponsorModel.find()
  for (let i = 0; i < 10; i++) {
    const sponsor = sponsors[Math.floor(Math.random() * 10)]
    allPromises.push(EventModel.create({
      image: 'http://lorempixel.com/640/480/',
      title: faker.company.companyName(),
      description: faker.lorem.paragraph(),
      date: faker.date.between('2015-01-01', '2019-12-31'),
      start_time: "18:00",
      end_time: "21:00",
      location: faker.address.streetAddress(),
      sponsors: [sponsor._id],
      chapter: chapter._id,
      approved: true,
      type: "Workshop"
    }))
  }
};

async function createSponsors() {
  for (let i = 0; i < 10; i++) {
    allPromises.push(SponsorModel.create({
      name: faker.company.companyName(),
      description: faker.lorem.paragraph(),
      website: faker.internet.url(),
      image: faker.image.imageUrl()
    }))
  }
}

async function runSeed() {

  await createSponsors()

  await createResources()

  await createUsers("Sydney");
  await createUsers("Melbourne");
  await createUsers("Brisbane");
  await createUsers("Perth");


  await createEvents("Sydney");
  await createEvents("Melbourne");
  await createEvents("Brisbane");
  await createEvents("Perth");
  await createSponsors()

  Promise.all(allPromises)
    .then(entries => {
      console.log(`Seeds file successful, created ${entries.length} entries`)
    })
    .then(() => mongoose.disconnect())
    .catch(err => console.log(`Seeds file had an error: ${err}`))
}

runSeed()