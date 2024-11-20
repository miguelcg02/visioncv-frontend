'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PersonalDetails, PersonalDetailsSchema } from '@/schemas/schemas';
import { StageHeader } from '@/components/stageHeader';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTextToSpeechContext } from '@/context/TextToSpeechProvider';
import { useCVDataContext } from '@/context/CVDataProvider';

const PersonalDetailsPage = () => {
  const { speak } = useTextToSpeechContext();
  const { setPersonalDetails } = useCVDataContext();

  const router = useRouter();

  const form = useForm<PersonalDetails>({
    resolver: zodResolver(PersonalDetailsSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      email: '',
    },
  });

  const onSubmit = async (values: PersonalDetails) => {
    try {
      setPersonalDetails({
        name: values.name,
        phone: values.phone,
        address: values.address,
        email: values.email,
      });
      speak('Detalles personales guardados');
      router.push('/interview/experience');
    } catch (_error) {
      speak('Error al guardar los detalles personales');
    }
  };

  useEffect(() => {
    speak(
      'En este paso, se le harán una serie de preguntas para ayudarle a crear su perfil comenzando con el apartado de información de contacto. Por favor, ingrese su nombre, número de teléfono, correo electrónico y dirección. Además de esto, recuerde que puede navegar por los campos del formulario utilizando la tecla tabulador. Una vez haya completado los campos, presione el botón de continuar para guardar los detalles personales y avanzar al siguiente paso. ¡Buena suerte! No dude en pedir ayuda si la necesita. ¡Estamos aquí para ayudarle! Además, recuerde que puede llamar al 1234567890 si necesita ayuda adicional. Somos su mejor opción para la creación de hojas de vida y perfiles profesionales con la calidad que usted se merece y necesita para alcanzar sus metas laborales. ¡Vamos a comenzar! Por favor, ingrese su nombre.',
    );
  }, [speak]);

  return (
    <div className='flex min-h-screen-minus-nav flex-col gap-5 px-5 pt-10 sm:px-12 md:px-40 xl:px-60 2xl:px-80'>
      <h1 className='text-2xl font-bold'>¡Empecemos!</h1>
      <StageHeader
        step='Paso 1/4'
        sliderValue={25}
        description='En este paso, se le harán una serie de preguntas para ayudarle a crear su perfil comenzando con el apartado de información de contacto.'
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='max-w-[448px] space-y-4'>
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
            <Button aria-label='Botón para dirigirnos hacia la pantalla de experiencia profesional'>Continuar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PersonalDetailsPage;
