
// import { ShowToast } from "@/utils/Toast";
import axios from "axios";
import { BaseUrl } from "./BaseUrls";

export const ApiCall = async (method, endPoint, data, params, is_formdata) => {
  var headers = {
    "Content-Type": is_formdata ? "multipart/form-data" : "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
    platform: "web",
  };
  var url = BaseUrl + endPoint;
  // var url = "api/v1/products";
  try {
    const res = await axios({
      method,
      url,
      params,
      data,
      // headers,
    });
    // const res = await axios.get("/api/v1/products")
    console.log("res",res)
    var response = { status: true, message: res.data };
    return response;
  } catch (error) {
    // console.log(error);
    
    if (error?.response?.status === 401) {
    //   if (localStorage.getItem("access")) {
    //     localStorage.clear();
    //     window.location.href = "/login";
    //   }
  }
    
    // ShowToast(error?.response?.data?.message, false);
    return {
      status: false,
      message: error?.response?.data?.message ?? "something went wrong",
      statusCode:error?.status
    };
  }
};