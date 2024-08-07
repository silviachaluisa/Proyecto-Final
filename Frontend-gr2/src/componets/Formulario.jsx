import axios from 'axios';
import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import Mensaje from "./Alertas";

export const Formulario = ({ paciente }) => {
    // Convertir la fecha ISO 8601 a formato 'YYYY-MM-DD'
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState({})
    
    const [form, setForm] = useState({
        nombre: paciente?.paciente?.nombre ?? "",
        propietario: paciente?.paciente?.propietario ?? "",
        email: paciente?.paciente?.email ?? "",
        celular: paciente?.paciente?.celular ?? "",
        convencional: paciente?.paciente?.convencional ?? "",
        salida: formatDate(paciente?.paciente?.salida) ?? "",
        sintomas: paciente?.paciente?.sintomas ?? ""
    })

    const handleChange = (e) => {
        setForm({
            ...form, // copia del estado
            [e.target.name]:e.target.value // nombre: "valor"
        })
    }

    const handleSubmit = async(e) => { 
        e.preventDefault() // Previene el comportamiento por defecto del formulario
        if (paciente?.paciente._id){
            // Actualizar
            try {
                const token = localStorage.getItem('token')
                const url = `${process.env.VITE_BACKEND_URL}/paciente/actualizar/${paciente.paciente._id}`
                const options={
                    headers: {
                        'Content-Type': 'application/json', // Informar al servidor que se envia un JSON
                        Authorization: `Bearer ${token}` // Enviar el token en la cabecera
                    }
                }
                const response = await axios.put(url,form,options)
                setMensaje({ 
                    respuesta:"paciente registrado con exito y correo enviado",
                    tipo: true
                })
                setTimeout(() => {
                    navigate('/dashboard/listar');
                }, 3000);
                console.log(response);
            } catch (error) {
                console.log(error);
                setMensaje({ 
                    respuesta: error.response.data.msg,
                    tipo: false 
                })
                setTimeout(() => {
                    setMensaje({})
                }, 3000);
            }
        } else {
            // Crear
            try {
                const token = localStorage.getItem('token')
                const url = `${process.env.VITE_BACKEND_URL}/paciente/registro`
                const options={
                    headers: {
                        'Content-Type': 'application/json', // Informar al servidor que se envia un JSON
                        Authorization: `Bearer ${token}` // Enviar el token en la cabecera
                    }
                }
                const response = await axios.post(url,form,options)
                setMensaje({ 
                    respuesta:"paciente registrado con exito y correo enviado",
                    tipo: true
                })
                setTimeout(() => {
                    navigate('/dashboard/listar');
                }, 3000);
                console.log(response);
            } catch (error) {
                console.log(error);
                setMensaje({ 
                    respuesta: error.response.data.msg,
                    tipo: false 
                })
                setTimeout(() => {
                    setMensaje({})
                }, 3000);
            }
        }
        
    }

    return (
        <form onSubmit={handleSubmit}>
            {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>
                <label
                    htmlFor='nombre:'
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Nombre de la mascota:
                </label>

                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre de la mascota'
                    name='nombre'
                    value={form.nombre}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='propietario:'
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Nombre del propietario: 
                </label>

                <input
                    id='propietario'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre del propietario'
                    name='propietario'
                    value={form.propietario}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='email:'
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Email:
                </label>

                <input
                    id='email'
                    type="email"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='email del propietario'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='celular:'
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Celular: 
                </label>

                <input
                    id='celular'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='celular del propietario'
                    name='celular'
                    value={form.celular}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='convencional:'
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Convencional:
                </label>

                <input
                    id='convencional'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='convencional del propietario'
                    name='convencional'
                    value={form.convencional}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='Salida:'
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Fecha de salida:
                </label>

                <input
                    id='salida'
                    type="date"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='salida'
                    name='salida'
                    value={form.salida}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='sintomas:'
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Síntomas:
                </label>

                <textarea
                    id='sintomas'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Ingrese los síntomas de la mascota'
                    name='sintomas'
                    value={form.sintomas}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className='bg-gray-600 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all'
                value={paciente?.paciente ? 'Actualizar': 'Registrar'}
            />
        </form>
    )
}