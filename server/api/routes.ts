import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';
import Song from '../models/Song';
import Artist from '../models/Artist';

// Create Express router
const router = Router();

// Input validation utilities
interface ArtistInput {
  name?: string;
  bio?: string;
  profileImage?: string;
}

const validateArtistInput = (data: ArtistInput) => {
  const errors: string[] = [];
  
  if (data.name) {
    if (typeof data.name !== 'string') {
      errors.push('Artist name must be a string');
    } else if (data.name.trim().length < 2) {
      errors.push('Artist name must be at least 2 characters long');
    } else if (data.name.trim().length > 100) {
      errors.push('Artist name must not exceed 100 characters');
    }
  }
  
  if (data.bio && typeof data.bio !== 'string') {
    errors.push('Bio must be a string');
  }
  
  if (data.profileImage && typeof data.profileImage !== 'string') {
    errors.push('Profile image must be a string');
  }
  
  return errors;
};

interface SongInput {
  title?: string;
  artistId?: string;
  album?: string;
  duration?: string;
  genre?: string;
  lyrics?: string;
  coverImage?: string;
}

const validateSongInput = (data: SongInput) => {
  const errors: string[] = [];
  
  if (data.title) {
    if (typeof data.title !== 'string') {
      errors.push('Song title must be a string');
    } else if (data.title.trim().length < 1) {
      errors.push('Song title cannot be empty');
    } else if (data.title.trim().length > 200) {
      errors.push('Song title must not exceed 200 characters');
    }
  }
  
  if (data.artistId && typeof data.artistId !== 'string') {
    errors.push('Artist ID must be a string');
  }
  
  if (data.album && typeof data.album !== 'string') {
    errors.push('Album must be a string');
  }
  
  if (data.duration && typeof data.duration !== 'string') {
    errors.push('Duration must be a string');
  }
  
  if (data.genre && typeof data.genre !== 'string') {
    errors.push('Genre must be a string');
  }
  
  return errors;
};

interface LocationInput {
  name?: string;
  address?: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  website?: string;
}

const validateLocationInput = (data: LocationInput) => {
  const errors: string[] = [];
  
  if (data.name) {
    if (typeof data.name !== 'string') {
      errors.push('Location name must be a string');
    } else if (data.name.trim().length < 2) {
      errors.push('Location name must be at least 2 characters long');
    } else if (data.name.trim().length > 100) {
      errors.push('Location name must not exceed 100 characters');
    }
  }
  
  if (data.address && typeof data.address !== 'string') {
    errors.push('Address must be a string');
  }
  
  if (data.phone && typeof data.phone !== 'string') {
    errors.push('Phone must be a string');
  }
  
  if (data.description && typeof data.description !== 'string') {
    errors.push('Description must be a string');
  }
  
  // Validate coordinates if provided
  if (data.latitude !== undefined && data.longitude !== undefined) {
    if (typeof data.latitude !== 'number' || data.latitude < -90 || data.latitude > 90) {
      errors.push('Latitude must be a number between -90 and 90');
    }
    if (typeof data.longitude !== 'number' || data.longitude < -180 || data.longitude > 180) {
      errors.push('Longitude must be a number between -180 and 180');
    }
  }
  
  return errors;
};

// ARTIST ROUTES
// GET route - Fetch artist by ID
router.get('/artist/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    // Extract artist ID from route parameters
    const { id } = req.params;

    // Validate ID exists
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return res.status(400).json({ 
        error: 'Artist ID is required',
        code: 'INVALID_ID'
      });
    }

    // Sanitize ID
    const sanitizedId = id.trim();

    // Fetch artist from database
    const artist = await Artist.findById(sanitizedId);
    
    if (!artist) {
      return res.status(404).json({ 
        error: 'Artist not found',
        code: 'ARTIST_NOT_FOUND'
      });
    }

    return res.status(200).json({ 
      success: true, 
      data: artist,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching artist:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      code: 'FETCH_ERROR',
      message: errorMessage || 'Failed to fetch artist data'
    });
  }
});

