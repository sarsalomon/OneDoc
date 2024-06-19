import { $authHost } from "./index";

export const fetchDataContract = async () =>{
    const { data } = await $authHost.post('api/contract/');
    return data
}

export const addDataContract = async (datas) =>{
    const { data } = await $authHost.post('api/contract/add', datas);
    return data
}

export const getDataContract = async (id) =>{
    const { data } = await $authHost.get('api/contract/get/' + id);
    return data
}

export const updateDataContract = async (id, title) =>{
    const { data } = await $authHost.post('api/contract/update/', { id, title });
    return data
}

export const deleteDataContract = async (id)  =>{
    const { data } = await $authHost.post('api/contract/delete/', { id });
    return data
}