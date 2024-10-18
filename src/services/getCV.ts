import { request } from '@/services/service';

export async function getCV(cv_path: string): Promise<Blob> {
  const response = await request<Blob>({
    url: `${process.env.NEXT_PUBLIC__ENDPOINT}${cv_path}` ?? '',
    method: 'GET',
  });

  return response;
}