// POST route - Create new artist
router.post('/artist', requireAuth, async (req: Request, res: Response) => {
  try {
    const { name, bio, profileImage } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ 
        error: 'Artist name is required',
        code: 'MISSING_FIELD',
        field: 'name'
      });
    }

    // Validate input data
    const validationErrors = validateArtistInput({ name, bio, profileImage });
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: validationErrors
      });
    }

    // Sanitize inputs
    const sanitizedName = name.trim();
    const sanitizedBio = bio ? bio.trim() : '';
    const sanitizedProfileImage = profileImage ? profileImage.trim() : '';

    // Check if artist already exists
    const existingArtist = await Artist.findOne({ name: sanitizedName });
    if (existingArtist) {
      return res.status(409).json({ 
        error: 'Artist already exists',
        code: 'ARTIST_EXISTS'
      });
    }

    // Create artist in database
    const newArtist = new Artist({
      name: sanitizedName,
      bio: sanitizedBio,
      profileImage: sanitizedProfileImage,
    });

    await newArtist.save();

    return res.status(201).json({ 
      success: true, 
      data: newArtist,
      message: 'Artist created successfully'
    });
  } catch (error: unknown) {
    console.error('Error creating artist:', error);
    const message = error instanceof Error ? error.message : 'Failed to create artist';
    return res.status(500).json({ 
      error: 'Internal server error',
      code: 'CREATE_ERROR',
      message
    });
  }
});

// PUT route - Update artist
router.put('/artist/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    // Extract artist ID from route parameters
    const { id } = req.params;

    // Validate ID exists
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return res.status(400).json({ 
        error: 'Artist ID is required',
        code: 'INVALID_ID'
      });
    }

    const { name, bio, profileImage } = req.body;

    // Validate update fields if provided
    if (name !== undefined) {
      const validationErrors = validateArtistInput({ name, bio, profileImage });
      if (validationErrors.length > 0) {
        return res.status(400).json({ 
          error: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: validationErrors
        });
      }
    }

    // Sanitize inputs
    const sanitizedName = name ? name.trim() : undefined;
    const sanitizedBio = bio ? bio.trim() : undefined;
    const sanitizedProfileImage = profileImage ? profileImage.trim() : undefined;
    const sanitizedId = id.trim();

    // Update artist in database
    const updatedArtist = await Artist.findByIdAndUpdate(
      sanitizedId,
      {
        ...(sanitizedName !== undefined && { name: sanitizedName }),
        ...(sanitizedBio !== undefined && { bio: sanitizedBio }),
        ...(sanitizedProfileImage !== undefined && { profileImage: sanitizedProfileImage })
      },
      { new: true } // Return updated document
    );
    
    if (!updatedArtist) {
      return res.status(404).json({ 
        error: 'Artist not found',
        code: 'ARTIST_NOT_FOUND'
      });
    }

    return res.status(200).json({ 
      success: true, 
      data: updatedArtist,
      message: 'Artist updated successfully'
    });
  } catch (error: unknown) {
    console.error('Error updating artist:', error);
    const message = error instanceof Error ? error.message : 'Failed to update artist';
    return res.status(500).json({ 
      error: 'Internal server error',
      code: 'UPDATE_ERROR',
      message
    });
  }
});

// DELETE route - Delete artist
router.delete('/artist/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    // Extract artist ID from route parameters
    const { id } = req.params;

    // Validate ID exists
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return res.status(400).json({ 
        error: 'Artist ID is required',
        code: 'INVALID_ID'
      });
    }

    // Sanitize ID
    const sanitizedId = id.trim();

    // Delete artist from database
    const deletedArtist = await Artist.findByIdAndDelete(sanitizedId);
    
    if (!deletedArtist) {
      return res.status(404).json({ 
        error: 'Artist not found',
        code: 'ARTIST_NOT_FOUND'
      });
    }

    return res.status(200).json({ 
      success: true,
      message: `Artist ${sanitizedId} deleted successfully`,
      deletedId: sanitizedId,
      timestamp: new Date().toISOString()
    });
  } catch (error: unknown) {
    console.error('Error deleting artist:', error);
    const message = error instanceof Error ? error.message : 'Failed to delete artist';
    return res.status(500).json({ 
      error: 'Internal server error',
      code: 'DELETE_ERROR',
      message
    });
  }
});

