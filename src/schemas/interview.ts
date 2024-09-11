import { z } from 'zod';

const interviewSchema = z.object({
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
  experience_audio: z.instanceof(File, { message: 'Debe ser un archivo de audio válido' }),
});

export { interviewSchema };
