import { Audio, SkillsResponse } from '@/schemas/schemas';
import { request } from '@/services/service';

export async function postSkills(skills: Audio, token: string): Promise<SkillsResponse> {
  const response = await request<SkillsResponse>({
    url: process.env.NEXT_PUBLIC_SKILLS_ENDPOINT ?? '',
    method: 'POST',
    contentType: 'multipart/form-data',
    data: skills,
    token,
  });

  return {
    skills: response.skills,
    suggestions: response.suggestions,
  };
}
