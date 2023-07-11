import { component$ } from "@builder.io/qwik";
import { HiUserCircleSolid } from "@qwikest/icons/heroicons";
import { Favicon } from "./Favicon";

export const NavBar = component$(() => {
  return (
    <nav class="flex items-center justify-between border-b border-my-yw p-4">
      <Favicon class="h-10 w-fit fill-current" />
      <HiUserCircleSolid class="h-10 w-fit fill-current" />
    </nav>
  );
});
