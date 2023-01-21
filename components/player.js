import { Button, Grid, Input } from "@nextui-org/react";
import { useEffect, useState, useMemo } from "react";
import * as Tone from "tone";
import { simpleGenerator } from "../lib/music";
import { usePianoSynth, usePolySynth } from "../hooks/synths";
import { Progression } from "@tonaljs/tonal";

const useTonePlayer = (synth, toneEvents, setCurrentProgressionIndex) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);

  const part = useMemo(() => {
    console.log("synth, isPlaying");
    if (!synth || !isPlaying) {
      return undefined;
    }

    const part = new Tone.Part((time, { note, progressionIndex }) => {
      console.log("part triggered", note, progressionIndex);
      setCurrentProgressionIndex(progressionIndex);
      synth.triggerAttackRelease(note, "8n", time);
    }, toneEvents);

    return part;
  }, [setCurrentProgressionIndex, synth, toneEvents, isPlaying]);

  const start = () => setIsPlaying(true);
  const stop = () => setIsPlaying(false);

  useEffect(() => {
    if (bpm) {
      Tone.Transport.bpm.value = parseInt(bpm, 10);
    }
  }, [bpm]);

  useEffect(() => {
    if (isPlaying) {
      if (part) {
        console.log("playing");
        part.start();
      }

      Tone.Transport.start("+0.0");
    } else {
      if (part) {
        part.stop();
      }

      Tone.Transport.stop();

      // Prevent two things being played at once
      Tone.Transport.cancel(0);
    }

    return () => {
      Tone.Transport.stop();
    };
  }, [part, isPlaying]);

  return [isPlaying, start, stop, bpm, setBpm];
};

export default function Player({
  accidental,
  tonic,
  progression,
  setCurrentProgressionIndex,
}) {
  const [pianoSynth] = usePianoSynth();
  const [polySynth] = usePolySynth();

  const sampler = pianoSynth;

  const toneEvents = useMemo(() => {
    const { toneEvents } = simpleGenerator(
      `${tonic}${accidental}`,
      progression.split(" ")
    );

    return toneEvents;
  }, [accidental, progression, tonic]);

  const [isPlaying, start, stop, bpm, setBpm] = useTonePlayer(
    sampler,
    toneEvents,
    setCurrentProgressionIndex
  );

  // useEffect(() => {
  //   // quick
  //   // const part = new Tone.Part((time, { note, progressionIndex }) => {
  //   //   // console.log("callback", time, chord, note, progressionIndex);
  //   //   setCurrentProgressionIndex(progressionIndex);
  //   //   // synth.triggerAttackRelease(note, "8n", time, 0.25);
  //   //   sampler.triggerAttackRelease(note, "8n", time);
  //   // }, toneEvents);

  //   // if (isPlaying) {
  //   //   // part.loop = true;
  //   //   // part.loopEnd = `${measureCount}m`;
  //   //   part.start();
  //   //   // Tone.Transport.start();
  //   // } else {
  //   //   setCurrentProgressionIndex(-1);
  //   //   console.log("not playing");
  //   //   part.stop();
  //   //   // part.clear();

  //   //   // Tone.Transport.stop();
  //   //   // Tone.Transport.cancel(0);
  //   // }

  //   //  cleanup
  //   return () => {
  //     console.log("destroying");
  //     part.dispose();
  //     // Tone.Transport.stop();
  //     // Tone.Transport.cancel(0);
  //   };
  // }, [isPlaying]);

  const handlePlayClick = async () => {
    console.log("handlePlayClick");
    await Tone.start();
    start();
  };

  const handleStopClick = () => {
    console.log("handleStopClick");
    stop(false);
    setCurrentProgressionIndex(-1);
    // setPlaying(false);
  };

  const handleBpmChange = (e) => {
    const parsedValue = parseInt(e.target.value, 10) || 0;
    setBpm(parsedValue);
  };

  return (
    <Grid.Container gap={2}>
      <Grid xs>
        {isPlaying ? (
          <Button ripple={false} color="error" onPress={handleStopClick}>
            Stop
          </Button>
        ) : (
          <Button ripple={false} color="secondary" onPress={handlePlayClick}>
            Play
          </Button>
        )}
        <Input
          labelRight="BPM"
          value={bpm}
          type="text"
          aria-label="BPM"
          onChange={handleBpmChange}
        />
      </Grid>
    </Grid.Container>
  );
}
