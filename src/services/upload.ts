import { UploadResponse, Upload } from '@/schemas/schemas';
import { request } from '@/services/service';

export async function upload(data: Upload, token: string): Promise<UploadResponse> {
  const response = await request<UploadResponse>({
    url: process.env.NEXT_PUBLIC_UPLOAD_ENDPOINT ?? '',
    method: 'POST',
    data: data,
    token,
  });

  return {
    cv_id: response.cv_id,
  };
}
