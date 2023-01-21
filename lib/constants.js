export const OCTAVE_MAP = [
  {
    note: "C",
    octave: 4,
  },
  {
    note: "D",
    octave: 4,
  },
  {
    note: "E",
    octave: 4,
  },
  {
    note: "F",
    octave: 4,
  },
  {
    note: "G",
    octave: 4,
  },
  {
    note: "A",
    octave: 4,
  },
  {
    note: "B",
    octave: 4,
  },
  {
    note: "C",
    octave: 5,
  },
  {
    note: "D",
    octave: 5,
  },
  {
    note: "E",
    octave: 5,
  },
  {
    note: "F",
    octave: 5,
  },
  {
    note: "G",
    octave: 5,
  },
  {
    note: "A",
    octave: 5,
  },
  {
    note: "B",
    octave: 5,
  },
];

export const PROGRESSIONS = [
  {
    name: "Simple Test",
    key: "C",
    progression: "I IV V",
  },
  {
    name: "Major",
    key: "C",
    progression: "I IIm IIIm IV V VIm viio", // VIIm7b5
  },
  {
    name: "Minor",
    key: "C",
    progression: "Im iio bIII IVm Vm bVI bVII",
  },
  {
    name: "Pop Major",
    key: "C",
    progression: "I V VIm IV",
  },
  {
    name: "Pop Minor",
    key: "C",
    progression: "Im bVI bIII bVII",
  },
  {
    name: "50s",
    key: "C",
    progression: "I VIm IV V",
  },
  {
    name: "Pachelbel",
    key: "D",
    progression: "I V VIm IIIm IV I IV V",
  },
  {
    name: "Country",
    key: "C",
    progression: "I IV V I",
  },
  {
    name: "12 Bar Blues",
    key: "C",
    progression: "I7 I7 I7 I7 IV7 IV7 I7 I7 V7 IV7 I7 I7",
  },
  {
    name: "Two-Five-One",
    key: "C",
    progression: "IIm V7 IMaj7",
  },
];

export const DISPLAY_ACCIDENTALS = {
  "": "(N)",
  b: "b",
  "#": "#",
};

export const DISPLAY_OTHERS = {
  o: "°",
  "#": "♯",
  b: "♭",
  7: "⁷",
};

export const DISPLAY_DEGREES = {
  // 3 char
  VIIo: "VII°",
  viio: "vii°",
  IIIm: "iii",
  VIIm: "vii",
  IMaj: "IM",
  // 2 char
  IM7: "IMaj7",
  IIo: "II°",
  iio: "ii°",
  IIm: "ii",
  IVm: "iv",
  VIm: "vi",
  // 1 char
  Im: "i",
  Vm: "v",
  I7: "I⁷",
  i7: "i⁷",
  V7: "V⁷",
  v7: "v⁷",
};
