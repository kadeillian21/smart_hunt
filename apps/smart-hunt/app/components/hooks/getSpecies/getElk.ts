import axios from "axios";

export async function getElk() {
  const response = await axios.get('http://localhost:4200/api/species/elk')
  const elk = response.data;
  return elk;
}
