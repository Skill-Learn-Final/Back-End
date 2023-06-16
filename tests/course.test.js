const request = require("supertest");
const app = require("../server");
const db = require("../database/models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
  createCourse,
  getCourseList,
  getCourse,
  deleteCourse,
  updateChapter,
  createLesson,
  getLessonList,
  getLesson,
  deleteLesson,
  publishCourse,
  assignReviewer,
  approveCourse,
  rejectCourse,
} = require("../controllers/course");
const { Roles } = require("../utils/constants");

describe("Course API Routes", () => {
  describe("POST /", () => {
    it("should create a new course", async () => {
      const res = await request(app)
        .post("/")
        .set("Authorization", `Bearer ${process.env.TEST_TOKEN}`)
        .attach("coursePoster", "test/fixtures/test-image.jpg")
        .field("title", "Test Course")
        .field("description", "This is a test course")
        .field("price", "10")
        .field("category", "Programming")
        .expect(201);

      expect(res.body.title).toEqual("Test Course");
      expect(res.body.description).toEqual("This is a test course");
      expect(res.body.price).toEqual(10);
      expect(res.body.category).toEqual("Programming");
    });

    it("should return 401 if user is not authenticated", async () => {
      await request(app).post("/").expect(401);
    });

    it("should return 403 if user is not a creator", async () => {
      await request(app)
        .post("/")
        .set("Authorization", `Bearer ${process.env.TEST_TOKEN}`)
        .expect(403);
    });
  });

  describe("GET /", () => {
    it("should return a list of courses", async () => {
      const res = await request(app).get("/").expect(200);

      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /under-review", () => {
    it("should return a list of courses under review", async () => {
      const res = await request(app)
        .get("/under-review")
        .set("Authorization", `Bearer ${process.env.TEST_TOKEN}`)
        .expect(200);

      expect(res.body.length).toBeGreaterThan(0);
    });

    it("should return 401 if user is not authenticated", async () => {
      await request(app).get("/under-review").expect(401);
    });

    it("should return 403 if user is not a reviewer", async () => {
      await request(app)
        .get("/under-review")
        .set("Authorization", `Bearer ${process.env.TEST_TOKEN}`)
        .expect(403);
    });
  });

  describe("GET /byReviewer", () => {
    it("should return a list of courses assigned to the reviewer", async () => {
      const res = await request(app)
        .get("/byReviewer")
        .set("Authorization", `Bearer ${process.env.TEST_TOKEN}`)
        .expect(200);

      expect(res.body.length).toBeGreaterThan(0);
    });

    it("should return 401 if user is not authenticated", async () => {
      await request(app).get("/byReviewer").expect(401);
    });

    it("should return 403 if user is not a reviewer", async () => {
      await request(app)
        .get("/byReviewer")
        .set("Authorization", `Bearer ${process.env.TEST_TOKEN}`)
        .expect(403);
    });
  });
  let courseId;
  let lessonId;
  // create a course before running the tests
  beforeAll(async () => {
    const res = await request(app)
      .post("/courses")
      .field("title", "Test Course")
      .field("description", "This is a test course")
      .field("price", 10)
      .attach("coursePoster", "test/fixtures/test-image.jpg")
      .set("Authorization", "Bearer <insert token here>");
    courseId = res.body._id;
  });

  // create a lesson before running the tests
  beforeAll(async () => {
    const res = await request(app)
      .post(`/courses/${courseId}/chapters`)
      .field("title", "Test Chapter")
      .set("Authorization", "Bearer <insert token here>");
    const chapterId = res.body._id;

    const lessonRes = await request(app)
      .post(`/courses/${courseId}/chapters/${chapterId}/lessons`)
      .field("title", "Test Lesson")
      .attach("video", "test/fixtures/test-video.mp4")
      .attach("thumbnail", "test/fixtures/test-image.jpg")
      .set("Authorization", "Bearer <insert token here>");
    lessonId = lessonRes.body._id;
  });

  describe("GET /courses/stream/:lessonId", () => {
    test("should return 200 OK", async () => {
      const res = await request(app).get(`/courses/stream/${lessonId}`);
      expect(res.statusCode).toEqual(200);
    });
  });

  describe("GET /courses/:courseId", () => {
    test("should return 200 OK", async () => {
      const res = await request(app).get(`/courses/${courseId}`);
      expect(res.statusCode).toEqual(200);
    });
  });

  describe("DELETE /courses/:courseId", () => {
    test("should return 204 No Content", async () => {
      const res = await request(app).delete(`/courses/${courseId}`);
      expect(res.statusCode).toEqual(204);
    });
  });

  describe("PUT /courses/:courseId", () => {
    test("should return 200 OK", async () => {
      const res = await request(app)
        .put(`/courses/${courseId}`)
        .field("title", "Updated Test Course")
        .field("description", "This is an updated test course")
        .field("price", 20)
        .attach("coursePoster", "test/fixtures/test-image.jpg")
        .set("Authorization", "Bearer <insert token here>");
      expect(res.statusCode).toEqual(200);
    });
  });

  // delete the course after running the tests
  afterAll(async () => {
    await deleteCourse({ params: { courseId } });
  });

  describe("PUT /:courseId/assign-reviewer", () => {
    it("should return 200 OK status", async () => {
      const response = await request(app)
        .put("/123/assign-reviewer")
        .send({ reviewerId: 456 });
      expect(response.statusCode).toBe(200);
    });

    it("should call assignReviewer function", async () => {
      const assignReviewerMock = jest.fn(assignReviewer);
      const response = await request(app)
        .put("/123/assign-reviewer")
        .send({ reviewerId: 456 });
      expect(assignReviewerMock).toHaveBeenCalled();
    });
  });

  describe("PUT /:courseId/publish", () => {
    it("should return 200 OK status", async () => {
      const response = await request(app).put("/123/publish");
      expect(response.statusCode).toBe(200);
    });

    it("should call publishCourse function", async () => {
      const publishCourseMock = jest.fn(publishCourse);
      const response = await request(app).put("/123/publish");
      expect(publishCourseMock).toHaveBeenCalled();
    });
  });

  describe("PUT /:courseId/approve", () => {
    it("should return 200 OK status", async () => {
      const response = await request(app).put("/123/approve");
      expect(response.statusCode).toBe(200);
    });

    it("should call approveCourse function", async () => {
      const approveCourseMock = jest.fn(approveCourse);
      const response = await request(app).put("/123/approve");
      expect(approveCourseMock).toHaveBeenCalled();
    });
  });

  describe("PUT /:courseId/reject", () => {
    it("should return 200 OK status", async () => {
      const response = await request(app).put("/123/reject");
      expect(response.statusCode).toBe(200);
    });

    it("should call rejectCourse function", async () => {
      const rejectCourseMock = jest.fn(rejectCourse);
      const response = await request(app).put("/123/reject");
      expect(rejectCourseMock).toHaveBeenCalled();
    });
  });
  describe("POST /:courseId/chapters", () => {
    test("should create a new chapter", async () => {
      const res = await request(app)
        .post("/api/courses/123/chapters")
        .send({
          title: "Chapter 1",
          description: "This is the first chapter",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(201);
      expect(res.body.title).toEqual("Chapter 1");
    });

    test("should return an error when required fields are missing", async () => {
      const res = await request(app)
        .post("/api/courses/123/chapters")
        .send({
          description: "This is the first chapter",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(400);
    });
  });

  describe("GET /:courseId/chapters", () => {
    test("should return a list of chapters", async () => {
      const res = await request(app)
        .get("/api/courses/123/chapters")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });
  describe("GET /:courseId/chapters/:chapterId", () => {
    test("should return a chapter", async () => {
      const res = await request(app)
        .get("/api/courses/123/chapters/456")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toEqual("Chapter 1");
    });
    test("should return an error when an invalid chapter ID is provided", async () => {
      const res = await request(app)
        .get("/api/courses/123/chapters/invalid")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(400);
    });
  });
  describe("DELETE /:courseId/chapters/:chapterId", () => {
    test("should delete a chapter", async () => {
      const res = await request(app)
        .delete("/api/courses/123/chapters/456")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(204);
    });

    test("should return an error when an invalid chapter ID is provided", async () => {
      const res = await request(app)
        .delete("/api/courses/123/chapters/invalid")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(400);
    });
  });
  describe("PUT /:courseId/chapters/:chapterId", () => {
    test("should update a chapter", async () => {
      const res = await request(app)
        .put("/api/courses/123/chapters/456")
        .send({
          title: "Chapter 1 - Updated",
          description: "This is the first chapter - Updated",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toEqual("Chapter 1 - Updated");
    });

    test("should return an error when an invalid chapter ID is provided", async () => {
      const res = await request(app)
        .put("/api/courses/123/chapters/invalid")
        .send({
          title: "Chapter 1 - Updated",
          description: "This is the first chapter - Updated",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(400);
    });
  });
});
