import axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/AuthProvider'


const FormularioPerfil = () => {
    const { auth } = useContext(AuthContext)
    const [datos, setDatos] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        direccion: '',
    })

    const handleChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        try{
            console.log(datos)
            e.preventDefault()
            const token = localStorage.getItem('token')
            const url = `${process.env.VITE_BACKEND_URL}/veterinario/${auth._id}`
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url, datos, options)
            console.log(respuesta)
            setDatos({
                nombre: '',
                apellido: '',
                email: '',
                telefono: '',
                direccion: '',
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form>

            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre'
                    name='nombre'
                    onChange={handleChange}
                    value={datos.nombre}
                />
            </div>
            <div>
                <label
                    htmlFor='apellido'
                    className='text-gray-700 uppercase font-bold text-sm'>Apellido: </label>
                <input
                    id='apellido'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='apellido'
                    name='apellido'
                    onChange={handleChange}
                    value={datos.apellido}
                />
            </div>
            <div>
                <label
                    htmlFor='telefono'
                    className='text-gray-700 uppercase font-bold text-sm'>Telefono: </label>
                <input
                    id='telefono'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='telefono'
                    name='telefono'
                    onChange={handleChange}
                    value={datos.telefono}
                />
            </div>
            <div>
                <label
                    htmlFor='email'
                    className='text-gray-700 uppercase font-bold text-sm'>Email: </label>
                <input
                    id='email'
                    type="email"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='email'
                    name='email'
                    onChange={handleChange}
                    value={datos.email}
                />
            </div>
            <div>
                <label
                    htmlFor='direccion'
                    className='text-gray-700 uppercase font-bold text-sm'>Direccion: </label>
                <input
                    id='direccion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='direccion'
                    name='direccion'
                    onChange={handleChange}
                    value={datos.direccion}
                />
            </div>

            <input
                type="submit"
                className='bg-gray-800 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-600 cursor-pointer transition-all'
                value='Actualizar'
                onClick={handleSubmit}
            />
        </form>
    )
}

export default FormularioPerfil