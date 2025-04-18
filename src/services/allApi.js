import { commonApi } from "./commonApi"
import serverUrl from "./serverUrl"

export const adminLoginApi = async (reqBody)=>{
    return await commonApi("POST",`${serverUrl}/admin-login`,reqBody)
}
export const staffRegisterApi = async (reqBody)=>{
    return await commonApi("POST",`${serverUrl}/register-login`,reqBody)
}
export const staffLoginApi = async (reqBody)=>{
    return await commonApi("POST",`${serverUrl}/staff-login`,reqBody)
}
export const addProductApi = async (reqBody,reqHeader)=>{
    return await commonApi("POST",`${serverUrl}/add-product`,reqBody,reqHeader)
}
export const allProductApi = async (reqHeader,searchKey)=>{
    return await commonApi("GET",`${serverUrl}/all-product?search=${searchKey}`,{},reqHeader)
}
export const allStaffApi = async (reqHeader)=>{
    return await commonApi("GET",`${serverUrl}/all-staffs`,{},reqHeader)
}
export const updateProductApi = async (id,reqBody,reqHeader)=>{
    return await commonApi("PUT",`${serverUrl}/update-product/${id}/edit`,reqBody,reqHeader)
}
export const removeProductApi = async (id,reqHeader)=>{
    return await commonApi("DELETE",`${serverUrl}/delete-product/${id}/remove`,{},reqHeader)
}
export const updateStaffApi = async (id,reqBody,reqHeader)=>{
    return await commonApi("PUT",`${serverUrl}/update-staff/${id}/edit`,reqBody,reqHeader)
}
// /delete-staff/:id/remove
export const removeStafftApi = async (id,reqHeader)=>{
    return await commonApi("DELETE",`${serverUrl}/delete-staff/${id}/remove`,{},reqHeader)
}
export const submitSaleApi = async (reqbody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/sales`, reqbody, reqHeader);
  };

export const getOutOfStockApi = async (reqHeader)=>{
    return await commonApi("GET",`${serverUrl}/out-of-stock`,{},reqHeader)
}
export const totalProductApi = async (reqHeader)=>{
    return await commonApi("GET",`${serverUrl}/total`,{},reqHeader)
}