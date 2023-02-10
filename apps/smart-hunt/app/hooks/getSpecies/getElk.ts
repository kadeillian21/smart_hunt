import { useEffect, useState } from "react";
import axios from "axios";

export function GetElk() {
  const [elk, setElk] = useState([])

  const getElk = () => {
    axios.get('http://localhost:3000/api/elk')
      .then(res => {
        setElk(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(getElk, [])
}
