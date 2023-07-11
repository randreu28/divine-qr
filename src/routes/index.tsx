import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <form class="flex h-screen flex-col items-center space-y-5 p-5">
      <span class="flex w-full flex-col gap-3">
        <label>QR Content</label>
        <input
          required
          placeholder="A very nice QR content"
          type="text"
          class="rounded border border-gray-400 bg-white p-2 dark:bg-neutral-900"
        />
      </span>

      <span class="flex w-full flex-col gap-3">
        <label>QR image (optional)</label>
        <input type="file" />
      </span>

      <span class="flex w-full flex-col gap-3">
        <label>Create your prompt</label>
        <textarea
          class="rounded border border-gray-400 bg-white p-2 dark:bg-neutral-900"
          placeholder="Enter your prompt"
          required
        />
        <label>Negative prompt</label>
        <textarea
          class="rounded border border-gray-400 bg-white p-2 dark:bg-neutral-900"
          placeholder="Enter your negative prompt"
          required
        />
      </span>

      <span class="flex w-full gap-5 pb-20">
        <button class="rounded border border-gray-400 bg-white px-4 py-2 duration-200 hover:opacity-75 dark:bg-neutral-900">
          Clear prompt
        </button>
        <button class="rounded border border-gray-400 bg-white px-4 py-2 duration-200 hover:opacity-75 dark:bg-neutral-900">
          Generate
        </button>
      </span>

      <div class="flex h-full w-full items-center justify-center rounded border border-gray-400 bg-white text-gray-400  dark:bg-neutral-900">
        Your generated QR will be shown here
      </div>
    </form>
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
