import React from 'react'
import {useState,useEffect} from 'react'
import {db} from '../../firebase-config'
import {collection,where,query,getDocs,getDoc} from 'firebase/firestore'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const EditTeacher = () => {

    const [teachers, setTeachers] = useState([])
    const teacherCollectionRef = collection(db,"teachers")
    const [email, setEmail] = useState([])
    const [nombre, setNombre] = useState([])
    const [error, setError] = useState([])

    const editTeacher = async () => {

    }

    const loadForm = async (nombre) => {

        const q = query(teacherCollectionRef, where("nombre", "==", nombre))
        
        const querySnapshot = await getDoc(q)
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
            <select onChange={(event) => {loadForm(event.target.value)}}>
                {teachers.map((teacher) => {
                    return(
                        <option value={teacher.nombre}>
                            {teacher.nombre}
                        </option>
                    )
                })}
            </select>
            <Form className="items-center justify-center ml-20 p-32 h-48 mr-20">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" onChange={(event) => {setNombre(event.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control type="email"  onChange={(event) => {setEmail(event.target.value)}}/>
                    <Form.Text className="text-muted">
                        {error}
                    </Form.Text>
                </Form.Group>
    
                <Button className="text-center items-center justify-center" onClick={() => {editTeacher()}}>
                    Crear Profesor
                </Button>
            </Form>
        </div> 
    )
}

export default EditTeacher;