import { z } from "zod";
import { formServiceOptions } from "@/config/siteConfig";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter at least 2 characters").max(80, "Maximum 80 characters"),
  phone: z.string().trim().regex(/^[+\d\s-]+$/, "Use digits, spaces, + or - only")
    .refine((v) => { const d = v.replace(/\D/g, "").length; return d >= 7 && d <= 15; }, "Enter 7 to 15 digits"),
  email: z.string().trim().max(255).regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Enter a valid email address"),
  service: z.enum(formServiceOptions, { message: "Please select a service" }),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(1000, "Maximum 1000 characters"),
  consent: z.literal(true, { message: "Consent is required to submit" }),
});
export type Enquiry = z.infer<typeof enquirySchema>;
