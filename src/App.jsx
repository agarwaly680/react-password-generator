import { useCallback, useEffect, useState, useRef } from 'react'

import './App.css'

function App() {
  const [pass,setPass]=useState('hjshdksjds')
  const [length,setLength]=useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false)
  const copyRef=useRef()
  const passwordGenerator=useCallback(()=>{
    let str='QWERTYUIOPASDFGHJKLMNBVCXZmnbvcxzasdfghjklpoiuytrewq'
    let password=''
    if(numberAllowed) str+="1234567890"
    if(charAllowed) str+="!@#$%^&*~"
    for(let i=0;i<length;i++){
      let randnum=Math.floor(Math.random()*str.length)
      password+=str[randnum]
    }
    setPass(password)
  },[setPass,length,numberAllowed,charAllowed])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed])

  const copyPassword=()=>{
    navigator.clipboard.writeText(copyRef.current.value)
    copyRef.current.select()
  }

  return(
    <div className='container'>
      <div className='search'>
        <input type="text" value={pass} ref={copyRef} readOnly/>
        <button onClick={copyPassword}>copy</button>
      </div>
      <div className='range'>
        <input type="range" min={8} max={60} value={length} onChange={(e)=>setLength(e.target.value)}/>
        <span>Length: {length}</span>
        <input type="checkbox" checked={numberAllowed} onChange={()=>setNumberAllowed(!numberAllowed)} />
        <span>Number</span>
        <input type="checkbox" checked={charAllowed} onChange={()=>setCharAllowed(!charAllowed)}/>
        <span>Character</span>
      </div>
    </div>
  )
}

export default App


