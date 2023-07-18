import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Footer } from "~/components/Footer";
import { NavBar } from "~/components/NavBar";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useDarkMode = routeLoader$(({ cookie }) => {
  const isDarkMode = cookie.get("isDarkMode")?.value === "true";
  return {
    isDarkMode: isDarkMode,
  };
});

export default component$(() => {
  const { value } = useDarkMode();
  return (
    <>
      <NavBar />
      <main class={`mx-auto max-w-6xl ${value.isDarkMode ? "dark" : ""}`}>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
