import { useMemo, useState } from "react";
import { Progression } from "@tonaljs/tonal";
import { getDefaultProgressionStr } from "../lib/utils";
import { simpleGenerator } from "../lib/music";

const defaultKey = "C";
const defaultAccidental = "";
const defaultProgression = getDefaultProgressionStr();

export default function useAppState() {
  const [tonic, setTonic] = useState(defaultKey);
  const [accidental, setAccidental] = useState(defaultAccidental);
  const [progression, setProgression] = useState(defaultProgression);
  const [currentProgressionIndex, setCurrentProgressionIndex] = useState(-1);

  // const chordData = useMemo(() => {
  //   const chords = Progression.fromRomanNumerals(
  //     `${tonic}${accidental}`,
  //     progression.split(" ")
  //   );
  //   return chords;
  // }, [accidental, progression, tonic]);

  // const toneEvents = useMemo(() => {
  //   const { toneEvents } = simpleGenerator(
  //     `${tonic}${accidental}`,
  //     progression.split(" ")
  //   );

  //   return toneEvents;
  // }, [accidental, progression, tonic]);

  return {
    tonic,
    accidental,
    progression,
    currentProgressionIndex,
    setTonic,
    setAccidental,
    setProgression,
    setCurrentProgressionIndex,
  };
}
