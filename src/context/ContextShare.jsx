import React, { createContext, useState } from 'react'
export const addProductContext = createContext()
export const editProductContext = createContext()
export const editStaffContext = createContext()

const ContextShare = ({ children }) => {

  const [addProductResponse, setAddProductResponse] = useState("")
  const [editProductResponse, setEditProductResponse] = useState("")
  const [editStaffResponse, setEditStaffResponse] = useState("")
  return (
    <addProductContext.Provider value={{ addProductResponse, setAddProductResponse }}>
      <editProductContext.Provider value={{ editProductResponse, setEditProductResponse }}>
        <editStaffContext.Provider value={{ editStaffResponse, setEditStaffResponse }}>
          {children}
        </editStaffContext.Provider>
      </editProductContext.Provider>
    </addProductContext.Provider>
  )
}

export default ContextShare