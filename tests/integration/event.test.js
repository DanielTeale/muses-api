require("dotenv").config()
const app = require("../../app");
const mongoose = require("../../database/connect");
const EventModel = require("../../database/models/event_model");
const UserModel = require("../../database/models/user_model")
const JWTService = require("../../services/jwt_service")
const supertest = require("supertest");

describe("Event Tests", () => {
  const event = {
    title: "blah",
    description: "blahblah",
    location: "blahblah",
    date: new Date(),
    start_time: "16:00",
    end_time: "18:00",
    chapter: "5c3ea87b65a8e0322798ba4e",
    type: "Workshop",
    approved: true
  }

  const user = {
    email: "test12345@test.com",
    name: "Test"
  }

  beforeAll(async () => {
      const newEvent = new EventModel(event)
      await newEvent.save()
      const newUser = new UserModel(user)
      await UserModel.register(newUser, "testing123")
      await newUser.save()
  })

  afterAll(async () => {
    await EventModel.deleteOne({title: event.title})
    await UserModel.deleteOne({ email: user.email })

    mongoose.disconnect()
  })

  test("/GET returns all events", async () => {
    const events = await EventModel.find()
    let response = await supertest(app)
      .get("/events")
      .expect(200)
    expect(response.text).toBeTruthy()
    expect(JSON.parse(response.text).length).toBe(events.length)
  })
  
  test("/POST creates event", async () => {
    const testUser = await UserModel.findOne({ email: user.email })
    const token = JWTService.generateToken(testUser)

    await EventModel.deleteOne({title: event.title})

    const events = await EventModel.find()


    let response = await supertest(app)
      .post("/events")
      .set("Authorization", `Bearer ${token}`)
      .field("title", event.title)
      .field("description", event.description)
      .field("location", event.location)
      .field("date", event.date.toString())
      .field("start_time", event.start_time)
      .field("end_time", event.end_time)
      .field("chapter", event.chapter)
      .field("type", event.type)
      .field("approved", event.approved)
      .expect(200)
    expect(JSON.parse(response.text).length).toBe(events.length + 1)
  })

  test("/POST with incorrect or no token responds with 401", async () => {
    
    let responseWithoutToken = await supertest(app)
      .post("/events")
      .field("title", event.title)
      .field("description", event.description)
      .field("location", event.location)
      .field("date", event.date.toString())
      .field("start_time", event.start_time)
      .field("end_time", event.end_time)
      .field("chapter", event.chapter)
      .field("type", event.type)
      .field("approved", event.approved)
      .expect(401)
    expect(responseWithoutToken.text).toEqual("Unauthorized")
    
    let responseWithBadToken = await supertest(app)
      .post("/events")
      .set("Authorization", "Bearer Token")
      .field("title", event.title)
      .field("description", event.description)
      .field("location", event.location)
      .field("date", event.date.toString())
      .field("start_time", event.start_time)
      .field("end_time", event.end_time)
      .field("chapter", event.chapter)
      .field("type", event.type)
      .field("approved", event.approved)
      .expect(401)
    expect(responseWithBadToken.text).toEqual("Unauthorized")
  })

  test("/PATCH updates event", async () => {
    const eventItem = await EventModel.findOne({title: event.title})
    
    const testUser = await UserModel.findOne({email: user.email})
    const token = await JWTService.generateToken(testUser)
    
    const newTitle = "Cool event"
    
    let response = await supertest(app)
      .patch(`/events/${eventItem._id}`)
      .set("Authorization", `Bearer ${token}`)
      .field("title", newTitle)
      .expect(200)
    expect((await EventModel.findOne({ location: event.location })).title).toBe(newTitle)
    expect(JSON.parse(response.body).length).toBe(await EventModel.find().length)
  })
})

