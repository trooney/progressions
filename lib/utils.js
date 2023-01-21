import { Chord, Note, Scale, Progression, Tonal } from "@tonaljs/tonal";

if (typeof window !== "undefined") {
  window.Tonal = Tonal;
  window.Note = Note;
  window.Chord = Chord;
  window.Scale = Scale;
  window.Progression = Progression;
}

import { PROGRESSIONS } from "./constants";

export function getAllAccidentals() {
  return [
    { value: "", displayName: "(N)" },
    { value: "b", displayName: "b" },
    { value: "#", displayName: "#" },
  ];
}

export function getDefaultProgressions() {
  return PROGRESSIONS;
}

export function getDefaultProgressionStr() {
  return PROGRESSIONS[0].progression;
}
