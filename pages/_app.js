import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      // Progressions Configuration
      customSelectedCard: "$blue500",
      customDimText: "$gray900",
    },
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      // Progressions Configuration
      customSelectedCard: "$blue400",
      customDimText: "$gray800",
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <NextThemesProvider
      defaultTheme="dark"
      enableSystem={false}
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </NextThemesProvider>
  );
}
