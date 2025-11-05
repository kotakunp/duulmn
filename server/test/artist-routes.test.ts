import request from "supertest";
import app from "../app";
import { generateToken } from "../middleware/auth";

// Mock token for testing (in a real scenario, you'd generate a proper JWT)
const mockToken = generateToken("test-user-id");

describe("Artist API Routes", () => {
  // Test GET route
  describe("GET /api/artist/:id", () => {
    it("should return artist data when authenticated", async () => {
      const response = await request(app)
        .get("/api/artist/123")
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data.id).toBe("123");
    });

    it("should return 401 when not authenticated", async () => {
      const response = await request(app)
        .get("/api/artist/123")
        .expect(401);

      expect(response.body.error).toBeDefined();
    });

    it("should return 404 when route is invalid", async () => {
      const response = await request(app)
        .get("/api/artist/")
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(404);

      expect(response.body.error).toBeDefined();
    });
  });

  // Test POST route
  describe("POST /api/artist", () => {
    it("should create a new artist when authenticated", async () => {
      const newArtist = {
        name: "Test Artist",
        bio: "This is a test artist",
        profileImage: "/api/placeholder/200/200",
      };

      const response = await request(app)
        .post("/api/artist")
        .set("Authorization", `Bearer ${mockToken}`)
        .send(newArtist)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data.name).toBe(newArtist.name);
    });

    it("should return 400 when required fields are missing", async () => {
      const invalidArtist = {
        bio: "This is a test artist",
        // Missing name field
      };

      const response = await request(app)
        .post("/api/artist")
        .set("Authorization", `Bearer ${mockToken}`)
        .send(invalidArtist)
        .expect(400);

      expect(response.body.error).toBeDefined();
    });

    it("should return 401 when not authenticated", async () => {
      const newArtist = {
        name: "Test Artist",
        bio: "This is a test artist",
      };

      const response = await request(app)
        .post("/api/artist")
        .send(newArtist)
        .expect(401);

      expect(response.body.error).toBeDefined();
    });
  });

  // Test PUT route
  describe("PUT /api/artist/:id", () => {
    it("should update an artist when authenticated", async () => {
      const updateData = {
        name: "Updated Artist Name",
        bio: "Updated bio",
      };

      const response = await request(app)
        .put("/api/artist/123")
        .set("Authorization", `Bearer ${mockToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(updateData.name);
    });

    it("should return 401 when not authenticated", async () => {
      const updateData = {
        name: "Updated Artist Name",
      };

      const response = await request(app)
        .put("/api/artist/123")
        .send(updateData)
        .expect(401);

      expect(response.body.error).toBeDefined();
    });
  });

  // Test DELETE route
  describe("DELETE /api/artist/:id", () => {
    it("should delete an artist when authenticated", async () => {
      const response = await request(app)
        .delete("/api/artist/123")
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.deletedId).toBe("123");
    });

    it("should return 401 when not authenticated", async () => {
      const response = await request(app)
        .delete("/api/artist/123")
        .expect(401);

      expect(response.body.error).toBeDefined();
    });
  });
});

console.log("Tests defined. Run with: npm test");
