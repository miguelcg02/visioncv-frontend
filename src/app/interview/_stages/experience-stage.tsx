import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { interviewSchema } from '@/schemas/interview';
import { Microphone } from '@/components/microphone';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

const ExperienceStage = ({
  form,
  onLastStage,
  onSubmit,
}: {
  form: UseFormReturn<z.infer<typeof interviewSchema>>;
  onLastStage: () => void;
  onSubmit: () => void;
}) => {
  return (
    <div className='space-y-4'>
      <FormField
        control={form.control}
        name='experience_audio'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Audio de experiencia</FormLabel>
            <FormControl>
              <Microphone onAudioCapture={(audioBlob) => field.onChange(new File([audioBlob], 'experience.wav'))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className='flex gap-2'>
        {form.formState.isSubmitting ? (
          <Button variant='loading' aria-label='Botón desabilitado indicando que se está procesando tu hoja de vida'>
            Procesando
          </Button>
        ) : (
          <Button onClick={onSubmit} aria-label='Botón para comenzar a procesar tu información y crear tu hoja de vida'>
            Enviar
          </Button>
        )}
        <Button
          onClick={onLastStage}
          variant='outline'
          aria-label='Botón para regresar a la pantalla de completar tu información de contacto'
        >
          Volver
        </Button>
      </div>
    </div>
  );
};

export default ExperienceStage;
