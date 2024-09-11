import { type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { interviewSchema } from '@/schemas/interview';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ContactDetailsStage = ({
  form,
  onNextStage,
}: {
  form: UseFormReturn<z.infer<typeof interviewSchema>>;
  onNextStage: () => void;
}) => {
  return (
    <div className='space-y-4'>
      <FormField
        control={form.control}
        name='name'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre</FormLabel>
            <FormControl>
              <Input placeholder='Mauricio' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='phone'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Número de teléfono</FormLabel>
            <FormControl>
              <Input placeholder='3216549870' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='email'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Correo electrónico</FormLabel>
            <FormControl>
              <Input placeholder='mauricio@ejemplo.com' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='address'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dirección</FormLabel>
            <FormControl>
              <Input placeholder='Carrera XX, Medellín...' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        onClick={onNextStage}
        aria-label='Botón para dirigirnos hacia la pantalla de obtención de tu experiencia profesional'
      >
        Continuar
      </Button>
    </div>
  );
};

export default ContactDetailsStage;
