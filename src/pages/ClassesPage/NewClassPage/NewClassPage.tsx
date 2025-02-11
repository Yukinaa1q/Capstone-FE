import React from 'react'
import ClassForm from '../ClassForm'

const NewClassPage = () => {
  return (
    <section className="px-8 py-4">
      <h1 className="text-center font-bold text-2xl">ADD NEW CLASS</h1>
      <ClassForm className="mx-auto md:w-3/5 ld:w-3/4 xl:w-1/2" />
    </section>
  )
}

export default NewClassPage