// SONG ROUTES
// GET route - Fetch song by ID
router.get('/song/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    // Extract song ID from route parameters
    const { id } = req.params;

    // Validate ID exists
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return res.status(400).json({ 
        error: 'Song ID is required',
        code: 'INVALID_ID'
      });
    }

    // Sanitize ID
    const sanitizedId = id.trim();

    // Fetch song from database
    const song = await Song.findById(sanitizedId).populate('artistId');
    
    if (!song) {
      return res.status(404).json({ 
        error: 'Song not found',
        code: 'SONG_NOT_FOUND'
      });
    }

    return res.status(200).json({ 
      success: true, 
      data: song,
      timestamp: new Date().toISOString()
    });
  } catch (error: unknown) {
    console.error('Error fetching song:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch song data';
    return res.status(500).json({ 
      error: 'Internal server error',
      code: 'FETCH_ERROR',
      message
    });
  }
});

// GET route - Fetch all songs (with optional filters)
router.get('/songs', requireAuth, async (req: Request, res: Response) => {
  try {
    const { artistId, limit = 20, offset = 0, genre, search } = req.query;

    // Build query object
    const query: any = {};
    
    if (artistId) {
      query.artistId = artistId;
    }
    
    if (genre) {
      query.genre = { $regex: String(genre), $options: 'i' }; // Case-insensitive search
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: String(search), $options: 'i' } },
        { artist: { $regex: String(search), $options: 'i' } }
      ];
    }

    // Convert limit and offset to numbers
    const limitNum = parseInt(String(limit), 10);
    const offsetNum = parseInt(String(offset), 10);

    // Fetch songs from database with pagination
    const songs = await Song.find(query)
      .populate('artistId')
      .limit(limitNum)
      .skip(offsetNum)
      .sort({ createdAt: -1 }); // Sort by newest first

    // Get total count for pagination
    const total = await Song.countDocuments(query);

    return res.status(200).json({ 
      success: true, 
      data: {
        songs,
        total,
        limit: limitNum,
        offset: offsetNum
      },
      timestamp: new Date().toISOString()
    });
  } catch (error: unknown) {
    console.error('Error fetching songs:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch songs data';
    return res.status(500).json({ 
      error: 'Internal server error',
      code: 'FETCH_ERROR',
      message
    });
  }
});

// POST route - Create new song
router.post('/song', requireAuth, async (req: Request, res: Response) => {
  try {
    const { title, artist, album, duration, genre, lyrics, coverImage, filePath, language } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ 
        error: 'Song title is required',
        code: 'MISSING_FIELD',
        field: 'title'
      });
    }

    if (!artist) {
      return res.status(400).json({ 
        error: 'Artist name is required',
        code: 'MISSING_FIELD',
        field: 'artist'
      });
    }

    if (!duration) {
      return res.status(400).json({ 
        error: 'Duration is required',
        code: 'MISSING_FIELD',
        field: 'duration'
      });
    }

    // Validate input data
    const validationErrors = validateSongInput({ title, album, duration, genre });
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: validationErrors
      });
    }

    // Sanitize inputs
    const sanitizedTitle = title.trim();
    const sanitizedArtist = artist.trim();
    const sanitizedAlbum = album ? album.trim() : '';
    const sanitizedDuration = duration.trim();
    const sanitizedGenre = genre ? genre.trim() : '';
    const sanitizedLyrics = lyrics ? lyrics.trim() : '';
    const sanitizedCoverImage = coverImage ? coverImage.trim() : '';
    const sanitizedFilePath = filePath ? filePath.trim() : '';
    const sanitizedLanguage = language ? language.trim() : 'Mongolian';

    // Check if song already exists
    const existingSong = await Song.findOne({ 
      title: sanitizedTitle, 
      artist: sanitizedArtist 
    });
    
    if (existingSong) {
      return res.status(409).json({ 
        error: 'Song already exists',
        code: 'SONG_EXISTS'
      });
    }

    // Check if artist exists, create if not
    let artistId: any = null;
    const existingArtist = await Artist.findOne({ name: sanitizedArtist });
    if (!existingArtist) {
      const newArtist = await Artist.create({
        name: sanitizedArtist,
      });
      artistId = newArtist._id;
    } else {
      artistId = existingArtist._id;
    }

    // Create song in database
    const newSong = new Song({
      title: sanitizedTitle,
      artist: sanitizedArtist,
      artistId: artistId,
      album: sanitizedAlbum,
      duration: sanitizedDuration,
      genre: sanitizedGenre,
      lyrics: sanitizedLyrics,
      coverImage: sanitizedCoverImage,
      filePath: sanitizedFilePath,
      language: sanitizedLanguage,
    });

    await newSong.save();

    // Populate the artistId in the response
    await newSong.populate('artistId');

    return res.status(201).json({ 
      success: true, 
      data: newSong,
      message: 'Song created successfully'
    });
  } catch (error: unknown) {
    console.error('Error creating song:', error);
    const message = error instanceof Error ? error.message : 'Failed to create song';
    return res.status(500).json({ 
      error: 'Internal server error',
      code: 'CREATE_ERROR',
      message
    });
  }
});

