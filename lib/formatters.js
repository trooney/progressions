import {
  DISPLAY_ACCIDENTALS,
  DISPLAY_OTHERS,
  DISPLAY_DEGREES,
} from "./constants";

export function formatAccidental(str) {
  return DISPLAY_ACCIDENTALS[str];
}

export function formatNote(str) {
  let normalized = str;

  Object.keys(DISPLAY_OTHERS).forEach((key) => {
    normalized = normalized.replaceAll(key, DISPLAY_OTHERS[key]);
  });

  return normalized;
}

export function formatDegree(str) {
  let normalized = str;

  Object.keys(DISPLAY_DEGREES).forEach((key) => {
    normalized = normalized.replaceAll(key, DISPLAY_DEGREES[key]);
  });

  return normalized;
}
