import React, { useEffect, useState } from 'react'
import UserLayout from "@/layout/UserLayout"
import styles from './style.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { registerUser } from '@/config/redux/action/authAction'

function LoginComponent() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  const [userLoginMethod, setUserLoginMethod] = useState(false);


  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);


  useEffect(()=> {
    if(authState.loggedIn) {
      router.push("/dashboard")
    }
  }, [authState.loggedIn])


  const handleRegister = () => {
    dispatch(registerUser({ username, name, email, password }));
    console.log("Registering user with:", { username, name, email, password });
  }


  return (
    <UserLayout>
    <div className={styles.container}>

      <div className={styles.cardContainer}>

        <div className={styles.cardContainer_left}>
          <p className={styles.cardLeft_heading}>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
          <p style={{color: authState.isError ? 'red' : 'green'}}>{authState.message.message}</p>

          <div className={styles.input_container}>

            <div className={styles.input_row}>

              <input 
              onChange={(e)=> setUsername(e.target.value)}
              type="text" placeholder='Username' className={styles.input_field} />

              <input 
              onChange={(e)=> setName(e.target.value)}
              type="text" placeholder='Name' className={styles.input_field} />

            </div>
            <input 
            onChange={(e)=> setEmail(e.target.value)}
            type="text" placeholder='Email' className={styles.input_field} />

            <input 
            onChange={(e)=> setPassword(e.target.value)}
            type="text" placeholder='Password' className={styles.input_field} />

            <div
            onClick = {
              () => {
                if(userLoginMethod) {
                  // Handle login logic here
                } else {
                  handleRegister();
                }
              }
            }
             className={styles.submit_button}>
              <p>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
            </div>

          </div>

        </div>
        

        <div className={styles.cardContainer_right}>

        </div>

      </div>
    </div>
    </UserLayout>
  )
}

export default LoginComponent