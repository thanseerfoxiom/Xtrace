import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiCall } from "./ApiCall";
import { ShowToast } from "../utils/Toast";

 
export const useCustomMutation = () => {
  const queryClient = useQueryClient();
 
  const mutation = useMutation({
    mutationFn: async ({ method, url, values,key, next, resetForm }) => {
      const response = await ApiCall(method, url, values);
      console.log(response);
    
      if (response?.status) {
      
        ShowToast(response?.message?.message, "success");
        if(key){
          queryClient.invalidateQueries([key]);
        }
        next();
        return  response?.message?.data;
      } else {
     
        if(response?.statusCode===500){
          ShowToast("Internal Server Error", "error");
          return
        }
        ShowToast(response?.response?.data?.message, "error");
        
        throw new Error(`HTTP status ${response.status}`);
      }
    },
  });
 
  return { mutation };
};