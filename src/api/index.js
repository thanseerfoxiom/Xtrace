import { ApiCall } from "../services/ApiCall"
import { dishesapi, kitchenoperationsapi, productsapi, receivingsapi, recipesapi, restaurantsapi, storageItemsapi, storagesapi, suppliersapi, thermometersapi } from "../services/BaseUrls"

export const fetchProduct = async(params)=> {
    const response = await ApiCall("GET",productsapi,null,params);
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}
export const fetchSuppliers = async(params)=> {
    const response = await ApiCall("GET",suppliersapi,null,params);
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}
export const fetchRestuarent = async(params)=> {
    const response = await ApiCall("GET",restaurantsapi,null,params);
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}
export const fetchReceiving = async(params)=> {
    const response = await ApiCall("GET",receivingsapi,null,params);
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}
export const fetchStorages = async(params)=> {
    const response = await ApiCall("GET",storagesapi,null,params);
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}
export const fetchStorageItems = async(params)=> {
    const response = await ApiCall("GET",storageItemsapi,null,params);
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}
export const fetchdishesItems = async(params)=> {
    const response = await ApiCall("GET",dishesapi,null,params);
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}
export const fetchrecepieItems = async(params)=> {
    const response = await ApiCall("GET",recipesapi,null,params);
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}
export const fetchthermometersItems = async(params)=> {
    const response = await ApiCall("GET",thermometersapi,null,params);
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}
export const fetchReceivingproductItem = async(receivigId)=> {
    const response = await ApiCall("GET",`${receivingsapi}/${receivigId}`,null);
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}
export const fetchkitchenoperationsItem = async(params)=> {
    const response = await ApiCall("GET",`${kitchenoperationsapi}`,null,params);
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}