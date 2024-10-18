'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Audio, AudioSchema } from '@/schemas/schemas';
import { StageHeader } from '@/components/stageHeader';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Microphone } from '@/components/microphone';
import { Button } from '@/components/ui/button';
import { useTextToSpeechContext } from '@/context/TextToSpeechProvider';
import { useCVDataContext } from '@/context/CVDataProvider';
import { postExperience } from '@/services/experience';

const ExperiencePage = () => {
  const { speak } = useTextToSpeechContext();
  const { experience: userExperience, setExperience } = useCVDataContext();

  const form = useForm<Audio>({
    resolver: zodResolver(AudioSchema),
  });

  const onSubmit = async (values: Audio) => {
    try {
      speak('Procesando experiencia');
      const { experience } = await postExperience(values);
      setExperience(experience);
      speak('Experiencia guardada');
    } catch (error) {
      speak(`Error al guardar tu experiencia, ${error}`);
    }
  };

  return (
    <div className='flex min-h-screen-minus-nav flex-col gap-5 px-5 pt-10 sm:px-12 md:px-40 xl:px-60 2xl:px-80'>
      <h1 className='text-2xl font-bold'>¡Empecemos!</h1>
      <StageHeader
        step='Paso 1/2'
        sliderValue={50}
        description='En este paso, se le harán una serie de preguntas para ayudarle a crear su perfil comenzando con el apartado de información de contacto.'
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='max-w-[448px] space-y-4'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='audio'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Audio de experiencia</FormLabel>
                  <FormControl>
                    <Microphone
                      onAudioCapture={(audioBlob) => field.onChange(new File([audioBlob], 'experience.wav'))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex-col space-y-2'>
              <div className='flex gap-2'>
                {form.formState.isSubmitting ? (
                  <Button
                    variant='loading'
                    aria-label='Botón desabilitado indicando que se está procesando tu hoja de vida'
                  >
                    Procesando
                  </Button>
                ) : (
                  <Button
                    type='submit'
                    aria-label='Botón para comenzar a procesar tu información y crear tu hoja de vida'
                  >
                    Guardar
                  </Button>
                )}
                {userExperience && (
                  <Button type='button' variant='outline' onClick={() => speak(userExperience)}>
                    Reproducir
                  </Button>
                )}
              </div>
              <div className='flex gap-2'>
                <Link href='/interview/personal-details'>
                  <Button
                    type='button'
                    variant='outline'
                    aria-label='Botón para regresar a la pantalla de completar tu información de contacto'
                  >
                    Volver
                  </Button>
                </Link>
                {userExperience && (
                  <Link href='/interview/skills'>
                    <Button
                      type='button'
                      variant='outline'
                      aria-label='Botón para dirigirnos hacia la pantalla de habilidades'
                    >
                      Continuar
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ExperiencePage;
