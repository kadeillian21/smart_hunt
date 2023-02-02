import React from "react"
import connectToDB from "../../lib/dbConnect"

export function Antelope() {
  const antelopes = antelopes.map(antelope => {}
  return (
    <div>{antelopes}</div>
  )
}

export async function getServerSideProps() {
  await connectToDB

  const result = await Antelope.find({})
  const antelopes = result.map(doc => {
    const antelope = doc.toObject()
    antelope._id = antelope._id.toString()
    return antelope
  }
}

export default Antelope
