'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Microphone } from '@/components/microphone';

const formSchema = z.object({
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
  // experience_audio:
});

const InterviewPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // eslint-disable-next-line no-console
    console.log(values);
  }

  return (
    <div className='flex min-h-screen-minus-nav flex-col gap-5 px-5 pt-10 sm:px-12 md:px-40 xl:px-60 2xl:px-80'>
      <h1 className='text-2xl font-bold'>¡Empecemos!</h1>
      <div className='flex flex-col gap-4'>
        <h3 className='font-medium'>Paso 1/2</h3>
        <Slider defaultValue={[50]} max={100} disabled withOutThumb />
        <p>En este paso, se le harán una serie de preguntas para ayudarle a crear su perfil.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='max-w-[448px] space-y-4'>
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
          <Microphone />
          <Button type='submit'>Enviar</Button>
        </form>
      </Form>
    </div>
  );
};

export default InterviewPage;
