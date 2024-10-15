import axios, { AxiosRequestConfig, Method } from 'axios';

import { ApiError } from '@/lib/ApiError';
import { ApiResponse } from '@/schemas/apiResponse';

interface RequestProps {
  url: string;
  method: Method;
  contentType?: string;
  data?: unknown;
}

export const request = async <T>({ url, method, contentType = 'application/json', data }: RequestProps): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      url,
      method,
      headers: {
        'Content-Type': contentType,
      },
      data: contentType === 'application/json' ? JSON.stringify(data) : data,
    };

    if (contentType === 'multipart/form-data') {
      if (config.headers) {
        delete config.headers['Content-Type'];
      }
    }

    const response = await axios(config);

    const responseData: ApiResponse<T> = response.data;

    if (!responseData.success) {
      throw new ApiError(responseData.error || 'Error en la petición', response.status);
    }

    return responseData.data as T;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status || 500;
      const errorMessage = error.response?.data?.error || 'Error en la petición';
      throw new ApiError(errorMessage, statusCode);
    }

    throw new ApiError(error.message, 500);
  }
};
