import { GetPath, GetPathResponse } from '@/schemas/schemas';
import { request } from '@/services/service';

export async function getPath(cv_id: GetPath, token: string): Promise<GetPathResponse> {
  const response = await request<GetPathResponse>({
    url: `${process.env.NEXT_PUBLIC_DOWNLOAD_ENDPOINT}/${cv_id.cv_id}`,
    method: 'GET',
    token,
  });

  return {
    cv_path: response.cv_path,
  };
}
