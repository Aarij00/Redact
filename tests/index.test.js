import axios from "axios";
const BACKEND_URL = "http://localhost:5000"
const FLASK_URL = "http://localhost:5001"

const axiosInstance = {
    post: async (url, data) => {
        try {
            const response = await axios.post(`${BACKEND_URL}${url}`, data);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    get: async (url) => {
        try {
            const response = await axios.get(`${BACKEND_URL}${url}`);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    put: async (url, data) => {
        try {
            const response = await axios.put(`${BACKEND_URL}${url}`, data);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    delete: async (url) => {
        try {
            const response = await axios.delete(`${BACKEND_URL}${url}`);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

describe("Authentication", () => {
    test("should register a new user only once", async () => {
        const email = "johndoe@gmail.com";
        const password = "test123";
        const name = "John Doe";
        const response = await axiosInstance.post("/api/auth/signup", { email, password, name });
        expect(response.status).toBe(200);

        const response2 = await axiosInstance.post("/api/auth/signup", { email, password, name });
        expect(response2.status).toBe(400);
    });

    test("signup fails if invalid email", async () => {
        const response = await axiosInstance.post("/api/auth/signup", { email: "john @doe@gmail.com", password: "test123", name: "John Doe" });
        expect(response.status).toBe(400);
    });

    test("should login a user", async () => {
        const email = "johndoe@gmail.com";
        const password = "test123";
        const response = await axiosInstance.post("/api/auth/login", { email, password });
        expect(response.status).toBe(200);
    });

    test("login fails if invalid fields", async () => {
        const response = await axiosInstance.post("/api/auth/login", { email: "johndoe1@gmail.com", password: "test123" });
        expect(response.status).toBe(400);
    });
});

afterAll(async () => {
   // delete test data from database
});