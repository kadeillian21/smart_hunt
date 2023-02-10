import { useEffect, useState } from "react";
import axios from "axios";

export default function GetElk() {
  const [elk, setElk] = useState([]);

  const getElk = () => {
    axios.get("http://localhost:3000/api/elk")
      .then((res) => {
        setElk(res.data.filter((elk) => elk.license_year === 2021));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getElk, []);
}
