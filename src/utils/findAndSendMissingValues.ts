import AppError from "../utils/AppError";

const findAndSendMissingValues = (
    list: string[],
    source: Record<string, any>
) => {
    const finalData: Record<string, any> = {};

    for (const key of list) {
        if (source[key]) {
            finalData[key] = source[key];
        } else {
            console.error(`${key} is required`);
            throw new AppError(`${key} is required`, 400);
        }
    }

    return finalData;
};

export default findAndSendMissingValues;
