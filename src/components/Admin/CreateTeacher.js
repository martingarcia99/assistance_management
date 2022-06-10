import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useState} from 'react'
import {db} from '../../firebase-config'
import {collection, addDoc,where,query,getDocs} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { auth } from '../../firebase-config'
import {sendEmailVerification,sendPasswordResetEmail} from 'firebase/auth'

const CreateTeacher = () => {

    const [email, setEmail] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [departamento, setDepartamento] = useState('')
    const [error, setError] = useState('')
    const [uni, setUni] = useState('')
    const teacherCollectionRef = collection(db,"teachers")
    const navigate = useNavigate()

    const {signup} = useAuth()

    const generateP = async () => {
        var pass = '';
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
                'abcdefghijklmnopqrstuvwxyz0123456789@#$';
          
        for (var i = 1; i <= 8; i++) {
            var char = Math.floor(Math.random() * str.length + 1);
              
            pass += str.charAt(char)
        }
          
        return pass
    }

    const createTeacher = async () => {
        
        const q = query(teacherCollectionRef, where("correo", "==", email))
        
        const querySnapshot = await getDocs(q)

        var contraseña = await generateP()

        if(querySnapshot.empty) {
            try{
                await signup(email,contraseña)
                await addDoc(teacherCollectionRef,{nombre:nombre,apellidos:apellidos,departamento:departamento,universidad:uni,correo:email,contraseña:contraseña})
                //await sendPasswordResetEmail(auth.currentUser)
                navigate('/')
            }catch(error){
                if(error.code === "auth/invalid-email"){
                    setError("Correo invalido")
                }
            }
        }else
            setError("correo en uso")
        
    }

    return (
        <div className="flex m-36 mt-36 ml-96 shadow-2xl">
            <Form className="items-center justify-center ml-20 p-32 h-48 mr-20">
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" onChange={(event) => {setNombre(event.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control type="text" onChange={(event) => {setApellidos(event.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Universidad</Form.Label>
                    <Form.Control type="text" onChange={(event) => {setUni(event.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Departamento</Form.Label>
                    <Form.Control type="text" onChange={(event) => {setDepartamento(event.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control type="email" onChange={(event) => {setEmail(event.target.value)}}/>
                    <Form.Text className="text-muted">
                        {error}
                    </Form.Text>
                </Form.Group>
                
                <Button className="text-center items-center justify-center" onClick={() => {createTeacher()}}>
                    Crear Profesor
                </Button>
            </Form>
        </div>
    )
}

export default CreateTeacher;