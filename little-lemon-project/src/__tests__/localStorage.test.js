import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  saveReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  clearAllReservations
} from '../utils/localStorage';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
});

describe('localStorage utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset localStorage mock to default behavior
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockReturnValue(undefined);
    localStorageMock.removeItem.mockReturnValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('saveReservation', () => {
    it('should save a new reservation to localStorage', () => {
      const reservationData = {
        name: 'John Doe',
        email: 'john@example.com',
        date: '2025-01-15',
        time: '18:00',
        guests: '2'
      };

      // Mock empty reservations array
      localStorageMock.getItem.mockReturnValue('[]');

      const result = saveReservation(reservationData);

      expect(result).toMatchObject(reservationData);
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeDefined();
      expect(result.status).toBe('confirmed');
      expect(localStorageMock.getItem).toHaveBeenCalledWith('littleLemonReservations');
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'littleLemonReservations',
        expect.stringContaining('"name":"John Doe"')
      );
    });

    it('should add to existing reservations', () => {
      const existingReservations = [
        { id: '1', name: 'Existing User', status: 'confirmed' }
      ];
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingReservations));

      const newReservation = { name: 'New User', email: 'new@example.com' };
      const result = saveReservation(newReservation);

      expect(result).toMatchObject(newReservation);
      expect(localStorageMock.setItem).toHaveBeenCalled();
      
      // Verify the saved data includes both reservations
      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
      expect(savedData).toHaveLength(2);
      expect(savedData[0]).toMatchObject(existingReservations[0]);
      expect(savedData[1]).toMatchObject(newReservation);
    });

    it('should handle localStorage getItem errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage getItem error');
      });

      const result = saveReservation({ name: 'Test' });

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error saving reservation to localStorage:', 
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });

    it('should handle localStorage setItem errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      localStorageMock.getItem.mockReturnValue('[]');
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('localStorage setItem error');
      });

      const result = saveReservation({ name: 'Test' });

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error saving reservation to localStorage:', 
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });

    it('should handle malformed JSON in localStorage', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      localStorageMock.getItem.mockReturnValue('invalid json');

      const result = saveReservation({ name: 'Test' });

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error saving reservation to localStorage:', 
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });
  });

  describe('getReservations', () => {
    it('should return parsed reservations from localStorage', () => {
      const mockReservations = [
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' }
      ];
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockReservations));

      const result = getReservations();

      expect(result).toEqual(mockReservations);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('littleLemonReservations');
    });

    it('should return empty array when no reservations exist', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = getReservations();

      expect(result).toEqual([]);
    });

    it('should return empty array when localStorage contains empty string', () => {
      localStorageMock.getItem.mockReturnValue('');

      const result = getReservations();

      expect(result).toEqual([]);
    });

    it('should return empty array when localStorage throws error', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      const result = getReservations();

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error getting reservations from localStorage:', 
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });

    it('should return empty array when JSON parsing fails', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      localStorageMock.getItem.mockReturnValue('invalid json');

      const result = getReservations();

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error getting reservations from localStorage:', 
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });

    it('should return empty array when parsed data is not an array', () => {
      localStorageMock.getItem.mockReturnValue('{"not": "an array"}');

      const result = getReservations();

      expect(result).toEqual([]);
    });
  });

  describe('getReservationById', () => {
    it('should return specific reservation by ID', () => {
      const mockReservations = [
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' }
      ];
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockReservations));

      const result = getReservationById('2');

      expect(result).toEqual({ id: '2', name: 'Jane Smith' });
    });

    it('should return null when reservation not found', () => {
      localStorageMock.getItem.mockReturnValue('[]');

      const result = getReservationById('999');

      expect(result).toBeNull();
    });

    it('should return null when localStorage error occurs', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      const result = getReservationById('1');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error getting reservation by ID:', 
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });

    it('should handle null or undefined ID gracefully', () => {
      localStorageMock.getItem.mockReturnValue('[]');

      expect(getReservationById(null)).toBeNull();
      expect(getReservationById(undefined)).toBeNull();
      expect(getReservationById('')).toBeNull();
    });
  });

  describe('updateReservation', () => {
    it('should update existing reservation in localStorage', () => {
      const mockReservations = [
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com' }
      ];
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockReservations));

      const updatedData = { name: 'John Updated', email: 'john.updated@example.com' };
      const result = updateReservation('1', updatedData);

      expect(result).toMatchObject({ 
        id: '1', 
        name: 'John Updated',
        email: 'john.updated@example.com'
      });
      expect(result.updatedAt).toBeDefined();
      expect(localStorageMock.setItem).toHaveBeenCalled();
      
      // Verify the saved data
      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
      expect(savedData[0]).toMatchObject(updatedData);
      expect(savedData[1]).toMatchObject(mockReservations[1]); // Second reservation unchanged
    });

    it('should return null when updating non-existent reservation', () => {
      localStorageMock.getItem.mockReturnValue('[]');

      const result = updateReservation('999', { name: 'Test' });

      expect(result).toBeNull();
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });

    it('should return null when localStorage error occurs', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      const result = updateReservation('1', { name: 'Test' });

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error updating reservation:', 
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });

    it('should handle setItem errors during update', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      const mockReservations = [{ id: '1', name: 'John Doe' }];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockReservations));
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('setItem error');
      });

      const result = updateReservation('1', { name: 'Updated' });

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error updating reservation:', 
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });
  });

  describe('deleteReservation', () => {
    it('should remove reservation from localStorage', () => {
      const mockReservations = [
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' }
      ];
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockReservations));

      const result = deleteReservation('1');

      expect(result).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'littleLemonReservations',
        JSON.stringify([{ id: '2', name: 'Jane Smith' }])
      );
    });

    it('should return true even when deleting non-existent reservation', () => {
      localStorageMock.getItem.mockReturnValue('[]');

      const result = deleteReservation('999');

      expect(result).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'littleLemonReservations',
        '[]'
      );
    });

    it('should return false when localStorage error occurs', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      const result = deleteReservation('1');

      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error deleting reservation:', 
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });

    it('should return false when setItem throws error', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      localStorageMock.getItem.mockReturnValue('[]');
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('setItem error');
      });

      const result = deleteReservation('1');

      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error deleting reservation:', 
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });
  });

  describe('clearAllReservations', () => {
    it('should remove all reservations from localStorage', () => {
      const result = clearAllReservations();

      expect(result).toBe(true);
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('littleLemonReservations');
    });

    it('should return false when localStorage error occurs', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      localStorageMock.removeItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      const result = clearAllReservations();

      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error clearing reservations:', 
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });
  });

  describe('Edge cases', () => {
    it('should handle null data passed to saveReservation', () => {
      localStorageMock.getItem.mockReturnValue('[]');

      const result = saveReservation(null);

      expect(result).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        status: 'confirmed'
      });
    });

    it('should handle undefined data passed to saveReservation', () => {
      localStorageMock.getItem.mockReturnValue('[]');

      const result = saveReservation(undefined);

      expect(result).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        status: 'confirmed'
      });
    });

    it('should handle empty object passed to saveReservation', () => {
      localStorageMock.getItem.mockReturnValue('[]');

      const result = saveReservation({});

      expect(result).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        status: 'confirmed'
      });
    });

    it('should maintain data integrity with multiple operations', () => {
      // Start with empty storage
      localStorageMock.getItem.mockReturnValue('[]');

      // Save first reservation
      const reservation1 = saveReservation({ name: 'User 1' });
      expect(reservation1).not.toBeNull();

      // Mock getItem to return the first reservation for subsequent operations
      const reservations = [reservation1];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(reservations));

      // Save second reservation
      const reservation2 = saveReservation({ name: 'User 2' });
      expect(reservation2).not.toBeNull();

      // Verify both reservations are in the saved data
      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[1][1]);
      expect(savedData).toHaveLength(2);
    });
  });
});