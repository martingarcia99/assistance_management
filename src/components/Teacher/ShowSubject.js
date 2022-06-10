import React from 'react'
import {useState,useEffect} from 'react'
import {db} from '../../firebase-config'
import {collection, getDocs,doc,deleteDoc,where,query} from 'firebase/firestore'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import {useNavigate} from 'react-router-dom'
import { BiBookBookmark } from "react-icons/bi";
import { useAuth } from '../../context/authContext'

const HomeTeacher = () => {
    
    const [term, setTerm] = useState([])
    const [subjects, setSubjects] = useState([])
    const subjectCollectionRef = collection(db,"subjects")
    const navigate = useNavigate()

    const {user} = useAuth()

    const deleteSubject= async(id) => {
        const subjectDoc = doc(db,"subjects",id)
        await deleteDoc(subjectDoc)
        window.location.reload()
    }

    const editSubject = async (id) => {
        navigate('/editSubject/' + id)
    }
    
    const createSchedule = async (id) => {
        navigate('/createSchedule/' + id)
    }

    function searchingTerm(term) {
        return function(x){
            return x.nombre.toLowerCase().includes(term) || !term
        }
    }

    useEffect(() => {

        const getSubjects = async () => {

            const q = query(subjectCollectionRef, where("profesor", "==", user.email))
        
            const data = await getDocs(q)

            setSubjects(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }

        getSubjects()
    },[])

    return (
        <div className="p-7 text-2xl font-semibold flex-1 overflow-y-hidden h-screen w-10">
            <Table striped bordered hover>
            <thead>
                <tr>
                <th></th>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miercoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>9:30</td><td></td><td></td><td></td><td></td><td></td>
                </tr>
                <tr>
                <td>10:30</td><td></td><td></td><td></td><td></td><td></td>
                </tr>
                <tr>
                <td>11:30</td><td></td><td></td><td></td><td></td><td></td>
                </tr>
                <tr>
                <td>12:30</td><td></td><td></td><td></td><td></td><td></td>
                </tr>
                <tr>
                <td>13:30</td><td></td><td></td><td></td><td></td><td></td>
                </tr>
                <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td>
                </tr>
                <tr>
                <td>15:30</td><td></td><td></td><td></td><td></td><td></td>
                </tr>
                <tr>
                <td>16:30</td><td></td><td></td><td></td><td></td><td></td>
                </tr>
                <tr>
                <td>17:30</td><td></td><td></td><td></td><td></td><td></td>
                </tr>
                <tr>
                <td>18:30</td><td></td><td></td><td></td><td></td><td></td>
                </tr>
                <tr>
                <td>19:30</td><td></td><td></td><td></td><td></td><td></td>
                </tr>
            </tbody>
            </Table>
        </div>
    )
}

export default HomeTeacher;