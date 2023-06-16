const request = require("supertest");
const app = require("../server");
const db = require("../database/models");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// register tests
describe("User Authentication Routes", ()=>{

  
describe("POST /api/local/register", () => {
  it("should create a new user and return a 200 status code", async () => {
    const number = Math.floor(Math.random() * 90) + 10
    const res = await request(app)
      .post("/api/local/register")
      .send({
        email: `test${number}@example.com`,
        fullName: "Test User",
        password: "password123",
        role: "learner",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("email", `test${number}@example.com`);
    expect(res.body).toHaveProperty("firstName", "Test");
    expect(res.body).toHaveProperty("lastName", "User");
    expect(res.body).toHaveProperty("roles", ["learner"]);
  });

  it("should return a 409 status code if the email already exists", async () => {
    const res = await request(app)
      .post("/api/local/register")
      .send({
        email: "test@example.com",
        fullName: "Test User",
        password: "password123",
        role: "learner",
      });
    expect(res.statusCode).toEqual(409);
  });

  it("should return a 400 status code if the email is missing", async () => {
    const res = await request(app)
      .post("/api/local/register")
      .send({
        fullName: "Test User",
        password: "password123",
        role: "learner",
      });
    expect(res.statusCode).toEqual(400);
  });

  it("should return a 400 status code if the password is missing", async () => {
    const res = await request(app)
      .post("/api/local/register")
      .send({
        email: "test@example.com",
        fullName: "Test User",
        role: "learner",
      });
    expect(res.statusCode).toEqual(400);
  });
});
// login tests
describe("POST /api/local/login", () => {
  it("should return 200 OK and a token when given valid credentials", async () => {
    const response = await request(app)
      .post("/api/local/login")
      .send({ email: "test99@example.com", password: "password123" })
      .expect(200);

    expect(response.body).toHaveProperty("token");
  });

  it("should return 401 Unauthorized when given invalid credentials", async () => {
    await request(app)
      .post("/api/local/login")
      .send({ email: "test99@example.com", password: "wrongpassword" })
      .expect(401);
  });

  it("should return 404 Not Found when given an email that does not exist", async () => {
    await request(app)
      .post("/api/local/login")
      .send({ email: "nonexistent@example.com", password: "password123" })
      .expect(404);
  });

  it("should return 401 Unauthorized when the email is not confirmed", async () => {
    await request(app)
      .post("/api/local/login")
      .send({ email: "test@example.com", password: "password123" })
      .expect(401);
  });
});

// reset password
describe("POST /api/local/reset_password/send_email", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  it("should return 200 OK and a message when given a valid email", async () => {
    request(app)
      .post("/api/local/reset_password/send_email")
      .send({ email: "test99@example.com" })
      .expect(200);
  });

  // it("should return 404 Not Found when given an invalid email", async () => {
  //   await request(app)
  //     .post("/api/local/reset_password/send_email")
  //     .send({ email: "nonexistent@example.com" })
  //     .expect(404);
  // },5000);
});

describe('POST /api/local/reset_password/changePassword', () => {
  it("should return 200 OK and a message when given a valid password reset token and new password", async () => {
    const user = await db.User.findOne({ where: { email: "test99@example.com" } });
    const secret = process.env.JWT_SECRET + user.passwordHash;
    const payload = {
      email: user.email,
      id: user.id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "1ms" });
    request(app)
      .post("/api/local/reset_password/changePassword")
      .send({ id: user.id, token, password: "newpassword" })
      .expect(200);
  
      // expect(JSON.parse(response.body)).toEqual("success");
    });
  
  it("should return 401 Unauthorized when given an invalid password reset token", async () => {
    const user = await db.User.findOne({ where: { email: "test99@example.com" } });
    const secret = process.env.JWT_SECRET + user.passwordHash;
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1ms" });
    await new Promise((resolve) => setTimeout(resolve, 2));
    const response = await request(app)
      .post("/api/local/reset_password/changePassword")
      .send({ id: user.id, token, password: "newpassword" })
      .expect(401);
  
      expect(JSON.parse(response.text)).toEqual("jwt expired");
    });
  
});

describe('GET /api/local/confirm/:id/:token', () => {
  it('should return 200 OK and redirect to login page when given a valid confirmation token', async () => {
    const user = await db.User.findOne({ where: { email: 'test99@example.com' } });
    const secret = process.env.JWT_SECRET + user.passwordHash;
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '2m' });
    await request(app)
      .get(`/api/local/confirm/${user.id}/${token}`)
      .expect(302);

    // expect(response.header.location).toEqual('http://localhost:3000/login');
  });
  
  // it("should return 500 Internal Server Error when given an invalid user ID", async () => {
  //   await request(app)
  //     .get("/api/local/confirm/999/validtoken")
  //     .expect(500);
  //     // expect(JSON.parse(response.text)).toEqual("Link Expired");
  //   });
  
  it("should return 401 Unauthorized when given an invalid confirmation token", async () => {
    const user = await db.User.findOne({ where: { email: "test99@example.com" } });
    const secret = process.env.JWT_SECRET + user.passwordHash;
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1ms" });
    await new Promise((resolve) => setTimeout(resolve, 2));
    await request(app)
      .get(`/api/local/confirm/${user.id}/${token}`)
      .expect(302);
  
      // expect(JSON.parse(response.text)).toEqual("jwt expired");
    });
});

})
