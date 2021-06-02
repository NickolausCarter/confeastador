import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { QUERY_RESTAURANT } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { REMOVE_RESERVATION } from "../utils/mutations";
import { useMutation } from "@apollo/react-hooks";


function DeleteReservation() {
    const {_id: idParam} = useParams();
    console.log(idParam);
    const [removeReservation, { data_mutation }] = useMutation(REMOVE_RESERVATION); 

    removeReservation({ variables: { _id: idParam} });
    window.location.assign("/reservation");

    return (
        <div>
        Reservation was deleted
        </div>
    );
    
}

export default DeleteReservation;
