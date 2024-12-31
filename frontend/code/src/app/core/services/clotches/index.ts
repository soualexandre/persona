
import axiosInstance from '../../../config/axios.config'

export const getClothes = async () => {
  try {
    const response = await axiosInstance.get('/clothes');
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    console.error('Error fetching clothes:', error);
    throw new Error('Erro ao buscar as roupas');
  }
};


export const getClothesById = async () => {
  try {
    const id = 'b1d28e0c-16f1-4936-87cd-2de817b5f858';
    const response = await axiosInstance.get(`/clothes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching clothes:', error);
    throw new Error('Erro ao buscar as roupas');
  }
};