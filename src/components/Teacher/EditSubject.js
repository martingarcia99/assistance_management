import React from 'react'
import {useState,useEffect} from 'react'
import {db} from '../../firebase-config'
import {collection,getDocs,getDoc,doc,updateDoc,query,where} from 'firebase/firestore'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useParams, useNavigate} from 'react-router-dom'

const EditTeacher = () => {

    const subjectCollectionRef = collection(db,"subjects")
    const [desc, setDescripcion] = useState('')
    const [newNombre, setNewNombre] = useState('')
    const [nombre, setNombre] = useState('')
    const [curso, setCurso] = useState('')
    const [horario, setHorario] = useState('')
    const [profesor, setProfesor] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    var newFields ={}
    const{id} = useParams()

    const editTeacher = async () => {

        const teacher = doc(db, "subjects", id)

        const q = query(subjectCollectionRef, where("nombre", "==", nombre))
        
        const querySnapshot = await getDocs(q)

        if(querySnapshot.empty) {   
            if(nombre === ""){
                newFields = {nombre:nombre,descripcion:desc,curso:curso,profesor:teacher,horario:horario}
            }else{
                newFields = {nombre:newNombre,descripcion:desc,curso:curso,profesor:teacher,horario:horario}
            }   
            await updateDoc(nombre,newFields)
            navigate('/HomeTeacher')
        }else{
            setError("La asignatura ya existe.")
        }
    }



    useEffect(() => {
        const setData = async () => {
            const docRef = doc(db, "subjects", id)
            const docSubject = await getDoc(docRef)
            
            setNombre(docSubject.data().nombre)
            setDescripcion(docSubject.data().descripcion)
            setCurso(docSubject.data().curso)
            setProfesor(docSubject.data().profesor)
            setHorario(docSubject.data().horario)
    
        }
        setData()
    },[])

    return (
        <div className="flex m-36 mt-36 ml-96 shadow-2xl">
            <Form className="items-center justify-center ml-20 p-32 h-48 mr-20 ">
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" value={nombre} onChange={(event) => {setNewNombre(event.target.value)}}/>
                    <Form.Text className="text-muted">
                        {error}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 ml-2">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control type="text" value={descripcion} onChange={(event) => {setDescripcion(event.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Curso</Form.Label>
                    <Form.Control type="text" value={curso} onChange={(event) => {setCurso(event.target.value)}}/>
                </Form.Group>
    
                <Button className="text-center items-center justify-center" onClick={() => {editTeacher()}}>
                    Editar Asignatura
                </Button>
            </Form>
        </div> 
    )
}

export default EditTeacher;