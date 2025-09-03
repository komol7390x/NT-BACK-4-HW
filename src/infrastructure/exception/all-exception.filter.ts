import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const res = ctx.getResponse<Response>()

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
        let errorMessage = 'Internal Server Error'

        if (exception instanceof HttpException) {
            const exceptionRes = exception.getResponse()
            console.log('Error Global: ', exceptionRes);

            if (typeof exceptionRes == 'string') {
                errorMessage = exceptionRes
            } else if (typeof exceptionRes == 'object' && exceptionRes != null) {
                const message = (exceptionRes as any).message
                
                if (Array.isArray(message)) {
                    errorMessage = message.join(', ')
                } else {
                    errorMessage = message || errorMessage
                }
            }
        }
        const errorRes={
            statusCode:status,
            error:{message:errorMessage}
        }
        res.status(status).json(errorRes)
    }
}