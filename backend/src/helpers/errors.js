export const handleError = (errorInfo, res) => {
    const { error, statusCode, message } = errorInfo;

    if (error) {
        console.log(error);
    }

    if (typeof statusCode !== 'number' || typeof message !== 'string') {
        throw new Error("Invalid errorInfo object. 'statusCode' must be a number and 'message' must be a string.");
    }

    return res.status(statusCode).json({ error: message });
};