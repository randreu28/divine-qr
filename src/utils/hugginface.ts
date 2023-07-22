import { client } from "@gradio/client";

type Props = {
  prompt: string;
  content: string;
  negativePrompt?: string | undefined;
};

export type QR = {
  type: string;
  time: Date;
  data: string[];
  endpoint: string;
  fn_index: number;
};

/**
 * @see https://huggingface.co/spaces/huggingface-projects/QR-code-AI-art-generator
 **/
export async function generateQR({
  content: codeContent,
  prompt,
  negativePrompt,
}: Props) {
  const HF_Client = await client(
    "https://huggingface-projects-qr-code-ai-art-generator--85d72xndc.hf.space/",
    { hf_token: import.meta.env.VITE_HF_TOKEN }
  );

  console.log("generating...");
  return (await HF_Client.predict(0, [
    codeContent, // string  in 'QR Code Content' Textbox component
    prompt, // string  in 'Prompt' Textbox component
    negativePrompt, // string  in 'Negative Prompt' Textbox component
    7.5, // number (numeric value between 0.0 and 50.0) in 'Guidance Scale' Slider component
    1.3, // number (numeric value between 0.0 and 5.0) in 'Controlnet Conditioning Scale' Slider component
    0.9, // number (numeric value between 0.0 and 1.0) in 'Strength' Slider component
    5392011833, // number (numeric value between -1 and 9999999999) in 'Seed' Slider component
    undefined, // blob in 'Init Image (Optional). Leave blank to generate image with SD 2.1' Image component
    undefined, // blob in 'QR Code Image (Optional). Leave blank to automatically generate QR code' Image component
    true, // boolean  in 'Use QR code as init image' Checkbox component
    "DPM++ Karras SDE", // string (Option from: ['DPM++ Karras SDE', 'DPM++ Karras', 'Heun', 'Euler', 'DDIM', 'DEIS']) in 'Sampler' Dropdown component
  ])) as QR;
}
