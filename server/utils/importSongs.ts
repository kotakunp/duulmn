import * as XLSX from "xlsx";
import { Types } from "mongoose";
import Song from "../models/Song";
import Artist from "../models/Artist";
import connectDB from "../config/database";

interface ExcelSong {
  title: string;
  artist: string;
  album?: string;
  duration?: string;
  genre?: string;
  lyrics?: string;
  coverImage?: string;
  filePath?: string;
  language?: string;
  // Add other fields as needed based on your Excel structure
}

export const importSongsFromExcel = async (filePath: string): Promise<void> => {
  try {
    // Connect to database
    await connectDB();

    // Read the Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Assuming the first sheet
    const worksheet = workbook.Sheets[sheetName];

    // Convert to JSON - adjust the field names to match your Excel structure
    const excelData: ExcelSong[] = XLSX.utils.sheet_to_json(worksheet);

    console.log(`Found ${excelData.length} songs to import`);

    // Process each song
    for (const songData of excelData) {
      // Check if song already exists to avoid duplicates
      const existingSong = await Song.findOne({
        title: songData.title,
        artist: songData.artist,
      });

      if (existingSong) {
        console.log(
          `Skipping duplicate: ${songData.title} by ${songData.artist}`
        );
        continue;
      }

      // Check if artist exists, create if not
      let artistId: Types.ObjectId | null = null;
      if (songData.artist) {
        let artist = await Artist.findOne({ name: songData.artist });
        if (!artist) {
          artist = await Artist.create({
            name: songData.artist,
            // Add other artist fields as needed
          });
          console.log(`Created new artist: ${songData.artist}`);
        }
        artistId = artist._id;
      }

      // Create the song
      const newSong = new Song({
        title: songData.title,
        artist: songData.artist,
        artistId: artistId,
        album: songData.album || "",
        duration: songData.duration || "0:00", // Default duration if not provided
        genre: songData.genre || "",
        lyrics: songData.lyrics || "",
        coverImage: songData.coverImage || "",
        filePath: songData.filePath || "",
        language: songData.language || "Mongolian", // Default to Mongolian for this app
        plays: 0, // New songs start with 0 plays
        likes: 0, // New songs start with 0 likes
      });

      await newSong.save();
      console.log(`Imported song: ${songData.title} by ${songData.artist}`);
    }

    console.log(`Successfully imported ${excelData.length} songs`);
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
