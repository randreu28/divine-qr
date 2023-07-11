import { component$ } from "@builder.io/qwik";
import { HiUserCircleSolid } from "@qwikest/icons/heroicons";
import { Favicon } from "./Favicon";

export const NavBar = component$(() => {
  return (
    <nav class="p-4 flex justify-between items-center border-my-yw border-b">
      <Favicon class="h-10 w-fit fill-current" />
      <HiUserCircleSolid class="h-10 w-fit fill-current" />
    </nav>
  );
});
