import { UploadResponse, Upload } from '@/schemas/schemas';
import { request } from '@/services/service';

export async function upload(data: Upload): Promise<UploadResponse> {
  const response = await request<UploadResponse>({
    url: process.env.NEXT_PUBLIC_UPLOAD_ENDPOINT ?? '',
    method: 'POST',
    data: data,
  });

  return {
    cv_path: response.cv_path,
  };
}
