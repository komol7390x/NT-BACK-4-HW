export const getRessponse = (data: object,statusCode: number = 200,)=>{
    return {
        statusCode,
        message: 'success',
        data
    }
}
