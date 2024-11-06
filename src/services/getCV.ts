export async function getCV(cv_path: string): Promise<Blob> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${cv_path}`, {
    method: 'GET',
  });
  const blob = await response.blob();

  return blob;
}
