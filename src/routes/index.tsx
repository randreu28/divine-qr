import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="h-screen flex justify-center items-center">
      <h1 class="text-5xl">Hello from Qwik</h1>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Divine QR",
  meta: [
    {
      name: "description",
      content: "A QR art generator",
    },
  ],
};
