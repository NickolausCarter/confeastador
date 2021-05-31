import React, { useState } from 'react';
import { useParams } from "react-router-dom";

function ViewRestaurant() {
  const {id} = useParams();

  return (
    <div>
      AREA TO VIEW ONE RESTAURANT!!!<br />
      THe restaurant id is {id}
    </div>
  );
}

export default ViewRestaurant;
