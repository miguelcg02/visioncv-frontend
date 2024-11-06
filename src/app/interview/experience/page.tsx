'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAuth } from '@clerk/nextjs';

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

  const { getToken } = useAuth();

  const onSubmit = async (values: Audio) => {
    try {
      speak('Procesando experiencia');
      const token = await getToken();
      if (token) {
        const { experience, suggestions } = await postExperience(values, token);
        setExperience(experience);
        speak(
          `Experiencia guardada. Puedes continuar o editar tu experiencia con las siguientes sugerencias: ${suggestions}`,
        );
        // eslint-disable-next-line no-console
        console.log(
          `Experiencia guardada. Puedes continuar o editar tu experiencia con las siguientes sugerencias: ${suggestions}`,
        );
      } else {
        throw new Error('Token is null');
      }
    } catch (error) {
      speak(`Error al guardar tu experiencia, ${error}`);
    }
  };

  useEffect(() => {
    speak(
      'Por favor,', // en el siguiente campo menciona cada trabajo con la fecha de inicio y fin, el nombre de la empresa o si fue remoto, y una breve descripción de tus responsabilidades. Si no tienes experiencia formal, puedes describir proyectos que hayas realizado.',
    );
  }, [speak]);

  return (
    <div className='flex min-h-screen-minus-nav flex-col gap-5 px-5 pt-10 sm:px-12 md:px-40 xl:px-60 2xl:px-80'>
      <h1 className='text-2xl font-bold'>¡Empecemos!</h1>
      <StageHeader step='Paso 2/4' sliderValue={50} description='Cuéntanos un poco sobre tu experiencia laboral.' />
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
                    aria-label='Botón desabilitado indicando que se está guardando tu experiencia laboral'
                  >
                    Procesando
                  </Button>
                ) : (
                  <Button type='submit' aria-label='Botón para guardar tu experiencia laboral'>
                    Guardar
                  </Button>
                )}
                {userExperience && (
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => speak(userExperience)}
                    aria-label='Botón para reproducir tu experiencia guardada'
                  >
                    Reproducir
                  </Button>
                )}
              </div>
              <div className='flex gap-2'>
                <Link href='/interview/personal-details'>
                  <Button
                    type='button'
                    variant='outline'
                    aria-label='Botón para regresar a la pantalla de información de contacto'
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
