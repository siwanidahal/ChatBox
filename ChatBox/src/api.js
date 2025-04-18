import axios from "axios";
const api=axios.create({baseURL:"https://chat-api-sqww.onrender.com/api"})
api.interceptors.request.use(
    (config)=>{
        const Token=localStorage.getItem("token")
if (Token){
    config.headers.Authorization=`Bearer ${Token}`
}
return config
    },(error)=>Promise.reject(error)
)
export default api