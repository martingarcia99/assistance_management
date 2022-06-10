import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useState,useEffect} from 'react'
import {db} from '../../firebase-config'
import {collection, addDoc,where,query,getDocs} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/authContext'

const CreateSubject = () => {

    const [nombre, setNombre] = useState('')
    const [error, setError] = useState('')
    const [desc, setDesc] = useState('')
    const [horario, setHorario] = useState('')
    const subjectsCollectionRef = collection(db,"subjects")
    const navigate = useNavigate()

    const {user} = useAuth()
    const [teacher, setTeacher] = useState('')
    const [curso, setCurso] = useState('')

    useEffect(() => {
        setTeacher(user.email)
    },[])

    const createSubject = async () => {
        
        const q = query(subjectsCollectionRef, where("nombre", "==", nombre))
        
        const querySnapshot = await getDocs(q)

        if(querySnapshot.empty) {
            try{
                await addDoc(subjectsCollectionRef,{nombre:nombre,descripcion:desc,curso:curso,profesor:teacher,horario:""})
                //await sendPasswordResetEmail(auth.currentUser)
                navigate('/HomeTeacher')
            }catch(error){
                if(error.code === "auth/invalid-email"){
                    setError("Correo invalido")
                }
            }
        }else
            setError("la asignatura ya existe")
        
    }

    return (
        <div className="flex m-36 mt-36 ml-96 shadow-2xl">
            <Form className="items-center justify-center ml-20 p-32 h-48 mr-20">
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" onChange={(event) => {setNombre(event.target.value)}}/>
                    <Form.Text className="text-muted">
                        {error}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 w-96">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control as="textarea" rows={4} onChange={(event) => {setDesc(event.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Curso</Form.Label>
                    <Form.Control type="text" onChange={(event) => {setCurso(event.target.value)}}/>
                </Form.Group>
                
                <Button className="text-center items-center justify-center center ml-32" onClick={() => {createSubject()}}>
                    Crear Asignatura
                </Button>
            </Form>
        </div>
    )
}

export default CreateSubject;