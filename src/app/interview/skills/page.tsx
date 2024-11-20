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
import { postSkills } from '@/services/skills';

const SkillsPage = () => {
  const { speak } = useTextToSpeechContext();
  const { skills: userSkills, setSkills } = useCVDataContext();

  const { getToken } = useAuth();

  const form = useForm<Audio>({
    resolver: zodResolver(AudioSchema),
  });

  const onSubmit = async (values: Audio) => {
    try {
      speak('Procesando habilidades');
      const token = await getToken();
      if (token) {
        const { skills, suggestions } = await postSkills(values, token);
        setSkills(skills);
        speak(
          `Habilidades guardadas. Puedes continuar o editar tus habilidades con las siguientes sugerencias: ${suggestions}. Listo para continuar.`,
        );
        // eslint-disable-next-line no-console
        console.log(
          `Habilidades guardadas. Puedes continuar o editar tus habilidades con las siguientes sugerencias: ${suggestions}. Listo para continuar.`,
        );
      } else {
        throw new Error('Token is null');
      }
    } catch (error) {
      speak(`Error al guardar tus habilidades, ${error}`);
    }
  };

  useEffect(() => {
    speak(
      'Por favor, en el siguiente campo menciona tus habilidades y competencias. Puedes mencionar tus habilidades blandas y duras, así como tus competencias técnicas y personales.',
    );
  }, [speak]);

  return (
    <div className='flex min-h-screen-minus-nav flex-col gap-5 px-5 pt-10 sm:px-12 md:px-40 xl:px-60 2xl:px-80'>
      <h1 className='text-2xl font-bold'>¡Empecemos!</h1>
      <StageHeader step='Paso 3/4' sliderValue={75} description='Dinos cuáles son tus habilidades y competencias.' />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='max-w-[448px] space-y-4'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='audio'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Audio de habilidades</FormLabel>
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
                    aria-label='Botón desabilitado indicando que se están guardando tus habilidades'
                  >
                    Procesando
                  </Button>
                ) : (
                  <Button type='submit' aria-label='Botón para guardar tus habilidades y competencias'>
                    Guardar
                  </Button>
                )}
                {userSkills && (
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => speak(userSkills)}
                    aria-label='Botón para reproducir las habilidades y competencias que mencionaste'
                  >
                    Reproducir
                  </Button>
                )}
              </div>
              <div className='flex gap-2'>
                <Link href='/interview/experience'>
                  <Button type='button' variant='outline' aria-label='Botón para regresar a la pantalla de experiencia'>
                    Volver
                  </Button>
                </Link>
                {userSkills && (
                  <Link href='/interview/education'>
                    <Button
                      type='button'
                      variant='outline'
                      aria-label='Botón para dirigirnos hacia la pantalla de educación'
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

export default SkillsPage;
