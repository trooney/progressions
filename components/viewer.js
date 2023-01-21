import { Modal, Button, Text, Card, Grid } from "@nextui-org/react";
import { Chord, Note } from "@tonaljs/tonal";
import * as Tone from "tone";

export default function Viewer({ text, visible, setVisible }) {
  const chord = Chord.get(text);

  const closeHandler = () => {
    setVisible(false);
  };

  const playHandler = async () => {
    await Tone.start();
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        partials: [0, 2, 3, 4],
      },
    }).toDestination();

    const notes = chord.intervals
      .map(Note.transposeFrom(`${Note.simplify(chord.tonic)}4`))
      .map(Note.simplify);

    synth.triggerAttackRelease(notes, "8n");
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          {chord.name}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Grid.Container gap={1} justify="center">
          {chord.notes.map((note, i) => (
            <Grid key={note} sm={3}>
              <Card variant="none">
                <Card.Body css={{ textAlign: "center" }}>
                  <Text size="$3xl">{note}</Text>
                  <Text size="$lg" css={{ color: "$customDimText" }}>
                    {chord.intervals[i]}
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      </Modal.Body>
      <Modal.Footer justify="center">
        <Button color="primary" onPress={playHandler}>
          Play
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
