const request = require('supertest')
const { describe } = require("node:test");


// import file that contains functions to be tested

const app = require("../auth/localAuth");

describe("POST /local/login", () => {
    describe("given username and password", () => {
        // check whether the given information is correct by checking the database

        // return the correct json provided correct credentials

        // return a status code of 200
        test('should respond with status code of 200', async () => { 
            const response = await request(app).post("/login").send({
                username: "alice",
                password: "letmein"
            });
            expect(200)
         })

        // specify json in content type header
    })
    describe("when username and password is not provided", () => {
        // should respond with a status code 400
    })
})