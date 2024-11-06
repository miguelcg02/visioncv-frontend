export async function getCV(cv_path: string, token: string): Promise<Blob> {
  // console.log('getCV', cv_path, 'HOLAAAAAAAAAAA', token);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${cv_path}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const blob = await response.blob();

  return blob;
}
