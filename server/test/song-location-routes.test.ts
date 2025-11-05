import request from "supertest";
import app from "../app";
import { generateToken } from "../middleware/auth";

// Mock token for testing (in a real scenario, you'd generate a proper JWT)
const mockToken = generateToken("test-user-id");

describe("Song API Routes", () => {
  // Test GET route - Fetch song by ID
  describe("GET /api/song/:id", () => {
    it("should return song data when authenticated", async () => {
      const response = await request(app)
        .get("/api/song/123")
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data.id).toBe("123");
    });

    it("should return 401 when not authenticated", async () => {
      const response = await request(app)
        .get("/api/song/123")
        .expect(401);

      expect(response.body.error).toBeDefined();
    });

    it("should return 404 when route is invalid", async () => {
      const response = await request(app)
        .get("/api/song/")
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(404);

      expect(response.body.error).toBeDefined();
    });
  });

  // Test GET route - Fetch all songs
  describe("GET /api/songs", () => {
    it("should return songs data when authenticated", async () => {
      const response = await request(app)
        .get("/api/songs")
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("songs");
      expect(Array.isArray(response.body.data.songs)).toBe(true);
    });

    it("should return 401 when not authenticated", async () => {
      const response = await request(app)
        .get("/api/songs")
        .expect(401);

      expect(response.body.error).toBeDefined();
    });
  });

  // Test POST route - Create new song
  describe("POST /api/song", () => {
    it("should create a new song when authenticated", async () => {
      const newSong = {
        title: "Test Song",
        artistId: "artist-1",
        album: "Test Album",
        duration: "3:45",
        genre: "Pop"
      };

      const response = await request(app)
        .post("/api/song")
        .set("Authorization", `Bearer ${mockToken}`)
        .send(newSong)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data.title).toBe(newSong.title);
    });

    it("should return 400 when required fields are missing", async () => {
      const invalidSong = {
        artistId: "artist-1",
        // Missing title
      };

      const response = await request(app)
        .post("/api/song")
        .set("Authorization", `Bearer ${mockToken}`)
        .send(invalidSong)
        .expect(400);

      expect(response.body.error).toBeDefined();
    });

    it("should return 401 when not authenticated", async () => {
      const newSong = {
        title: "Test Song",
        artistId: "artist-1"
      };

      const response = await request(app)
        .post("/api/song")
        .send(newSong)
        .expect(401);

      expect(response.body.error).toBeDefined();
    });
  });

  // Test PUT route - Update song
  describe("PUT /api/song/:id", () => {
    it("should update a song when authenticated", async () => {
      const updateData = {
        title: "Updated Song Title",
        album: "Updated Album"
      };

      const response = await request(app)
        .put("/api/song/123")
        .set("Authorization", `Bearer ${mockToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(updateData.title);
    });

    it("should return 401 when not authenticated", async () => {
      const updateData = {
        title: "Updated Song Title"
      };

      const response = await request(app)
        .put("/api/song/123")
        .send(updateData)
        .expect(401);

      expect(response.body.error).toBeDefined();
    });
  });

  // Test DELETE route - Delete song
  describe("DELETE /api/song/:id", () => {
    it("should delete a song when authenticated", async () => {
      const response = await request(app)
        .delete("/api/song/123")
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.deletedId).toBe("123");
    });

    it("should return 401 when not authenticated", async () => {
      const response = await request(app)
        .delete("/api/song/123")
        .expect(401);

      expect(response.body.error).toBeDefined();
    });
  });
});

describe("Location API Routes", () => {
  // Test GET route - Fetch location by ID
  describe("GET /api/location/:id", () => {
    it("should return location data when authenticated", async () => {
      const response = await request(app)
        .get("/api/location/123")
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data.id).toBe("123");
    });

    it("should return 401 when not authenticated", async () => {
      const response = await request(app)
        .get("/api/location/123")
        .expect(401);

      expect(response.body.error).toBeDefined();
    });

    it("should return 404 when route is invalid", async () => {
      const response = await request(app)
        .get("/api/location/")
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(404);

      expect(response.body.error).toBeDefined();
    });
  });

  // Test GET route - Fetch all locations
  describe("GET /api/locations", () => {
    it("should return locations data when authenticated", async () => {
      const response = await request(app)
        .get("/api/locations")
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("locations");
      expect(Array.isArray(response.body.data.locations)).toBe(true);
    });

    it("should return 401 when not authenticated", async () => {
      const response = await request(app)
        .get("/api/locations")
        .expect(401);

      expect(response.body.error).toBeDefined();
    });
  });

  // Test POST route - Create new location
  describe("POST /api/location", () => {
    it("should create a new location when authenticated", async () => {
      const newLocation = {
        name: "Test Karaoke Place",
        address: "123 Test Street",
        phone: "+1-555-0123",
        latitude: 40.7128,
        longitude: -74.0060,
        description: "A great place for karaoke"
      };

      const response = await request(app)
        .post("/api/location")
        .set("Authorization", `Bearer ${mockToken}`)
        .send(newLocation)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data.name).toBe(newLocation.name);
    });

    it("should return 400 when required fields are missing", async () => {
      const invalidLocation = {
        phone: "+1-555-0123",
        // Missing name and address
      };

      const response = await request(app)
        .post("/api/location")
        .set("Authorization", `Bearer ${mockToken}`)
        .send(invalidLocation)
        .expect(400);

      expect(response.body.error).toBeDefined();
    });

    it("should return 401 when not authenticated", async () => {
      const newLocation = {
        name: "Test Karaoke Place",
        address: "123 Test Street"
      };

      const response = await request(app)
        .post("/api/location")
        .send(newLocation)
        .expect(401);

      expect(response.body.error).toBeDefined();
    });
  });

  // Test PUT route - Update location
  describe("PUT /api/location/:id", () => {
    it("should update a location when authenticated", async () => {
      const updateData = {
        name: "Updated Location Name",
        address: "456 Updated Street"
      };

      const response = await request(app)
        .put("/api/location/123")
        .set("Authorization", `Bearer ${mockToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(updateData.name);
    });

    it("should return 401 when not authenticated", async () => {
      const updateData = {
        name: "Updated Location Name"
      };

      const response = await request(app)
        .put("/api/location/123")
        .send(updateData)
        .expect(401);

      expect(response.body.error).toBeDefined();
    });
  });

  // Test DELETE route - Delete location
  describe("DELETE /api/location/:id", () => {
    it("should delete a location when authenticated", async () => {
      const response = await request(app)
        .delete("/api/location/123")
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.deletedId).toBe("123");
    });

    it("should return 401 when not authenticated", async () => {
      const response = await request(app)
        .delete("/api/location/123")
        .expect(401);

      expect(response.body.error).toBeDefined();
    });
  });
});

console.log("Song and Location API tests defined. Run with: npm test");