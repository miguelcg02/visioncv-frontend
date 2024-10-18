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
import { postEducation } from '@/services/education';

const EducationPage = () => {
  const { speak } = useTextToSpeechContext();
  const { education: userEducation, setEducation } = useCVDataContext();

  const form = useForm<Audio>({
    resolver: zodResolver(AudioSchema),
  });

  const onSubmit = async (values: Audio) => {
    try {
      speak('Procesando educación');
      const { education } = await postEducation(values);
      setEducation(education);
      speak('Educación guardada');
    } catch (error) {
      speak(`Error al guardar tu educación, ${error}`);
    }
  };

  return (
    <div className='flex min-h-screen-minus-nav flex-col gap-5 px-5 pt-10 sm:px-12 md:px-40 xl:px-60 2xl:px-80'>
      <h1 className='text-2xl font-bold'>¡Empecemos!</h1>
      <StageHeader step='Paso 4/4' sliderValue={100} description='Cuéntanos un poco sobre tu educación.' />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='max-w-[448px] space-y-4'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='audio'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Audio de educación</FormLabel>
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
                {userEducation && (
                  <Button type='button' variant='outline' onClick={() => speak(userEducation)}>
                    Reproducir
                  </Button>
                )}
              </div>
              <div className='flex gap-2'>
                <Link href='/interview/skills'>
                  <Button
                    type='button'
                    variant='outline'
                    aria-label='Botón para regresar a la pantalla de completar tu información de contacto'
                  >
                    Volver
                  </Button>
                </Link>
                {userEducation && (
                  <Button
                    type='button'
                    variant='outline'
                    aria-label='Botón para dirigirnos hacia la pantalla de habilidades'
                  >
                    Crear CV
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EducationPage;
