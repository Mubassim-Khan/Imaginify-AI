import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Enter a title with at least 2 characters.")
    .max(80, "Keep the title under 80 characters."),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string().min(1, "Upload a source image to continue."),
});

export type TransformationFormValues = z.infer<typeof formSchema>;
