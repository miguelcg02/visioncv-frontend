'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';

import { getAllCV } from '@/services/getAllCV';
import { Button } from '@/components/ui/button';
import { getPath } from '@/services/getPath';
import { getCV } from '@/services/getCV';
import { useTextToSpeechContext } from '@/context/TextToSpeechProvider';
import { useCVDataContext } from '@/context/CVDataProvider';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const DownloadCVsPage = () => {
  const [cvs, setCvs] = useState<{ id: string; cv_name: string }[]>([]);
  const [downloading, setDownloading] = useState(false);
  const { getToken } = useAuth();

  const { personalDetails } = useCVDataContext();

  const { speak } = useTextToSpeechContext();

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const token = await getToken();
        if (token) {
          const response = await getAllCV(token);
          setCvs(response.cvs);
        } else {
          // eslint-disable-next-line no-console
          console.error('Token is null');
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching CVs:', error);
      }
    };

    fetchCVs();
  }, [getToken]);

  async function handleDownload(cv_id: string) {
    try {
      speak('Descargando CB...');

      setDownloading(true);
      const token = await getToken();
      if (token) {
        // getting path
        const { cv_path } = await getPath({ cv_id }, token);
        // downloading file
        const blob = await getCV(cv_path, token);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${personalDetails.name.replace(/\s+/g, '-').toUpperCase()}-VISION-CV.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        setDownloading(false);
      } else {
        throw new Error('Token is null');
      }
    } catch (error) {
      speak(`Error al descargar la CB, ${error}`);
    }
  }

  return (
    <div className='mx-auto mt-8 max-w-3xl p-4'>
      <div className='flex justify-between'>
        <h1 className='mb-6 text-2xl font-semibold'>Mis CVs</h1>
        <Link href='/'>
          <Button type='button' variant='outline' aria-label='Botón para regresar a la pantalla homepage'>
            Volver
          </Button>
        </Link>
      </div>
      <ul className='space-y-4'>
        {cvs.map((cv) => (
          <li
            key={cv.id}
            className='flex items-center justify-between rounded-md border border-primary bg-[#161d16] p-3'
          >
            <span>{cv.cv_name}</span>
            <Button onClick={() => handleDownload(cv.id)} aria-label={`Descargar ${cv.cv_name}`}>
              <Download className='h-5 w-5' />
            </Button>
          </li>
        ))}
      </ul>

      <Dialog open={downloading} onOpenChange={setDownloading}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Descargando CV</DialogTitle>
            <DialogDescription>
              En estos momentos estamos procesando tu CV, por favor espera un momento.
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

export default DownloadCVsPage;
