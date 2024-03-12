import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {getItem} from './session';

const BASE_URL = 'https://bkk-api.orbitallabs.net';

export interface Response<T = any> {
  data?: T;
  errors?: string[];
  message: string;
  status: number;
}

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export async function fetcher<TResponse = any, TError = any, TData = any>(
  requestConfig: AxiosRequestConfig<TData>,
) {
  try {
    instance.interceptors.request.use(
      async function (config) {
        const headers = config.headers;

        const token = await getItem('token');
        if (token && headers) {
          headers.set('Authorization', `Bearer ${token}`);
        }

        headers.set('Content-Type', 'application/json');
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      },
    );
    const {data} = await instance.request<Response<TResponse>>(requestConfig);

    // if proxy return 500 then throw error
    if (data.status === 500) {
      throw data.message;
    }

    return data;
  } catch (error) {
    throw (error as AxiosError<TResponse, TData>).response?.data as TError;
  }
}
