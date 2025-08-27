import { IResponse } from "src/interface/success-res-interface";

export const getSuccess=(data:object,statusCode:number=200):IResponse=>{
    return {
        statusCode,
        message:'success',
        data
    }
}