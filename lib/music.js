import { Chord, Progression, Note } from "@tonaljs/tonal";
import { OCTAVE_MAP } from "./constants";

export function simpleGenerator(tonicNote, chordProgression) {
  const tonicLetter = Note.get(tonicNote).letter;
  const tonicPos = OCTAVE_MAP.findIndex(({ note }) => note == tonicLetter);

  const availableNotes = OCTAVE_MAP.slice(tonicPos);

  // console.log("availableNotes", availableNotes);

  const chords = Progression.fromRomanNumerals(tonicNote, chordProgression);

  const playable = chords.map(Chord.get).map((chord) => {
    // console.log("chord", chord);
    const chordNoteLetter = Note.get(chord.tonic).letter;
    const octave =
      availableNotes.find(({ note }) => note == chordNoteLetter)?.octave || 3;

    const notes = chord.intervals
      .map(Note.transposeFrom(`${Note.simplify(chord.tonic)}${octave}`))
      .map(Note.simplify);

    // console.log("match", chord.name, chordNoteLetter, octave);

    return notes;
  });

  // console.log("playable", playable);

  // { time: "1:3:0", note: ["E4", "G4", "B5"], chord: "Em" },

  const toneEvents = [];

  playable.forEach((chordNotes, measure) => {
    const chordName = chords[measure];

    for (let i = 0; i <= 3; i++) {
      const event = {
        time: `${measure}:${i}:0`,
        note: chordNotes,
        progressionIndex: measure,
        chord: chordName,
      };
      toneEvents.push(event);
    }
  });

  return {
    measureCount: chords.length,
    toneEvents,
  };
}
