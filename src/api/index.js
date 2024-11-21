import { ApiCall } from "../services/ApiCall"
import { productsapi, receivingsapi, restaurantsapi, suppliersapi } from "../services/BaseUrls"

export const fetchProduct = async(page,limit)=> {
    const response = await ApiCall("GET",productsapi,null,{page,limit});
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}
export const fetchSuppliers = async(page,limit)=> {
    const response = await ApiCall("GET",suppliersapi,null,{page,limit});
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}
export const fetchRestuarent = async(page,limit)=> {
    const response = await ApiCall("GET",restaurantsapi,null,{page,limit});
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}
export const fetchReceiving = async(page,limit)=> {
    const response = await ApiCall("GET",receivingsapi,null,{page,limit});
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}