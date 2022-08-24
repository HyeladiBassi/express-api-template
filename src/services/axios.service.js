import { instance } from '../config/axios';
import { logError } from '../utils';

export const getDataFromPath = async () => {
  try {
    const response = await instance.get(`/path`);
    return response ? response.data : null;
  } catch (error) {
    logError(error);
    throw error;
  }
};
