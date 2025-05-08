import { ClefType } from "../StoryEditor";

// Define note ranges based on staff and maxLedgerLines
// For each note, we define the octave ranges that fall within the allowed ledger lines
const NOTE_RANGES = {
  treble: {
    // Treble clef staff: E4 to F5 (no ledger lines)
    // Below staff ledger lines: C4(1), A3(2), F3(3)
    // Above staff ledger lines: A5(1), C6(2), E6(3)
    'A': [4, 5],
    'B': [4],
    'C': [4, 5],
    'D': [4, 5],
    'E': [4, 5],
    'F': [4, 5],
    'G': [4, 5],
  },
  bass: {
    // Bass clef staff: G2 to A3 (no ledger lines)
    // Below staff ledger lines: E2(1), C2(2), A1(3)  
    // Above staff ledger lines: C4(1), E4(2), G4(3)
    'A': [3],
    'B': [3],
    'C': [3, 4],
    'D': [3],
    'E': [2, 3],
    'F': [3],
    'G': [2, 3],
  }
};

/**
 * Computes a VexFlow notes string from a word
 * 
 * @param word The word to convert to notes
 * @param clefType The clef type (treble, bass, or both)
 * @param maxLedgerLines Maximum number of ledger lines to use
 * @returns An object containing the notes string and selected clef
 */
export const computeNotes = (
  word: string, 
  clefType: ClefType, 
  maxLedgerLines: number
): { notes: string; clef: string; time: string } => {
  // If clefType is 'both', randomly select 'treble' or 'bass', otherwise use specified clef
  const clef = clefType === "both" ? (Math.random() < 0.5 ? "treble" : "bass") : clefType;
  
  // Filter note ranges based on maxLedgerLines
  const filteredRanges = { ...NOTE_RANGES[clef] };
  
  if (maxLedgerLines < 1) {
    // Restrict octave ranges if no ledger lines are allowed
    if (clef === 'treble') {
      filteredRanges['A'] = [4];
      filteredRanges['C'] = [5];
    } else { // bass clef
      filteredRanges['C'] = [3];
      filteredRanges['E'] = [3];
      filteredRanges['G'] = [3];
    }
  }
  
  const time = `${word.length * 2}/2`;
  const notes = word
    .split("")
    .map((c, ix) => {
      const note = c.toUpperCase();
      // Only use notes A-G, provide default octave for non-musical characters
      const possibleOctaves = (note >= 'A' && note <= 'G' ? filteredRanges[note as keyof typeof filteredRanges] : null) || [clef === 'treble' ? 4 : 3];
      const octave = possibleOctaves[Math.floor(Math.random() * possibleOctaves.length)];
      
      return ix === 0 ? `${note}${octave}/w` : `${note}${octave}`;
    })
    .join(", ");

  return { notes, clef, time };
};