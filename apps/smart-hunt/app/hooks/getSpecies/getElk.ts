import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Elk } from '../../../types/elk';

const UseGetElkData = () => {
  const [elkData, setElkData] = useState<Elk[]>([]);

  useEffect(() => {
    const fetchElkData = async () => {
      try {
        const response = await axios.get("http://localhost:4200/api/elk");
        setElkData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchElkData();
  });
  
  return elkData;
};

export default UseGetElkData;
