'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Audio, AudioSchema } from '@/schemas/schemas';
import { StageHeader } from '@/components/stageHeader';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Microphone } from '@/components/microphone';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTextToSpeechContext } from '@/context/TextToSpeechProvider';
import { useCVDataContext } from '@/context/CVDataProvider';
import { postEducation } from '@/services/education';
import { upload } from '@/services/upload';
import { getCV } from '@/services/getCV';

const EducationPage = () => {
  const [uploading, setUploading] = useState(false);

  const { speak } = useTextToSpeechContext();
  const { education: userEducation, setEducation, experience, personalDetails, skills } = useCVDataContext();

  const router = useRouter();

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

  const onUpload = async () => {
    try {
      speak('Creando CB...');

      const data = {
        experience,
        skills,
        education: userEducation,
        personal_details: personalDetails,
      };

      setUploading(true);
      setTimeout(() => {
        speak(
          'Creando CV. En estos momentos la AI está haciendo el trabajo por tí, por favor espera un momento mientras analizamos tus datos, creamos la mejor estructura para tu CV y lo descargamos.',
        );
      }, 3000);
      const response = await upload(data);
      setUploading(false);

      if (response.cv_path) {
        handleDownload(response.cv_path);
      }
    } catch (error) {
      speak(`Error al crear la CB, ${error}`);
    }
  };

  async function handleDownload(cv_path: string) {
    try {
      speak('Descargando CB...');
      const blob = await getCV(cv_path);

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${personalDetails.name.replace(/\s+/g, '-').toUpperCase()}-VISION-CV.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      router.push('/success');
    } catch (error) {
      speak(`Error al descargar la CB, ${error}`);
    }
  }

  useEffect(() => {
    speak(
      'Por favor, en el siguiente campo menciona tu educación, comenzando con el último grado académico obtenido. Menciona el nombre de la institución, el título obtenido y la fecha de inicio y graduación.',
    );
  }, [speak]);

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
                    aria-label='Botón desabilitado indicando que se está guardando tu educación'
                  >
                    Procesando
                  </Button>
                ) : (
                  <Button type='submit' aria-label='Botón para guardar tu educación'>
                    Guardar
                  </Button>
                )}
                {userEducation && (
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => speak(userEducation)}
                    aria-label='Botón para reproducir tu educación guardada'
                  >
                    Reproducir
                  </Button>
                )}
              </div>
              <div className='flex gap-2'>
                <Link href='/interview/skills'>
                  <Button type='button' variant='outline' aria-label='Botón para regresar a la pantalla de habilidades'>
                    Volver
                  </Button>
                </Link>
                {userEducation && (
                  <Button
                    type='button'
                    variant='outline'
                    aria-label='Botón para comenzar a procesar tu información, crear y descargar tu hoja de vida'
                    onClick={onUpload}
                  >
                    Crear CV
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>

      <Dialog open={uploading} onOpenChange={setUploading}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Creando CV</DialogTitle>
            <DialogDescription>
              En estos momentos la AI está haciendo el trabajo por tí, por favor espera un momento.
              <div className='flex w-full justify-center'>
                <div role='status'>
                  <svg
                    aria-hidden='true'
                    className='h-8 w-8 animate-spin fill-primary text-gray-200 dark:text-gray-800'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentFill'
                    />
                  </svg>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EducationPage;