// PUT route - Update song
router.put('/song/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    // Extract song ID from route parameters
    const { id } = req.params;

    // Validate ID exists
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return res.status(400).json({ 
        error: 'Song ID is required',
        code: 'INVALID_ID'
      });
    }

    const { title, artist, album, duration, genre, lyrics, coverImage, filePath, language } = req.body;

    // Validate update fields if provided
    if (title !== undefined || artist !== undefined || album !== undefined || 
        duration !== undefined || genre !== undefined || lyrics !== undefined || 
        coverImage !== undefined || filePath !== undefined || language !== undefined) {
      const partialData: SongInput = {};
      if (title !== undefined) partialData.title = title;
      if (album !== undefined) partialData.album = album;
      if (duration !== undefined) partialData.duration = duration;
      if (genre !== undefined) partialData.genre = genre;
      
      const validationErrors = validateSongInput(partialData);
      if (validationErrors.length > 0) {
        return res.status(400).json({ 
          error: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: validationErrors
        });
      }
    }

    // Sanitize inputs
    const sanitizedTitle = title ? title.trim() : undefined;
    const sanitizedArtist = artist ? artist.trim() : undefined;
    const sanitizedAlbum = album ? album.trim() : undefined;
    const sanitizedDuration = duration ? duration.trim() : undefined;
    const sanitizedGenre = genre ? genre.trim() : undefined;
    const sanitizedLyrics = lyrics ? lyrics.trim() : undefined;
    const sanitizedCoverImage = coverImage ? coverImage.trim() : undefined;
    const sanitizedFilePath = filePath ? filePath.trim() : undefined;
    const sanitizedLanguage = language ? language.trim() : undefined;
    const sanitizedId = id.trim();

    // Update song in database
    const updatedSong = await Song.findByIdAndUpdate(
      sanitizedId,
      {
        ...(sanitizedTitle !== undefined && { title: sanitizedTitle }),
        ...(sanitizedArtist !== undefined && { artist: sanitizedArtist }),
        ...(sanitizedAlbum !== undefined && { album: sanitizedAlbum }),
        ...(sanitizedDuration !== undefined && { duration: sanitizedDuration }),
        ...(sanitizedGenre !== undefined && { genre: sanitizedGenre }),
        ...(sanitizedLyrics !== undefined && { lyrics: sanitizedLyrics }),
        ...(sanitizedCoverImage !== undefined && { coverImage: sanitizedCoverImage }),
        ...(sanitizedFilePath !== undefined && { filePath: sanitizedFilePath }),
        ...(sanitizedLanguage !== undefined && { language: sanitizedLanguage })
      },
      { new: true } // Return updated document
    ).populate('artistId');
    
    if (!updatedSong) {
      return res.status(404).json({ 
        error: 'Song not found',
        code: 'SONG_NOT_FOUND'
      });
    }

    return res.status(200).json({ 
      success: true, 
      data: updatedSong,
      message: 'Song updated successfully'
    });
  } catch (error: unknown) {
    console.error('Error updating song:', error);
    const message = error instanceof Error ? error.message : 'Failed to update song';
    return res.status(500).json({ 
      error: 'Internal server error',
      code: 'UPDATE_ERROR',
      message
    });
  }
});

// DELETE route - Delete song
router.delete('/song/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    // Extract song ID from route parameters
    const { id } = req.params;

    // Validate ID exists
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return res.status(400).json({ 
        error: 'Song ID is required',
        code: 'INVALID_ID'
      });
    }

    // Sanitize ID
    const sanitizedId = id.trim();

    // Delete song from database
    const deletedSong = await Song.findByIdAndDelete(sanitizedId);
    
    if (!deletedSong) {
      return res.status(404).json({ 
        error: 'Song not found',
        code: 'SONG_NOT_FOUND'
      });
    }

    return res.status(200).json({ 
      success: true,
      message: `Song ${sanitizedId} deleted successfully`,
      deletedId: sanitizedId,
      timestamp: new Date().toISOString()
    });
  } catch (error: unknown) {
    console.error('Error deleting song:', error);
    const message = error instanceof Error ? error.message : 'Failed to delete song';
    return res.status(500).json({ 
      error: 'Internal server error',
      code: 'DELETE_ERROR',
      message
    });
  }
});

