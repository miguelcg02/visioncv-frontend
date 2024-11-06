import { Audio, SkillsResponse } from '@/schemas/schemas';
import { request } from '@/services/service';

export async function postSkills(skills: Audio): Promise<SkillsResponse> {
  const response = await request<SkillsResponse>({
    url: process.env.NEXT_PUBLIC_SKILLS_ENDPOINT ?? '',
    method: 'POST',
    contentType: 'multipart/form-data',
    data: skills,
  });

  return {
    skills: response.skills,
  };
}
