import axios from 'axios';

const url = '/posts';

const API = axios.create({baseURL:'http://localhost:4000'});
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export const postlarGetir=(page)=>axios.get(`${url}?page=${page}`);
export const postOlustur=(newPost)=>API.post(url,newPost);
export const postGuncelle=(id,updatedPost)=>API.patch(`${url}/${id}`,updatedPost);
export const postSil=(id)=>API.delete(`${url}/${id}`);
export const begeniDegistir=(id)=>API.patch(`${url}/${id}/likePost`);
export const aramaSonucuGetir=(searchQuery)=>API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}`)
export const girisYap=(formData)=>axios.post('/user/signin',formData);
export const kayitOl=(formData)=>axios.post('/user/signup',formData);