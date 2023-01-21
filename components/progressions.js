import { Card, Grid, Text } from "@nextui-org/react";
import { StyledSerifText } from "./text.styles";
import { formatDegree } from "../lib/formatters";

export default function Progressions({
  progressionCollection,
  currentProgression,
  setProgression,
}) {
  const handleClick = (txt) => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    setProgression(txt);
  };
  // console.log("render:progressions");

  return (
    <Grid.Container gap={2} direction="row" data-testid="progression-container">
      {progressionCollection.map(({ name, progression: txt }, i) => (
        <Grid key={txt} xs={12} sm={6}>
          <Card
            disableRipple
            isPressable
            variant="flat"
            css={{
              background: currentProgression === txt && "$customSelectedCard",
            }}
            onPress={(e) => handleClick(txt)}
          >
            <Card.Body>
              <StyledSerifText css={{ fs: "$xl", lh: "$sm" }}>
                {txt.split(" ").map(formatDegree).join(" ")}
              </StyledSerifText>
              <Text css={{ fs: "$md", lh: "$sm", color: "$customDimText" }}>
                {name}
              </Text>
            </Card.Body>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  );
}
