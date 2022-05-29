import React from 'react'
import {useState,useEffect} from 'react'
import {db} from '../../firebase-config'
import {collection,getDocs,getDoc,doc,updateDoc,query,where} from 'firebase/firestore'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useParams, useNavigate} from 'react-router-dom'

const EditTeacher = () => {

    const teacherCollectionRef = collection(db,"teachers")
    const [email, setEmail] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [departamento, setDepartamento] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    var newFields ={}
    const{id} = useParams()

    const editTeacher = async () => {

        const teacher = doc(db, "teachers", id)

        const q = query(teacherCollectionRef, where("correo", "==", newEmail))
        
        const querySnapshot = await getDocs(q)

        if(querySnapshot.empty) {   
            if(newEmail == ""){
                newFields = {correo:email,nombre:nombre,apellidos:apellidos,departamento:departamento,contraseña:password}  
            }else{
                newFields = {correo:newEmail,nombre:nombre,apellidos:apellidos,departamento:departamento,contraseña:password}  
            }   
            await updateDoc(teacher,newFields)
            navigate('/')
        }else{
            setError("correo en uso")
        }
    }



    useEffect(() => {
        const setData = async () => {
            const docRef = doc(db, "teachers", id)
            const docTeacher = await getDoc(docRef)
            
            setEmail(docTeacher.data().correo)
            setNombre(docTeacher.data().nombre)
            setApellidos(docTeacher.data().apellidos)
            setDepartamento(docTeacher.data().departamento)
            setPassword(docTeacher.data().contraseña)
    
        }
        setData()
    },[])

    return (
        <div className="flex m-36 mt-36 ml-96 shadow-2xl">
            <Form className="items-center justify-center ml-20 p-32 h-48 mr-20 ">
                <div className="flex flex-row">
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" value={nombre}onChange={(event) => {setNombre(event.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3 ml-2">
                        <Form.Label>Apellidos</Form.Label>
                        <Form.Control type="text" value={apellidos}onChange={(event) => {setApellidos(event.target.value)}}/>
                    </Form.Group>
                </div>
                <Form.Group className="mb-3">
                    <Form.Label>Departamento</Form.Label>
                    <Form.Control type="text" value={departamento}onChange={(event) => {setDepartamento(event.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control type="email" placeholder="Nuevo correo" onChange={(event) => {setNewEmail(event.target.value)}}/>
                    <Form.Text className="text-muted">
                        {error}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Nueva contraseña" onChange={(event) => {setPassword(event.target.value)}}/>
                </Form.Group>
    
                <Button className="text-center items-center justify-center" onClick={() => {editTeacher()}}>
                    Editar Profesor
                </Button>
            </Form>
        </div> 
    )
}

export default EditTeacher;