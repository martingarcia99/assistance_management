import React from 'react'
import {useState,useEffect} from 'react'
import {db} from '../../firebase-config'
import {collection, getDocs,doc,deleteDoc} from 'firebase/firestore'
import Button from 'react-bootstrap/Button'
import {useNavigate} from 'react-router-dom'
import { BiUser } from "react-icons/bi";

const HomeAdmin = () => {
    const [teachers, setTeachers] = useState([])
    const [term, setTerm] = useState([])
    const teacherCollectionRef = collection(db,"teachers")
    const navigate = useNavigate()

    const deleteTeacher = async(id) => {
        const teacherDoc = doc(db,"teachers",id)
        await deleteDoc(teacherDoc)
        window.location.reload()
    }

    const editTeacher = async (id) => {
        navigate('/editTeacher/' + id)
    }

    function searchingTerm(term) {
        return function(x){
            return x.nombre.toLowerCase().includes(term) || !term
        }
    }

    useEffect(() => {
        const getTeachers = async () => {
            const data = await getDocs(teacherCollectionRef)
            setTeachers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }

        getTeachers()
    },[])

    return (
        <div className="p-7 text-2xl font-semibold flex-1 overflow-y-hidden h-screen">
            <input
                className="border-none hover:border-none p-2 flex-start"
                placeholder = "Búsqueda de Profesores"
                name="term"
                onChange={e => setTerm(e.target.value)}
            />
            <div className="grid grid-cols-3 mt-6 overflow-y-scroll h-5/6">
                {teachers.filter(searchingTerm(term)).map((teacher) => {
                    return (
                    <div className="card flex flex-row h-fit shadow-xl ml-2 mt-2 items-center">
                        <BiUser size='2rem' className="ml-4"/>
                        <div className="card-body">
                            <p className="card-text">Nombre: {teacher.nombre}</p>
                            <p className="card-text">Correo: {teacher.correo}</p>
                            
                            <Button className="text-center items-center justify-center" onClick={() => {editTeacher(teacher.id)}}>
                                Editar
                            </Button>
                            <Button className="text-center items-center justify-center ml-2" onClick={() => {deleteTeacher(teacher.id)}}>
                                Eliminar
                            </Button>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    )
}

export default HomeAdmin;