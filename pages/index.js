import Head from "next/head";
import { styled, Container, Text } from "@nextui-org/react";
import Layout, { siteTitle } from "../components/layout";
import Chords from "../components/chords";
import Tonics from "../components/tonics";
import Progressions from "../components/progressions";
import Player from "../components/player";
import useAppState from "../hooks/useAppState";
import { getDefaultProgressions } from "../lib/utils";

const SectionContainer = styled(Container, {
  mb: "$md",
});

const SectionHeading = styled(Text, {
  fontSize: "$lg",
  fontWeight: "$bold",
  ml: "$6",
  mb: "$0",
  color: "$customDimText",
});

export default function Home({ allProgressions }) {
  const {
    // values
    accidental,
    tonic,
    progression,
    currentProgressionIndex,
    // setters
    setAccidental,
    setTonic,
    setProgression,
    setCurrentProgressionIndex,
  } = useAppState();

  return (
    <Layout home>
      <Head>
        <title data-testid="site-title">{siteTitle}</title>
      </Head>
      <Chords
        accidental={accidental}
        tonic={tonic}
        progression={progression}
        currentProgressionIndex={currentProgressionIndex}
      />
      {/* <SectionContainer>
        <SectionHeading>Player</SectionHeading>
        <Player
          accidental={accidental}
          tonic={tonic}
          progression={progression}
          setCurrentProgressionIndex={setCurrentProgressionIndex}
        />
      </SectionContainer>
      <SectionContainer>
        <SectionHeading>Note</SectionHeading>
        <Tonics
          accidental={accidental}
          setAccidental={setAccidental}
          tonic={tonic}
          setTonic={setTonic}
        />
      </SectionContainer>
      <SectionContainer>
        <SectionHeading>Progressions</SectionHeading>
        <Progressions
          progressionCollection={allProgressions}
          currentProgression={progression}
          setProgression={setProgression}
        />
      </SectionContainer> */}
    </Layout>
  );
}

export function getStaticProps() {
  const allProgressions = getDefaultProgressions();
  return {
    props: {
      allProgressions,
    },
  };
}
