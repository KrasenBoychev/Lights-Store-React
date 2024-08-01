import { createRecord } from '../../api/data';

export const useCreateLight = () => {
    const createLightHandler = async (data) => {
        await createRecord(data);
    };

    return createLightHandler;
};