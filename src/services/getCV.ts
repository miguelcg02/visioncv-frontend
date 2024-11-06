export async function getCV(cv_path: string, token: string): Promise<Blob> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${cv_path}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const blob = await response.blob();

  return blob;
}
