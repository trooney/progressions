import { useState } from "react";
import { Card, Grid, Text } from "@nextui-org/react";
import { Progression } from "@tonaljs/tonal";
import Viewer from "./viewer";
import { formatNote, formatDegree } from "../lib/formatters";
import { StyledSerifText } from "./text.styles";

export default function Chords({
  accidental,
  tonic,
  progression,
  currentProgressionIndex,
}) {
  const splitProgression = (progression || "").split(" ");
  const chords = Progression.fromRomanNumerals(
    `${tonic}${accidental}`,
    splitProgression
  );

  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const handler = (chord) => {
    setText(chord);
    setVisible(true);
  };

  return (
    <Grid.Container gap={2} justify="center" css={{ m: 0 }}>
      {visible && (
        <Viewer text={text} visible={visible} setVisible={setVisible} />
      )}
      {chords.map((chord, i) => (
        <Grid key={i} xs={chords.length > 8 ? 3 : null}>
          <Card
            isPressable
            disableRipple
            variant="flat"
            onPress={(e) => handler(chord)}
          >
            <Card.Body
              css={{
                py: "$12",
                textAlign: "center",
                bg: currentProgressionIndex === i && "$customSelectedCard",
              }}
            >
              <Text
                as="div"
                css={{ p: 0, m: 0, fs: "$3xl", fontWeight: "$bold" }}
              >
                {formatNote(chord)}
              </Text>
              <StyledSerifText
                as="div"
                css={{ p: 0, m: 0, fs: "$xl", color: "$customDimText" }}
              >
                {formatDegree(splitProgression[i])}
              </StyledSerifText>
            </Card.Body>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  );
}
