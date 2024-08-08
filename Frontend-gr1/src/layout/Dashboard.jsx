import { useContext, useEffect } from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'

const Dashboard = () => {
    const location = useLocation()

    const { auth, setAuth } = useContext(AuthContext)
    const tokenAuth = localStorage.getItem("token")
    
    console.log("auth = ",auth)

    const urlActual = location.pathname

    const handleExit = () => {
        localStorage.removeItem("token")
        setAuth({})
    }

    return (
        <div className='md:flex md:min-h-screen'>

            <div className='md:w-1/5 bg-gray-800 px-5 py-4'>

                <h2 className='text-4xl font-black text-center text-slate-200'>APP-DEMO</h2>

                <img src="https://cdn-icons-png.flaticon.com/512/2138/2138508.png" alt="img-client" className="m-auto mt-8 p-1 border-2 border-slate-500 rounded-full" width={120} height={120} />
                <p className='text-slate-400 text-center my-4 text-sm'> <span className='bg-green-600 w-3 h-3 inline-block rounded-full'></span> Bienvenido - {"propietario" in Object.keys(auth) ? auth?.propietario :auth?.nombre}</p>
                <p className='text-slate-400 text-center text-sm'> <span className='bg-orange-600 w-3 h-3 inline-block rounded-full'></span> Rol - {auth?.rol}</p>
                <hr className="mt-5 border-slate-500" />

                <ul className="mt-5">

                    <li className="text-center">
                        <Link to='/dashboard' className={`${urlActual === '/dashboard' ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Perfil</Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/listar' className={`${urlActual === '/dashboard/listar' ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Listar</Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/crear' className={`${urlActual === '/dashboard/crear' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Crear</Link>
                    </li>
                </ul>

            </div>

            <div className='flex-1 flex flex-col justify-between h-screen bg-gray-100'>
                <div className='bg-gray-800 py-2 flex md:justify-end items-center gap-5 justify-center'>
                    <div className='text-md font-semibold text-slate-100'>
                        Usuario - {
                            "propietario" in Object.keys(auth) ? auth?.propietario :auth?.nombre 
                        }
                    </div>
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" alt="img-client" className="border-2 border-green-600 rounded-full" width={50} height={50} />
                    </div>
                    <div>
                        {/**Boton para cerrar sesion */}
                        <button 
                            className='text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-800 px-4 py-1 rounded-lg'
                            onClick={handleExit}
                        >Salir</button>
                    </div>
                </div>
                <div className='overflow-y-scroll p-8'>
                    {/** Verificar si el usuario se ha autenticado antes de proceder
                     *  Si el usuario no esta autentitado lo redireccionara a la ruta '\login'
                     */}
                    {tokenAuth ? <Outlet/> : <Navigate to="/login" />}
                </div>
                <div className='bg-gray-800 h-12'>
                    <p className='text-center  text-slate-100 leading-[2.9rem] underline'>Todos los derechos reservados</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard