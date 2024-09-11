'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { interviewSchema } from '@/schemas/interview';
import { Form } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import { useTextToSpeechContext } from '@/context/TextToSpeechProvider';

import ContactDetailsStage from './_stages/contact-details-stage';
import ExperienceStage from './_stages/experience-stage';

/* eslint-disable no-unused-vars, no-shadow */
enum InterviewStageEnum {
  CONTACT_DETAILS,
  EXPERIENCE,
}

const InterviewPage = () => {
  const [stage, setStage] = useState<InterviewStageEnum>(InterviewStageEnum.CONTACT_DETAILS);

  const router = useRouter();

  const { speak } = useTextToSpeechContext();

  const form = useForm<z.infer<typeof interviewSchema>>({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof interviewSchema>) {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('phone', values.phone);
    formData.append('address', values.address);
    formData.append('email', values.email);
    if (values.experience_audio) {
      formData.append('experience_audio', values.experience_audio);
    }

    speak('Procesando CB');

    try {
      const response = await fetch('http://localhost:8000/form/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      const data = await response.json();

      if (data.cv_path) {
        const fileUrl = `http://localhost:8000/${data.cv_path.replace(/^\.\//, '')}`;
        const downloadResponse = await fetch(fileUrl, {
          method: 'GET',
        });

        if (!downloadResponse.ok) {
          throw new Error('Error al descargar el archivo');
        }

        const blob = await downloadResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cv.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        router.push('/success');
      } else {
        // console.error('Ruta del CV no proporcionada por el servidor');
      }
    } catch (error) {
      // console.error('Error:', error);
    }
  }

  const renderContent = () => {
    switch (stage) {
      case InterviewStageEnum.CONTACT_DETAILS:
        return <ContactDetailsStage form={form} onNextStage={() => setStage(InterviewStageEnum.EXPERIENCE)} />;

      case InterviewStageEnum.EXPERIENCE:
        return (
          <ExperienceStage
            form={form}
            onLastStage={() => setStage(InterviewStageEnum.CONTACT_DETAILS)}
            onSubmit={form.handleSubmit(onSubmit)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className='flex min-h-screen-minus-nav flex-col gap-5 px-5 pt-10 sm:px-12 md:px-40 xl:px-60 2xl:px-80'>
      <h1 className='text-2xl font-bold'>¡Empecemos!</h1>
      {stage === InterviewStageEnum.CONTACT_DETAILS && (
        <StageHeader
          step='Paso 1/2'
          sliderValue={50}
          description='En este paso, se le harán una serie de preguntas para ayudarle a crear su perfil comenzando con el apartado de información de contacto.'
        />
      )}
      {stage === InterviewStageEnum.EXPERIENCE && (
        <StageHeader
          step='Paso 2/2'
          sliderValue={100}
          description={`¡Excelente!, ahora por favor comentanos un poco más sobre la experiencia que tienes. Es súper importante que notes que en
             el siguiente botón podrás grabar un audio y allí esperamos que para cada experiencia laboral que menciones, nos cuentes de qué fecha 
             a qué fecha trabajaste, cuál era tu cargo, en cuál empresa y cuales eran tus responsabilidades.`}
        />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='max-w-[448px] space-y-4'>
          {renderContent()}
        </form>
      </Form>
    </div>
  );
};

interface StageHeaderProps {
  step: string;
  sliderValue: number;
  description: string;
}

export const StageHeader: React.FC<StageHeaderProps> = ({ step, sliderValue, description }) => {
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='font-medium'>{step}</h3>
      <Slider defaultValue={[sliderValue]} max={100} disabled withOutThumb />
      <p>{description}</p>
    </div>
  );
};

export default InterviewPage;
