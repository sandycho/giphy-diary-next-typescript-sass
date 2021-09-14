import type { NextPage } from "next"
import styles from '../../styles/Users.module.css'

const createUser = async (username: string) => {
  const res = await fetch('/api/users', {  method: 'POST', body: JSON.stringify({ username }) })
  const {id: userId} = await res.json()

  if(res.status === 200) {
    // redirect to gifs page and pass the user id
  } else {
    // throw a friendly error
  }
}

const Users: NextPage = () => {
  return (<div style={{width: '100%'}}>
    <div>Hello</div>

    <div style={{width: '100%', display: "flex"}}>
      <input className={`input-text ${styles['form-input']}`} placeholder="e.i. sandycho"/>
      <button className="btn-primary form-button" onClick={()=>createUser('sandycho')}>Sign me up!</button>
    </div></div>)
}

export default Users