import { z } from 'zod';

// ----------------- Personal Details -----------------
export const PersonalDetailsSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'El nombre debe contener mínimo dos caracteres' })
    .max(50, { message: 'El nombre debe contener máximo 50 caracteres' }),
  phone: z
    .string()
    .min(10, { message: 'El número de teléfono debe contener mínimo 10 dígitos' })
    .max(15, { message: 'El número de teléfono debe contener máximo 15 dígitos' }),
  address: z
    .string()
    .min(10, { message: 'La dirección debe contener como mínimo 10 caracteres' })
    .max(100, { message: 'La dirección debe contener como máximo 100 caracteres' }),
  email: z.string().email({ message: 'El correo electrónico debe ser válido' }),
});
export type PersonalDetails = z.infer<typeof PersonalDetailsSchema>;

// ----------------- Audio -----------------
export const AudioSchema = z.object({
  audio: z.instanceof(File, { message: 'Debe ser un archivo de audio válido' }),
});
export type Audio = z.infer<typeof AudioSchema>;

// ----------------- Upload -----------------
export const UploadSchema = z.object({
  experience: z.string(),
  skills: z.string(),
  education: z.string(),
  personal_details: PersonalDetailsSchema,
});
export type Upload = z.infer<typeof UploadSchema>;

// ----------------- Responses -----------------
export const ExperienceResponseSchema = z.object({
  experience: z.string(),
  suggestions: z.string(),
});
export type ExperienceResponse = z.infer<typeof ExperienceResponseSchema>;

export const SkillsResponseSchema = z.object({
  skills: z.string(),
  suggestions: z.string(),
});
export type SkillsResponse = z.infer<typeof SkillsResponseSchema>;

export const EducationResponseSchema = z.object({
  education: z.string(),
  suggestions: z.string(),
});
export type EducationResponse = z.infer<typeof EducationResponseSchema>;

export const UploadResponseSchema = z.object({
  cv_path: z.string(),
});
export type UploadResponse = z.infer<typeof UploadResponseSchema>;
