import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';

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

    // TODO: Implement logic to fetch artist data by ID from database
    // For now, returning a mock response
    const artistData = {
      id: sanitizedId,
      name: `Artist ${sanitizedId}`,
      bio: 'Sample bio for this artist',
      profileImage: '/api/placeholder/200/200',
      verified: false,
      followers: 1234,
      tracks: 42,
      albums: 5,
      createdAt: new Date().toISOString()
    };

    return res.status(200).json({ 
      success: true, 
      data: artistData,
      timestamp: new Date().toISOString()
    });
  } catch (error: unknown) {
    console.error('Error fetching artist:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch artist data';
    return res.status(500).json({ 
      error: 'Internal server error',
      code: 'FETCH_ERROR',
      message
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
    const sanitizedProfileImage = profileImage ? profileImage.trim() : '/api/placeholder/200/200';

    // TODO: Implement logic to create artist in database
    // For now, returning a mock response
    const newArtist = {
      id: Date.now().toString(), // Mock ID
      name: sanitizedName,
      bio: sanitizedBio,
      profileImage: sanitizedProfileImage,
      verified: false,
      createdAt: new Date().toISOString(),
      followers: 0,
      tracks: 0,
      albums: 0
    };

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

    // TODO: Implement logic to update artist in database
    // For now, returning a mock response
    const updatedArtist = {
      id: sanitizedId,
      name: sanitizedName || `Artist ${sanitizedId}`,
      bio: sanitizedBio || 'Sample bio for this artist',
      profileImage: sanitizedProfileImage || '/api/placeholder/200/200',
      verified: false,
      updatedAt: new Date().toISOString(),
      followers: 1234,
      tracks: 42,
      albums: 5
    };

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

    // TODO: Implement logic to delete artist from database
    // For now, returning a mock success response
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

export default router;