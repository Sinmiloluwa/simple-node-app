export const createdResponse = (message: string, data: any = null) => {
    return successResponse(message, data);
};

export const successResponse = (message: string, data: any = null) => {
    const response: { status: boolean; message: string; data?: any } = {
        status: true,
        message
    };

    if (data) {
        response.data = data;
    }

    return response;
};
export const errorResponse = (message: string, data: any = null) => {  
    return {
        status: false,
        message,
    };
}

export const validationError = (message: string, errors: any = null) => {  
    return {
        status: false,
        message,
        errors
    };
}