import { Card, Grid, Text } from "@nextui-org/react";
import { Note } from "@tonaljs/tonal";
import { getAllAccidentals } from "../lib/utils";

const notes = Note.names();
const accidentals = getAllAccidentals();

export default function Tonics({ accidental, setAccidental, tonic, setTonic }) {
  return (
    <Grid.Container gap={1} justify="center">
      <Grid sm={3}>
        {accidentals.map(({ value, displayName }, i) => (
          <Grid key={i} xs>
            <Card
              disableRipple
              isPressable
              variant="flat"
              css={{
                background: value === accidental && "$customSelectedCard",
              }}
              onPress={(e) => setAccidental(value)}
            >
              <Card.Body css={{ py: "$sm", textAlign: "center" }}>
                <Text size="$md" weight="bold">
                  {displayName}
                </Text>
              </Card.Body>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid xs={9}>
        {notes.map((note, i) => (
          <Grid key={i} xs>
            <Card
              disableRipple
              isPressable
              variant="flat"
              css={{
                background: note === tonic && "$customSelectedCard",
              }}
              onPress={(e) => setTonic(note)}
            >
              <Card.Body css={{ py: "$sm", textAlign: "center" }}>
                <Text size="$md" weight="bold" as="span">
                  {note}
                </Text>
              </Card.Body>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid.Container>
  );
}
