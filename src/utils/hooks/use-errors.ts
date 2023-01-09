import { AxiosResponse } from 'axios';
import { SESSION_EXPIRED } from '../../constants';

export type ErrorDetails = {
  key: string;
  message: string;
};

export default function useErrors() {
  const getServerErrors = (
    response: AxiosResponse,
    isAllErrors = false
  ): { errorCode: number; errors: string } => {
    let error = 'Something went wrong. Please try again later.';
    if (!response) return { errorCode: 0, errors: error };
    if (response.status == 422 || response.status == 409) {
      if (response.data.error) {
        let errorMessage = '';
        let errorDetails = '';
        if (response.data.error.message) {
          errorMessage = response.data.error.message as string;
        } else if (response.data.error.detail) {
          (response.data.error.detail as ErrorDetails[]).forEach((element) => {
            errorDetails += `<p>${element.message}.</p>`;
          });
          errorDetails = '<div>' + error + '</div>';
        }
        if (!isAllErrors && errorMessage) {
          error = errorMessage;
        } else if (isAllErrors && errorMessage) {
          error = errorMessage + errorDetails;
        }
      }
    } else if (response.status == 404) {
      error = response.data.message as string;
    } else if (response.status == 403) {
      error = response.data.message as string;
    } else if (response.status == 427) {
      error = response.data.message as string;
    } else if (response.status == 401) {
      error = SESSION_EXPIRED;
    }
    return { errorCode: response.status, errors: error };
  };

  return {
    getServerErrors
  };
}
