import * as api from '../api';
import {FETCH_ALL,CREATE,UPDATE,DELETE,LIKE, FETCH_BY_SEARCH} from '../constants/actionTypes';

export const getPosts=()=>async (dispatch)=>{

    try {
        const {data}=await api.postlarGetir();
        const action ={type:FETCH_ALL,payload:data}
        dispatch(action)
    } catch (error) {
        console.log(error.message);
    }
    
}

export const createPost=(post)=>async (dispatch)=>{

    try {
        const {data}=await api.postOlustur(post)
        dispatch({type:CREATE,payload:data})
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost=(id,post)=>async (dispatch)=>{
    try {
        const {data}=await api.postGuncelle(id,post)
        dispatch({type:UPDATE,payload:data})
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost=(id)=>async (dispatch)=>{
    try {
        await api.postSil(id)
        dispatch({type:DELETE,payload:id})
    } catch (error) {
        console.log(error.message);
    }
}

export const likePost=(id)=>async (dispatch)=>{
    try {
        const {data}=await api.begeniDegistir(id)
        dispatch({type:LIKE,payload:data})
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
      const { data:{data} } = await api.aramaSonucuGetir(searchQuery);
	  //console.log(data);
      dispatch({type:FETCH_BY_SEARCH,payload:data})
    } catch (error) {
        console.log(error);
    }
};