const request = require("supertest");
const app = require("../server");
const db = require("../database/models");
require("dotenv").config();
const jwt = require("jsonwebtoken");

describe("User Routes", () => {
  describe("POST /", () => {
    it("should create a new user and return a user object", async () => {
      const response = await request(app).post("/").send({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password123",
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("_id");
      expect(response.body.name).toBe("John Doe");
      expect(response.body.email).toBe("johndoe@example.com");
    });

    it("should return a 400 status code and an error message when an invalid user is created", async () => {
      const response = await request(app).post("/").send({
        name: "John Doe",
        email: "johndoe@example.com",
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("GET /", () => {
    it("should return a list of users", async () => {
      const response = await request(app).get("/");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("DELETE /:id", () => {
    it("should delete a user and return a success message", async () => {
      const user = await User.create({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password123",
      });
      const response = await request(app).delete(`/${user._id}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "User deleted successfully"
      );
    });

    it("should return a 404 status code and an error message when an invalid user ID is provided", async () => {
      const response = await request(app).delete(`/123`);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("GET /:id", () => {
    it("should return a user object when a valid user ID is provided", async () => {
      const user = await User.create({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password123",
      });
      const response = await request(app).get(`/${user._id}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("_id", user._id.toString());
      expect(response.body.name).toBe("John Doe");
      expect(response.body.email).toBe("johndoe@example.com");
    });

    it("should return a 404 status code and an error message when an invalid user ID is provided", async () => {
      const response = await request(app).get(`/123`);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("POST /profile-verification", () => {
    it("should return a 200 status code on successful request", async () => {
      const res = await request(app)
        .post("/profile-verification")
        .attach("governmentId", "path/to/governmentId")
        .attach("proofDocument", "path/to/proofDocument");
      expect(res.statusCode).toEqual(200);
    });

    it("should return a 400 status code if the request body is invalid", async () => {
      const res = await request(app)
        .post("/profile-verification")
        .attach("governmentId", "path/to/governmentId");
      expect(res.statusCode).toEqual(400);
    });

    it("should return a 500 status code if there is an internal server error", async () => {
      // Mock the profileVerificationRequest function to throw an error
      jest.mock("../controllers/user", () => ({
        profileVerificationRequest: jest.fn(() => {
          throw new Error("Internal server error");
        }),
      }));

      const res = await request(app)
        .post("/profile-verification")
        .attach("governmentId", "path/to/governmentId")
        .attach("proofDocument", "path/to/proofDocument");
      expect(res.statusCode).toEqual(500);
    });
  });

  describe("GET /profile-verification/me", () => {
    it("should return a 200 status code on successful request", async () => {
      const res = await request(app)
        .get("/profile-verification/me")
        .set("Authorization", "Bearer " + token);
      expect(res.statusCode).toEqual(200);
    });

    it("should return an array of profile verification requests for the authenticated user", async () => {
      const res = await request(app)
        .get("/profile-verification/me")
        .set("Authorization", "Bearer " + token);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("should return a 500 status code if there is an internal server error", async () => {
      // Mock the getProfileVerificationRequestByUser function to throw an error
      jest.mock("../controllers/user", () => ({
        getProfileVerificationRequestByUser: jest.fn(() => {
          throw new Error("Internal server error");
        }),
      }));

      const res = await request(app)
        .get("/profile-verification/me")
        .set("Authorization", "Bearer " + token);
      expect(res.statusCode).toEqual(500);
    });
  });

  describe("GET /profile-verification/:id", () => {
    it("should return a 200 status code on successful request", async () => {
      const res = await request(app)
        .get("/profile-verification/" + profileVerificationRequestId)
        .set("Authorization", "Bearer " + token);
      expect(res.statusCode).toEqual(200);
    });

    it("should return a single profile verification request for the given ID", async () => {
      const res = await request(app)
        .get("/profile-verification/" + profileVerificationRequestId)
        .set("Authorization", "Bearer " + token);
      expect(res.body._id).toEqual(profileVerificationRequestId);
    });

    it("should return a 404 status code if the ID is invalid", async () => {
      const res = await request(app)
        .get("/profile-verification/invalid-id")
        .set("Authorization", "Bearer " + token);
      expect(res.statusCode).toEqual(404);
    });

    it("should return a 500 status code if there is an internal server error", async () => {
      // Mock the getProfileVerificationRequest function to throw an error
      jest.mock("../controllers/user", () => ({
        getProfileVerificationRequest: jest.fn(() => {
          throw new Error("Internal server error");
        }),
      }));

      const res = await request(app)
        .get("/profile-verification/" + profileVerificationRequestId)
        .set("Authorization", "Bearer " + token);
      expect(res.statusCode).toEqual(500);
    });
  });

  describe("GET /profile-verification", () => {
    it("should return a 200 status code on successful request", async () => {
      const res = await request(app)
        .get("/profile-verification")
        .set("Authorization", "Bearer " + token);
      expect(res.statusCode).toEqual(200);
    });

    it("should return an array of profile verification requests", async () => {
      const res = await request(app)
        .get("/profile-verification")
        .set("Authorization", "Bearer " + token);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("should return a 500 status code if there is an internal server error", async () => {
      // Mock the getProfileVerificationRequestList function to throw an error
      jest.mock("../controllers/user", () => ({
        getProfileVerificationRequestList: jest.fn(() => {
          throw new Error("Internal server error");
        }),
      }));

      const res = await request(app)
        .get("/profile-verification")
        .set("Authorization", "Bearer " + token);
      expect(res.statusCode).toEqual(500);
    });
  });

  describe("PUT /profile-verification/:id/approve", () => {
    it("should return 200 OK and a success message when the request is successful", async () => {
      const response = await request(app)
        .put("/profile-verification/1/approve")
        .send();

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        "Profile verification request approved successfully."
      );
    });

    it("should return 404 Not Found and an error message when the request ID is invalid", async () => {
      const response = await request(app)
        .put("/profile-verification/invalid-id/approve")
        .send();

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Invalid request ID.");
    });
  });

  describe("PUT /profile-verification/:id/reject", () => {
    it("should return 200 OK and a success message when the request is successful", async () => {
      const response = await request(app)
        .put("/profile-verification/1/reject")
        .send();

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        "Profile verification request rejected successfully."
      );
    });

    it("should return 404 Not Found and an error message when the request ID is invalid", async () => {
      const response = await request(app)
        .put("/profile-verification/invalid-id/reject")
        .send();

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Invalid request ID.");
    });
  });
  
describe("PUT /:id", () => {
    it("returns a 200 status code when a valid id and profilePicture are provided", async () => {
      const response = await request(app)
        .put("/1")
        .attach("profilePicture", "test/fixtures/profile.jpg");
  
      expect(response.status).toBe(200);
    });
  
    it("returns a 400 status code when an invalid id is provided", async () => {
      const response = await request(app)
        .put("/invalid-id")
        .attach("profilePicture", "test/fixtures/profile.jpg");
  
      expect(response.status).toBe(400);
    });
  
    it("returns a 400 status code when an invalid profilePicture is provided", async () => {
      const response = await request(app)
        .put("/1")
        .attach("profilePicture", "test/fixtures/invalid.jpg");
  
      expect(response.status).toBe(400);
    });
  
    it("returns a 500 status code when an error occurs on the server", async () => {
      const response = await request(app)
        .put("/1")
        .attach("profilePicture", "test/fixtures/profile.jpg")
        .set("Content-Type", "application/json");
  
      expect(response.status).toBe(500);
    });
  });

  
describe("POST /change-password/:id", () => {
    it("returns a 200 status code when a valid id and password are provided", async () => {
      const response = await request(app)
        .post("/change-password/1")
        .send({ password: "newpassword" });
  
      expect(response.status).toBe(200);
    });
  
    it("returns a 400 status code when an invalid id is provided", async () => {
      const response = await request(app)
        .post("/change-password/invalid-id")
        .send({ password: "newpassword" });
  
      expect(response.status).toBe(400);
    });
  
    it("returns a 400 status code when an invalid password is provided", async () => {
      const response = await request(app)
        .post("/change-password/1")
        .send({ password: "" });
  
      expect(response.status).toBe(400);
    });
  
    it("returns a 500 status code when an error occurs on the server", async () => {
      const response = await request(app)
        .post("/change-password/1")
        .set("Content-Type", "application/json");
  
      expect(response.status).toBe(500);
    });
  });
});
