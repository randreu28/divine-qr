import { component$ } from "@builder.io/qwik";
import { routeLoader$, z, type DocumentHead } from "@builder.io/qwik-city";
import type { InitialValues } from "@modular-forms/qwik";
import { formAction$, reset, useForm, zodForm$ } from "@modular-forms/qwik";
import type { QR } from "~/utils/hugginface";
import { generateQR } from "~/utils/hugginface";

const promptSchema = z.object({
  content: z.string(),
  prompt: z.string(),
  negativePrompt: z.string().optional(),
});

type PromptForm = z.infer<typeof promptSchema>;

export const useFormLoader = routeLoader$<InitialValues<PromptForm>>(() => ({
  content: "",
  prompt: "",
  negativePrompt: undefined,
}));

/**
 * TODO: Figure out how to properly utilize the second generic type.
 * This also, due to the nature of how server actions work on Qwik,
 * generates a very long endpoint with the base64 image as param in the url,
 * resulting in a 431 HTTP error code.
 **/
export const useFormAction = formAction$<PromptForm, any>(async (values) => {
  return await generateQR(values);
}, zodForm$(promptSchema));

export default component$(() => {
  const [formstore, { Form, Field }] = useForm<PromptForm, QR>({
    loader: useFormLoader(),
    action: useFormAction(),
  });

  return (
    <Form
      reloadDocument={false}
      class="flex h-screen flex-col items-center space-y-5 p-5"
    >
      <Field name="content">
        {(field, props) => (
          <span class="flex w-full flex-col gap-3">
            <label>QR Content</label>
            <input
              {...props}
              required
              placeholder="A very nice QR content"
              type="text"
              class="rounded border border-gray-400 bg-white p-2 dark:bg-neutral-900"
              value={field.value}
            />
          </span>
        )}
      </Field>

      <span class="flex w-full flex-col gap-3">
        <Field name="prompt">
          {(field, props) => (
            <>
              <label>Create your prompt</label>
              <textarea
                class="rounded border border-gray-400 bg-white p-2 dark:bg-neutral-900"
                placeholder="Enter your prompt"
                required
                value={field.value}
                {...props}
              />
            </>
          )}
        </Field>

        <Field name="negativePrompt">
          {(field, props) => (
            <>
              <label>Negative prompt</label>
              <textarea
                class="rounded border border-gray-400 bg-white p-2 dark:bg-neutral-900"
                placeholder="Enter your negative prompt"
                required
                value={field.value}
                {...props}
              />
            </>
          )}
        </Field>
      </span>

      <span class="flex w-full gap-5 pb-20">
        <button
          type="submit"
          class="rounded border border-gray-400 bg-white px-4 py-2 duration-200 hover:opacity-75 dark:bg-neutral-900"
        >
          Generate
        </button>
        <button
          onClick$={() => reset(formstore)}
          type="button"
          class="rounded border border-gray-400 bg-white px-4 py-2 duration-200 hover:opacity-75 dark:bg-neutral-900"
        >
          Clear prompt
        </button>
      </span>

      <div class="flex h-full w-full flex-col items-center justify-center gap-10 rounded border border-gray-400 bg-white text-gray-400 dark:bg-neutral-900">
        Your generated QR will be shown here
        {formstore.submitting && <p>loading...</p>}
        {formstore.response.data && (
          <img
            src={formstore.response.data as unknown as string}
            width={200}
            height={200}
          />
        )}
      </div>
    </Form>
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
