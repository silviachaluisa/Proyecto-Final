import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { createContext, useEffect, useState } from "react"

const AuthContext = createContext(); // Crear el contexto (Grupo de estados)

// Crear el componente proveedor del contexto (Estado global)
const AuthProvider = ({ children }) => {
    // Almacenar la información del usuario autenticado
    const [auth, setAuth] = useState({})

    // Función para obtener el perfil del usuario autenticado
    const perfil = async(token) => {
        try {
            const user = jwtDecode(token) // Decodificar el token
            const url = user?.rol == "paciente" ? `${process.env.VITE_BACKEND_URL}/paciente/perfil` : `${process.env.VITE_BACKEND_URL}/perfil`
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

    const actualizarPassword = async (datos) => {
        const token = localStorage.getItem('token')
        try {
            const url = `${process.env.VITE_BACKEND_URL}/veterinario/actualizarpassword`
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

    const actualizarPerfil = async(datos) => {
        const token = localStorage.getItem('token')
        try {
            const url = `${process.env.VITE_BACKEND_URL}/veterinario/${datos.id}`
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

    useEffect(() => {
        // Recuperar el token del localStorage
        const token = localStorage.getItem('token')
        // Si existe el token, obtener el perfil del usuario autenticado
        if(token)
        {
            perfil(token)
        }
    }, [])
    
    // Retornar el proveedor del contexto con los valores del estado global
    return (
        <AuthContext.Provider value={
            {
                auth, // Estado global
                setAuth, // Función para cambiar el estado global
                actualizarPassword, // Función para actualizar el password
                actualizarPerfil // Función para actualizar el perfil
            }
        }>
            {children} {/* Componentes hijos */}
        </AuthContext.Provider>
    )
}

// Exportar el contexto y el proveedor del contexto (Estado global)
export {
    AuthProvider
}
export default AuthContext // Exportar el contexto