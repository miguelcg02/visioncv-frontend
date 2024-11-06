import { GetAllCVResponse } from '@/schemas/schemas';
import { request } from '@/services/service';

export async function getAllCV(token: string): Promise<GetAllCVResponse> {
  const response = await request<GetAllCVResponse>({
    url: process.env.NEXT_PUBLIC_ALL_CV_ENDPOINT ?? '',
    method: 'GET',
    token,
  });

  return {
    cvs: response.cvs,
  };
}
