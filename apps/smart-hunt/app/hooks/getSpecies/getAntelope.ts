import { useEffect, useState } from "react";
import axios from "axios";

export function GetAntelope() {
  const [antelope, setAntelope] = useState([])

  const getAntelope = () => {
    axios.get('http://localhost:3000/api/antelope')
      .then(res => {
        setAntelope(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(getAntelope, [])
}