// LOCATION ROUTES (for karaoke places)
// GET route - Fetch location by ID
router.get('/location/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    // Extract location ID from route parameters
    const { id } = req.params;

    // Validate ID exists
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return res.status(400).json({ 
        error: 'Location ID is required',
        code: 'INVALID_ID'
      });
    }

    // Sanitize ID
    const sanitizedId = id.trim();

    // TODO: Implement logic to fetch location data by ID from database
    // For now, returning a mock response
    const locationData = {
      id: sanitizedId,
      name: `Karaoke Place ${sanitizedId}`,
      address: '123 Sample Street, City, Country',
      phone: '+1-234-567-8900',
      latitude: 40.7128,
      longitude: -74.0060,
      description: 'A great place for karaoke singing',
      website: 'https://example.com',
      hours: {
        monday: '10:00-22:00',
        tuesday: '10:00-22:00',
        wednesday: '10:00-22:00',
        thursday: '10:00-23:00',
        friday: '10:00-01:00',
        saturday: '09:00-01:00',
        sunday: '12:00-20:00'
      },
      rating: 4.5,
      reviews: 128,
      coverImage: '/api/placeholder/400/200',
      createdAt: new Date().toISOString()
    };

    return res.status(200).json({ 
      success: true, 
      data: locationData,
      timestamp: new Date().toISOString()
    });
  } catch (error: unknown) {
    console.error('Error fetching location:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch location data';
    return res.status(500).json({ 
      error: 'Internal server error',
      code: 'FETCH_ERROR',
      message
    });
  }
});

// GET route - Fetch all locations (with optional filters)
router.get('/locations', requireAuth, async (req: Request, res: Response) => {
  try {
    const { limit = 20, offset = 0 } = req.query;

    // TODO: Implement logic to fetch locations from database with filters
    // For now, returning a mock response
    const locations = Array.from({ length: 5 }, (_, i) => ({
      id: `location-${i + 1}`,
      name: `Karaoke Spot ${i + 1}`,
      address: `${i + 123} Main Street, City ${i + 1}`,
      phone: `+1-${i}23-456-789${i}`,
      latitude: 40.7128 + (i * 0.01),
      longitude: -74.0060 + (i * 0.01),
      description: `A great karaoke spot at location ${i + 1}`,
      website: `https://karaoke${i + 1}.com`,
      rating: 4.0 + (Math.random() * 1),
      reviews: Math.floor(Math.random() * 200),
      coverImage: `/api/placeholder/400/200`,
      distance: Math.floor(Math.random() * 10) + 1 // in km
    }));

    return res.status(200).json({ 
      success: true, 
      data: {
        locations,
        total: 5,
        limit: parseInt(String(limit)),
        offset: parseInt(String(offset))
      },
      timestamp: new Date().toISOString()
    });
  } catch (error: unknown) {
    console.error('Error fetching locations:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch locations data';
    return res.status(500).json({ 
      error: 'Internal server error',
      code: 'FETCH_ERROR',
      message
    });
  }
});

// POST route - Create new location
router.post('/location', requireAuth, async (req: Request, res: Response) => {
  try {
    const { name, address, phone, latitude, longitude, description, website } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ 
        error: 'Location name is required',
        code: 'MISSING_FIELD',
        field: 'name'
      });
    }

    if (!address) {
      return res.status(400).json({ 
        error: 'Address is required',
        code: 'MISSING_FIELD',
        field: 'address'
      });
    }

    // Validate input data
    const validationErrors = validateLocationInput({ name, address, phone, latitude, longitude, description });
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: validationErrors
      });
    }

    // Sanitize inputs
    const sanitizedName = name.trim();
    const sanitizedAddress = address.trim();
    const sanitizedPhone = phone ? phone.trim() : '';
    const sanitizedDescription = description ? description.trim() : '';
    const sanitizedWebsite = website ? website.trim() : '';

    // TODO: Implement logic to create location in database
    // For now, returning a mock response
    const newLocation = {
      id: Date.now().toString(), // Mock ID
      name: sanitizedName,
      address: sanitizedAddress,
      phone: sanitizedPhone,
      latitude: latitude || 0,
      longitude: longitude || 0,
      description: sanitizedDescription,
      website: sanitizedWebsite,
      hours: {
        monday: '10:00-22:00',
        tuesday: '10:00-22:00',
        wednesday: '10:00-22:00',
        thursday: '10:00-23:00',
        friday: '10:00-01:00',
        saturday: '09:00-01:00',
        sunday: '12:00-20:00'
      },
      rating: 0,
      reviews: 0,
      coverImage: '/api/placeholder/400/200',
      createdAt: new Date().toISOString()
    };

    return res.status(201).json({ 
      success: true, 
      data: newLocation,
      message: 'Location created successfully'
    });
  } catch (error: unknown) {
    console.error('Error creating location:', error);
    const message = error instanceof Error ? error.message : 'Failed to create location';
    return res.status(500).json({ 
      error: 'Internal server error',
      code: 'CREATE_ERROR',
      message
    });
  }
});

