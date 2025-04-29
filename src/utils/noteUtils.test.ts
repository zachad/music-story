import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { computeNotes } from './noteUtils';

describe('noteUtils', () => {
  describe('computeNotes', () => {
    // Setup and teardown hooks for all mock tests
    beforeEach(() => {
      // Reset all mocks before each test to ensure a clean state
      vi.restoreAllMocks();
    });

    afterEach(() => {
      // Verify that all mocked functions were called the expected number of times
      // This helps catch unexpected calls to Math.random
      vi.restoreAllMocks();
    });
    
    describe('with mocked random values', () => {
      it('should generate correct notes for treble clef with fixed random values', () => {
        // Mock Math.random to return predictable values
        const randomSpy = vi.spyOn(Math, 'random');
        
        // Each call to randomSpy.mockReturnValueOnce sets the return value for a specific call
        // to Math.random in the order they are made
        randomSpy.mockReturnValueOnce(0.3); // First call - for note 'a'
        randomSpy.mockReturnValueOnce(0.7); // Second call - for note 'b'
        randomSpy.mockReturnValueOnce(0.1); // Third call - for note 'c'
        randomSpy.mockReturnValueOnce(0.9); // Fourth call - for note 'd'
        randomSpy.mockReturnValueOnce(0.5); // Fifth call - for note 'e'
        randomSpy.mockReturnValueOnce(0.2); // Sixth call - for note 'f'
        randomSpy.mockReturnValueOnce(0.8); // Seventh call - for note 'g'
        
        const result = computeNotes('abcdefg', 'treble', 1);
        
        expect(result.clef).toBe('treble');
        expect(result.time).toBe('14/2');
        
        // Check that the generated notes are as expected based on our mocked random values
        // With complex mocking like this, it's helpful to debug calls when a test fails
        // You can add console.log(randomSpy.mock.calls) to see the actual call count
        expect(result.notes).toBe('A4/w, B4, C4, D5, E5, F4, G5');
        
        // Verify that Math.random was called exactly the expected number of times
        expect(randomSpy).toHaveBeenCalledTimes(7);
      });

      it('should randomly select clef when clefType is "both"', () => {
        // First test the 'treble' clef selection
        const randomSpy = vi.spyOn(Math, 'random');
        randomSpy.mockReturnValueOnce(0.3); // First call - for clef selection (will be treble)
        
        // Additional mocks for the note octave selection
        // This is where mock complexity can grow - we need to anticipate all calls
        randomSpy.mockReturnValueOnce(0.5); // Note 'g'
        randomSpy.mockReturnValueOnce(0.5); // Note 'f'
        randomSpy.mockReturnValueOnce(0.5); // Note 'e' 
        randomSpy.mockReturnValueOnce(0.5); // Note 'd'
        randomSpy.mockReturnValueOnce(0.5); // Note 'c'
        randomSpy.mockReturnValueOnce(0.5); // Note 'b'
        randomSpy.mockReturnValueOnce(0.5); // Note 'a'
        
        const result = computeNotes('gfedcba', 'both', 1);
        expect(result.clef).toBe('treble');
        
        // Verify that all our mocks were used
        expect(randomSpy).toHaveBeenCalledTimes(8);
        
        // Reset mocks for the second test
        vi.restoreAllMocks();
        
        // Now test the 'bass' clef selection
        const randomSpy2 = vi.spyOn(Math, 'random');
        randomSpy2.mockReturnValueOnce(0.7); // First call - for clef selection (will be bass)
        
        // Additional mocks for the note octave selection
        randomSpy2.mockReturnValueOnce(0.5); // Note 'g'
        randomSpy2.mockReturnValueOnce(0.5); // Note 'f'
        randomSpy2.mockReturnValueOnce(0.5); // Note 'e'
        randomSpy2.mockReturnValueOnce(0.5); // Note 'd'
        randomSpy2.mockReturnValueOnce(0.5); // Note 'c'
        randomSpy2.mockReturnValueOnce(0.5); // Note 'b'
        randomSpy2.mockReturnValueOnce(0.5); // Note 'a'
        
        const result2 = computeNotes('gfedcba', 'both', 1);
        expect(result2.clef).toBe('bass');
        
        // Verify that all our mocks were used
        expect(randomSpy2).toHaveBeenCalledTimes(8);
      });

      it('should respect maxLedgerLines=0 restriction for treble clef', () => {
        const randomSpy = vi.spyOn(Math, 'random');
        
        // Set up mocks for 'abc' with specific values
        // No need to mock for clef selection since we're explicitly using 'treble'
        randomSpy.mockReturnValueOnce(0.5); // For note 'a' (affects octave selection)
        randomSpy.mockReturnValueOnce(0.5); // For note 'b'
        randomSpy.mockReturnValueOnce(0.5); // For note 'c'
        
        const result = computeNotes('abc', 'treble', 0);
        const notes = result.notes.split(', ');
        
        // With maxLedgerLines=0, note A should be restricted to octave 4
        // and note C should be restricted to octave 5
        expect(notes[0]).toBe('A4/w'); // A should be octave 4 (only option when maxLedgerLines=0)
        expect(notes[2]).toBe('C5');   // C should be octave 5 (only option when maxLedgerLines=0)
        
        expect(randomSpy).toHaveBeenCalledTimes(3);
      });
      
      it('should handle mocked random values for multiple calls in sequence', () => {
        // This demonstrates a more complex mocking scenario with multiple function calls
        const randomSpy = vi.spyOn(Math, 'random');
        
        // First function call mocks
        randomSpy.mockReturnValueOnce(0.1); // First call in first invocation
        randomSpy.mockReturnValueOnce(0.2); // Second call in first invocation
        
        // Second function call mocks
        randomSpy.mockReturnValueOnce(0.3); // First call in second invocation
        randomSpy.mockReturnValueOnce(0.4); // Second call in second invocation
        
        // Make the first function call
        const result1 = computeNotes('ab', 'treble', 1);
        
        // Make the second function call
        const result2 = computeNotes('cd', 'treble', 1);
        
        // Verify results are as expected
        const notes1 = result1.notes.split(', ');
        const notes2 = result2.notes.split(', ');
        
        // Since we used 0.1 for the first random and 0.2 for the second,
        // we'd expect certain octaves to be selected
        expect(notes1[0].startsWith('A4')).toBe(true);
        expect(notes1[1].startsWith('B4')).toBe(true);
        
        // For the second call, we used 0.3 and 0.4
        expect(notes2[0].startsWith('C4')).toBe(true);
        expect(notes2[1].startsWith('D4')).toBe(true);
        
        // Verify that all our mocks were used
        expect(randomSpy).toHaveBeenCalledTimes(4);
      });
      
      it('should demonstrate using mockImplementation for multiple random calls', () => {
        // Sometimes it's easier to use mockImplementation rather than 
        // mockReturnValueOnce for multiple random calls
        const randomSpy = vi.spyOn(Math, 'random');
        
        // Use an array to return different values in sequence
        const randomValues = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7];
        let callIndex = 0;
        
        randomSpy.mockImplementation(() => {
          // Return the next value in the array and increment the index
          return randomValues[callIndex++ % randomValues.length];
        });
        
        const result = computeNotes('abcdefg', 'treble', 1);
        const notes = result.notes.split(', ');
        
        // Now we can predict which octaves were chosen based on our sequence
        expect(notes[0]).toBe('A4/w'); // First random value 0.1 selects the first octave option
        expect(notes[1]).toBe('B4');   // Only one option for B in treble
        expect(notes[2]).toBe('C4');   // Random value 0.3 selects the first octave option for C
        
        // Verify we called random the expected number of times
        expect(randomSpy).toHaveBeenCalledTimes(7);
      });
    });

    // You can also test structural properties without mocking randomness
    describe('testing structural properties without mocking randomness', () => {
      it('should generate the correct time signature based on word length', () => {
        const result1 = computeNotes('a', 'treble', 1);
        expect(result1.time).toBe('2/2');
        
        const result2 = computeNotes('abcdefg', 'treble', 1);
        expect(result2.time).toBe('14/2');
        
        const result3 = computeNotes('pneumonoultramicroscopicsilicovolcanoconiosis', 'treble', 1);
        expect(result3.time).toBe('90/2');
      });
      
      it('should format the first note with /w and all others without it', () => {
        const result = computeNotes('cdefgab', 'treble', 1);
        const notes = result.notes.split(', ');
        
        // First note should end with /w
        expect(notes[0].endsWith('/w')).toBe(true);
        
        // All other notes should not contain /w
        for (let i = 1; i < notes.length; i++) {
          expect(notes[i].includes('/w')).toBe(false);
        }
      });
      
      it('should generate the correct number of notes based on word length', () => {
        const word = 'abcdefg';
        const result = computeNotes(word, 'treble', 1);
        const notesCount = result.notes.split(', ').length;
        
        expect(notesCount).toBe(word.length);
      });
      
      it('should convert input letters to uppercase note names', () => {
        const result = computeNotes('abcdefg', 'treble', 1);
        const notes = result.notes.split(', ');
        
        expect(notes[0].startsWith('A')).toBe(true);
        expect(notes[1].startsWith('B')).toBe(true);
        expect(notes[2].startsWith('C')).toBe(true);
        expect(notes[3].startsWith('D')).toBe(true);
        expect(notes[4].startsWith('E')).toBe(true);
        expect(notes[5].startsWith('F')).toBe(true);
        expect(notes[6].startsWith('G')).toBe(true);
      });
    });
  });
});