import { axiosInstance } from '../axios-config';

export const getData = async (reqUrl) => await axiosInstance.get(reqUrl);