import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useState} from 'react'
import {db} from '../../firebase-config'
import {collection, addDoc,where,query,getDocs} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'

const CreateTeacher = () => {

    const [email, setEmail] = useState([])
    const [nombre, setNombre] = useState([])
    const [error, setError] = useState([])
    const teacherCollectionRef = collection(db,"teachers")
    const navigate = useNavigate()

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

        if(querySnapshot.empty) {
            navigate('/')
            await addDoc(teacherCollectionRef,{nombre:nombre,apellidos:null,departamento:null,correo:email,contraseña:await generateP(),asignaturas:[]})
        }else
            setError("correo en uso")
        
    }

    return (
        <div className="flex m-36 mt-36 ml-96 shadow-2xl">
            <Form className="items-center justify-center ml-20 p-32 h-48 mr-20">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" onChange={(event) => {setNombre(event.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
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