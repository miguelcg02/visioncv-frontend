import { Audio, EducationResponse } from '@/schemas/schemas';
import { request } from '@/services/service';

export async function postEducation(education: Audio): Promise<EducationResponse> {
  const response = await request<EducationResponse>({
    url: process.env.NEXT_PUBLIC_EDUCATION_ENDPOINT ?? '',
    method: 'POST',
    contentType: 'multipart/form-data',
    data: education,
  });

  return {
    education: response.education,
  };
}
