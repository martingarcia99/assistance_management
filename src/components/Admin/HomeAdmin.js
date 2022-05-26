import React from 'react'
import {useState,useEffect} from 'react'
import {db} from '../../firebase-config'
import {collection, getDocs} from 'firebase/firestore'

const HomeAdmin = () => {
    const [teachers, setTeachers] = useState([])
    const teacherCollectionRef = collection(db,"teachers")

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
                return <div>
                    <h1>Correo: {teacher.correo}</h1>
                    <h1>Contraseña: {teacher.contraseña}</h1>
                </div>
            })}
        </div>
    )
}

export default HomeAdmin;