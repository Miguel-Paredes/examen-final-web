import axios from "axios"
import { createContext, useEffect, useState } from "react"

// Creacion del Grupo de whatsapp (AuthContext)
const AuthContext = createContext()

// Contenido del mensaje a ser enviado 
//                      componentes (estudiantes)
const AuthProvider = ({ children }) => {
    // Creacion de usestate - perfil edl usuario que va a iniciar sesion
    const [auth, setAuth] = useState({})

    // Crear la funcion obtener el usuario del endpoint para el perfil usuario 
    const perfil = async(token) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/perfil`
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta= await axios.get(url,options)
            setAuth(respuesta.data)
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarPerfil = async(datos) => {
        const token = localStorage.getItem('token')
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/veterinario/${datos.id}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url, datos, options)
            perfil(token)
            return {respuesta:respuesta.data.msg,tipo:true}
        } catch (error) {
            return {respuesta:error.response.data.msg,tipo:false}
        }
    }

    const actualizarPassword = async (datos) => {
        const token = localStorage.getItem('token')
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/veterinario/actualizarpassword`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url, datos, options)
            return { respuesta: respuesta.data.msg, tipo: true }
        } catch (error) {
            return { respuesta: error.response.data.msg, tipo: false }
        }
    }


    // Creacion del useeffect para que se ejecute la funcion perfil 
    // cuando el componente se cargue
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token)
        {
            perfil(token)
        }
    }, [])
    
    // Retornar en el contenido el mensaje
    return (
        <AuthContext.Provider value={
            // El mensaje a ser enviado al grupo de whatsapp
            {
                auth,
                setAuth,
                actualizarPerfil,
                actualizarPassword
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}
export default AuthContext