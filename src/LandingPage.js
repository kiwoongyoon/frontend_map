import React, { useState } from 'react'
import { Button } from 'bootstrap'
import MapContainer from './mapContainer'

function LandingPage() {
  const [InputText, setInputText] = useState('')
  const [Place, setPlace] = useState('')

  const onChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPlace(InputText)
    setInputText('')
  }

  return (
    <>
    
      <form className="inputForm" onSubmit={handleSubmit} style={{
        margin: "0px 0px 10px 0px",

      }}>
        <input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
        <button type="submit">검색</button>
      </form>

      <MapContainer searchPlace={Place} />
    </>
  )
}

export default LandingPage