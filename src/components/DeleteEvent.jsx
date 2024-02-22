import React from 'react'
import axios from "axios"
import {useParams, useNavigate} from "react-router-dom"

function DeleteEvent() {
    const { eventId } = useParams();
    const navigate= useNavigate()
    axios
        .delete(`http://localhost:5005/events/${eventId}`)
        .then(()=>{
            navigate(`/events`)
        })
}

export default DeleteEvent
