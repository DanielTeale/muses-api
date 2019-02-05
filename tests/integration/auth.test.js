const app = require("../../app");
const mongoose = require("../../database/connect");
const UserModel = require("../../database/models/user_model");
const JWTService = require("../../services/jwt_service")
const supertest = require("supertest");

describe("Login Tests", () => {
  const user = {
    email: "test123@test.com",
    name: "Test Name"
  };

  beforeAll(async () => {
    await UserModel.deleteOne({email: user.email});
    const testUser = new UserModel(user);
    await UserModel.register(testUser, "testing123", (err, user) => {
      JWTService.generateToken(user)
    })
    await testUser.save()
  })

  afterAll(async () => {
    await UserModel.deleteOne({email: user.email});
    mongoose.disconnect()
  })

  test("/POST with no login details should return bad request", async () => {
    let response = await supertest(app)
      .post("/auth/login")
      .send({
        email: "",
        password: ""
      })
      .expect(400)
      expect(response.body.error).toBe("Bad Request")
  })

  test("/POST with invalid details should return unauthorized", async () => {
    let response = await supertest(app)
      .post("/auth/login")
      .send({
        email: "notarealuser@gmail.com",
        password: "notapassword"
      })
      .expect(401)
    expect(response.text).toBe("Invalid Username or password")
  })

  test("/POST with valid details should return a valid token and user object", async () => {
    let response = await supertest(app)
      .post("/auth/login")
      .send({
        email: user.email,
        password: "testing123"
      })
      .expect(200)
    expect(response.body.token).toBeTruthy()
    expect(response.body.user).toBeTruthy()
    

  })  

  test("/PATCH with valid token updates user", async () => {
    let response = await supertest(app)
      .post("/auth/login")
      .send({
        email: user.email,
        password: "testing123"
      })

    const newName = "Barry Test"

    let verifyResponse = await supertest(app)
      .patch("/auth/login/")
      .set("Authorization", `Bearer ${response.body.token}`)
      .field("email", user.email)
      .field("name", newName)
      .expect(200)
    expect(verifyResponse.body.user).toBeTruthy()
    expect(verifyResponse.body.user.name).toBe(newName)
  })
})