import { Audio, ExperienceResponse } from '@/schemas/schemas';
import { request } from '@/services/service';

export async function postExperience(experience: Audio): Promise<ExperienceResponse> {
  const response = await request<ExperienceResponse>({
    url: process.env.NEXT_PUBLIC_EXPERIENCE_ENDPOINT ?? '',
    method: 'POST',
    contentType: 'multipart/form-data',
    data: experience,
  });

  return {
    experience: response.experience,
  };
}
