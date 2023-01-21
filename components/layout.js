import Head from "next/head";

const name = "Tyler Rooney";
export const siteTitle = "Progressions";

export default function Layout({ children, home }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Progressions - A Musical Progressions Player"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <main>{children}</main>
    </div>
  );
}
