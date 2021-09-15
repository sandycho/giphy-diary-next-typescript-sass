import type { NextPage } from "next"
import styles from '../../styles/Users.module.css'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useState } from "react"

const Users: NextPage = () => {
  const [username, setUsername] = useState<string>("")
  const router = useRouter()
  const dispatch = useDispatch()

  // TODO check whether this async function needs special treatment
  const createUser = async () => {
    const res = await fetch('/api/users', {  method: 'POST', body: JSON.stringify({ username }) })
    const {id: userId} = await res.json()

    // TODO save user in global storage
      dispatch({
        type: 'LOGIN',
        username: username,
        userId
      })
    

    if(res.status === 200) {
      // redirect to gifs page and pass the user id
      router.push('/gifs')
    } else {
      // throw a friendly error
      console.warn('Uh-oh! Something went wrong.')
    }
  }
  return (<div style={{width: '100%'}}>
    <div>Hello</div>

    <div style={{width: '100%', display: "flex"}}>
      <input className={`input-text ${styles['form-input']}`} placeholder="e.i. sandycho" onChange={e => setUsername(e.target.value)}/>
      <button className="btn-primary form-button" onClick={createUser}>Sign me up!</button>
    </div></div>)
}

export default Users