// PUT route - Update location
router.put('/location/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    // Extract location ID from route parameters
    const { id } = req.params;

    // Validate ID exists
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return res.status(400).json({ 
        error: 'Location ID is required',
        code: 'INVALID_ID'
      });
    }

    const { name, address, phone, latitude, longitude, description, website } = req.body;

    // Validate update fields if provided
    if (name !== undefined || address !== undefined || phone !== undefined || 
        latitude !== undefined || longitude !== undefined || description !== undefined || 
        website !== undefined) {
      const validationErrors = validateLocationInput({ name, address, phone, latitude, longitude, description });
      if (validationErrors.length > 0) {
        return res.status(400).json({ 
          error: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: validationErrors
        });
      }
    }

    // Sanitize inputs
    const sanitizedName = name ? name.trim() : undefined;
    const sanitizedAddress = address ? address.trim() : undefined;
    const sanitizedPhone = phone ? phone.trim() : undefined;
    const sanitizedDescription = description ? description.trim() : undefined;
    const sanitizedWebsite = website ? website.trim() : undefined;
    const sanitizedId = id.trim();

    // TODO: Implement logic to update location in database
    // For now, returning a mock response
    const updatedLocation = {
      id: sanitizedId,
      name: sanitizedName || `Karaoke Place ${sanitizedId}`,
      address: sanitizedAddress || '123 Sample Street, City, Country',
      phone: sanitizedPhone || '+1-234-567-8900',
      latitude: latitude !== undefined ? latitude : 40.7128,
      longitude: longitude !== undefined ? longitude : -74.0060,
      description: sanitizedDescription || 'A great place for karaoke singing',
      website: sanitizedWebsite || 'https://example.com',
      hours: {
        monday: '10:00-22:00',
        tuesday: '10:00-22:00',
        wednesday: '10:00-22:00',
        thursday: '10:00-23:00',
        friday: '10:00-01:00',
        saturday: '09:00-01:00',
        sunday: '12:00-20:00'
      },
      updatedAt: new Date().toISOString(),
      rating: 4.5,
      reviews: 128,
      coverImage: '/api/placeholder/400/200'
    };

    return res.status(200).json({ 
      success: true, 
      data: updatedLocation,
      message: 'Location updated successfully'
    });
  } catch (error: unknown) {
    console.error('Error updating location:', error);
    const message = error instanceof Error ? error.message : 'Failed to update location';
    return res.status(500).json({ 
      error: 'Internal server error',
      code: 'UPDATE_ERROR',
      message
    });
  }
});

// DELETE route - Delete location
router.delete('/location/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    // Extract location ID from route parameters
    const { id } = req.params;

    // Validate ID exists
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return res.status(400).json({ 
        error: 'Location ID is required',
        code: 'INVALID_ID'
      });
    }

    // Sanitize ID
    const sanitizedId = id.trim();

    // TODO: Implement logic to delete location from database
    // For now, returning a mock success response
    return res.status(200).json({ 
      success: true,
      message: `Location ${sanitizedId} deleted successfully`,
      deletedId: sanitizedId,
      timestamp: new Date().toISOString()
    });
  } catch (error: unknown) {
    console.error('Error deleting location:', error);
    const message = error instanceof Error ? error.message : 'Failed to delete location';
    return res.status(500).json({ 
      error: 'Internal server error',
      code: 'DELETE_ERROR',
      message
    });
  }
});

export default router;