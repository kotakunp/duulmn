import * as XLSX from "xlsx";
import mongoose from "mongoose";
import { Types } from "mongoose";
import Song from "../models/Song";
import Artist from "../models/Artist";
import connectDB from "../config/database";
import "dotenv/config";

// Define the interface based on the Excel file structure
interface ExcelSong {
  "ДУУНЫ НЭР": string; // Song Title
  "ДУУЧИД, хамтлаг": string; // Artist
  "ДУУЧНЫ,НЭРСИЙН ОРЧУУЛГА"?: string; // Artist in Cyrillic
  ЖАНР?: number | string; // Genre
  ҮГ?: string; // Lyrics writer
  АЯ?: string; // Melody writer
  "YOUTUBE ЛИНКНҮҮД"?: string; // YouTube links
  Зураг?: string; // Image
  ТӨЛӨВ?: string; // Status
  ҮҮССЭН?: string; // Created date
  LIKE?: number; // Likes
  viva_id?: number; // Viva ID
  a100_id?: number; // A100 ID
  Дуулалт?: number; // Plays
  Фонограм?: string; // Phonogram
  КЛИП?: string; // Clip
  // Add other fields as needed based on your Excel structure
}

export const importSongsFromExcel = async (filePath: string): Promise<void> => {
  try {
    // Connect to database if not already connected
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    console.log("Database connected successfully for song import");

    // Read the Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Assuming the first sheet
    const worksheet = workbook.Sheets[sheetName];

    // Convert to JSON - adjust the field names to match your Excel structure
    const excelData: ExcelSong[] = XLSX.utils.sheet_to_json(worksheet);

    console.log(`Found ${excelData.length} songs to import`);

    // Batch process to improve performance
    const BATCH_SIZE = 1000;

    // Create an array to collect unique artists for batch processing
    // Filter out empty artist names to avoid validation errors
    const allArtists = excelData
      .map((song) => song["ДУУЧИД, хамтлаг"])
      .filter((artist) => artist && artist.trim() !== ""); // Only include non-empty artist names
    const uniqueArtists = Array.from(new Set(allArtists));

    console.log(`Found ${uniqueArtists.length} unique artists to process`);

    // Create Artists that don't exist yet in batch
    const artistMap = new Map<string, Types.ObjectId>();

    // Get all existing artists in one query to avoid repeated lookups
    // Only search for non-empty artist names
    if (uniqueArtists.length > 0) {
      const existingArtists = await Artist.find({
        name: { $in: uniqueArtists },
      });

      // Populate the artist map with existing artists
      for (const existingArtist of existingArtists) {
        artistMap.set(existingArtist.name, existingArtist._id);
      }
    }

    // Create new artists that don't exist yet
    const artistsToCreate: { name: string }[] = [];
    for (const artistName of uniqueArtists) {
      if (artistName && artistName.trim() !== "" && !artistMap.has(artistName)) {
        artistsToCreate.push({ name: artistName.trim() }); // Trim whitespace from names
      }
    }

    if (artistsToCreate.length > 0) {
      console.log(`Creating ${artistsToCreate.length} new artists...`);
      const createdArtists = await Artist.insertMany(artistsToCreate);
      for (const artist of createdArtists) {
        artistMap.set(artist.name, artist._id);
      }
      console.log(`Created ${createdArtists.length} new artists`);
    }

    // First, find existing songs to avoid duplicates
    console.log("Checking for existing songs...");
    const existingSongConditions = excelData.map((song) => ({
      title: song["ДУУНЫ НЭР"],
      artist: song["ДУУЧИД, хамтлаг"],
    }));

    const existingSongs = await Song.find({
      $or: existingSongConditions,
    });

    // Create a set of existing song keys to quickly check for duplicates
    const existingSongKeys = new Set(
      existingSongs.map((song) => `${song.title}_${song.artist}`)
    );

    console.log(
      `Found ${existingSongs.length} existing songs, skipping duplicates...`
    );

    // Process songs in batches to improve performance
    for (let i = 0; i < excelData.length; i += BATCH_SIZE) {
      const batch = excelData.slice(i, i + BATCH_SIZE);

      // Filter out songs that already exist
      const songsForInsertion = batch
        .filter(
          (songData) =>
            !existingSongKeys.has(
              `${songData["ДУУНЫ НЭР"]}_${songData["ДУУЧИД, хамтлаг"]}`
            )
        )
        .map((songData) => {
          // Parse genre: convert number to string if needed
          let genreStr = "";
          if (songData["ЖАНР"]) {
            if (typeof songData["ЖАНР"] === "number") {
              genreStr = songData["ЖАНР"].toString();
            } else {
              genreStr = songData["ЖАНР"] as string;
            }
          }

          // Get artist ObjectId - handle empty artist names
          const artistName = songData["ДУУЧИД, хамтлаг"]; 
          const artistId = artistName && artistName.trim() !== "" ? (artistMap.get(artistName) || null) : null;

          // Extract relevant fields from Excel
          const title = songData["ДУУНЫ НЭР"] || "";
          const artist = artistName && artistName.trim() !== "" ? artistName : ""; // Only assign if not empty
          const album = ""; // Not available in this Excel, could derive from other sources if needed
          const duration = "0:00"; // Not available in this Excel
          const genre = genreStr;
          const lyrics = songData["ҮГ"] || ""; // Use lyrics writer as lyrics if available
          const coverImage = songData["Зураг"] || "";
          const filePath = songData["YOUTUBE ЛИНКНҮҮД"] || "";
          const language = "Mongolian"; // Default to Mongolian for this app
          const plays = songData["Дуулалт"] ? Number(songData["Дуулалт"]) : 0; // Using 'Дуулалт' field for plays
          const likes = songData["LIKE"] ? Number(songData["LIKE"]) : 0;

          return new Song({
            title,
            artist,
            artistId, // Can be null if artist name is empty
            album,
            duration,
            genre,
            lyrics,
            coverImage,
            filePath,
            language,
            plays,
            likes,
          });
        });

      if (songsForInsertion.length > 0) {
        try {
          // Use insertMany for better performance instead of individual saves
          await Song.insertMany(songsForInsertion, { ordered: false }); // ordered: false allows partial success
          console.log(
            `Imported batch: ${i + 1} - ${Math.min(
              i + BATCH_SIZE,
              excelData.length
            )} (${songsForInsertion.length} new songs)`
          );
        } catch (batchError: unknown) {
          console.error(
            `Error importing batch ${i + 1}-${Math.min(
              i + BATCH_SIZE,
              excelData.length
            )}:`,
            batchError instanceof Error ? batchError.message : "Unknown error"
          );
          // Don't stop the entire process if one batch fails
          if (
            batchError &&
            typeof batchError === "object" &&
            "code" in batchError &&
            (batchError as { code: number }).code === 11000
          ) {
            console.error(
              "Duplicate key error - some songs already exist in this batch"
            );
          }
        }
      }
    }

    console.log(
      `Successfully imported all songs. Total processed: ${excelData.length}`
    );
  } catch (error) {
    console.error("Error importing songs:", error);
    throw error;
  }
};

// Function to run the import manually
if (require.main === module) {
  const filePath = process.argv[2];

  if (!filePath) {
    console.error("Please provide the path to the Excel file:");
    console.error("Usage: ts-node importSongs.ts <path-to-excel-file>");
    process.exit(1);
  }

  importSongsFromExcel(filePath)
    .then(() => {
      console.log("Import completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Import failed:", error);
      process.exit(1);
    });
}
