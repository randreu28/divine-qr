import { component$, $ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { HiMoonSolid } from "@qwikest/icons/heroicons";
import { Favicon } from "./Favicon";

export const NavBar = component$(() => {
  const switchCookies = server$(function () {
    let isDarkMode = this.cookie.get("isDarkMode")?.value === "true";
    isDarkMode = !isDarkMode;

    this.cookie.set("isDarkMode", JSON.stringify(isDarkMode));
    return isDarkMode;
  });

  const switchDarkMode = $(async function () {
    const isDarkMode = await switchCookies();

    if (isDarkMode) {
      document.getElementsByTagName("main")[0].classList.add("dark");
    } else {
      document.getElementsByTagName("main")[0].classList.remove("dark");
    }
  });

  return (
    <nav class="flex items-center justify-between border-b border-my-yw p-4">
      <Favicon class="h-10 w-fit fill-current" />
      <HiMoonSolid
        class="h-8 w-fit fill-current hover:cursor-pointer"
        onClick$={switchDarkMode}
      />
    </nav>
  );
});
