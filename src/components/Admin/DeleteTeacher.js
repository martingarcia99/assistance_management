import React from 'react'
import {useState,useEffect} from 'react'
import {db} from '../../firebase-config'
import {collection, getDocs, doc, deleteDoc} from 'firebase/firestore'
import Button from 'react-bootstrap/Button'
import {useNavigate} from 'react-router-dom'

const DeleteTeacher = () => {

    const [teachers, setTeachers] = useState([])
    const teacherCollectionRef = collection(db,"teachers")
    const navigate = useNavigate()

    const deleteTeacher = async(id) => {
        const teacherDoc = doc(db,"teachers",id)
        await deleteDoc(teacherDoc)
        window.location.reload()
    }

    useEffect(() => {
        const getTeachers = async () => {
            const data = await getDocs(teacherCollectionRef)
            setTeachers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }

        getTeachers()
    },[])

    return (
        <div className="p-7 text-2xl font-semibold flex-1 h-screen overflow-scroll">
            {teachers.map((teacher) => {
                return <div className="flex flex-row">
                    <h1>Correo: {teacher.correo}</h1>
                    <Button className="text-center items-center justify-center" onClick={() => {deleteTeacher(teacher.id)}}>
                        Eliminar
                    </Button>
                </div>
            })}
        </div>
    )
}

export default DeleteTeacher;