import React, { useEffect, useState } from 'react'
import UserLayout from "@/layout/UserLayout"
import styles from './style.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { registerUser, loginUser } from '@/config/redux/action/authAction'
import { emptyMessage } from '@/config/redux/reducer/authReducer'

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

  useEffect(()=> {
    dispatch(emptyMessage());
  }, [userLoginMethod])

  useEffect(()=> {
    if(localStorage.getItem("token")) {
      router.push("/dashboard")
    }
  }, [])


  const handleRegister = () => {
    dispatch(registerUser({ username, name, email, password }));
    console.log("Registering user with:", { username, name, email, password });
  }

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  }

  return (
    <UserLayout>
    <div className={styles.container}>

      <div className={styles.cardContainer}>

        <div className={styles.cardContainer_left}>
          <p className={styles.cardLeft_heading}>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
          <p style={{color: authState.isError ? 'red' : 'green'}}>{authState.message?.message || ""}</p>

          <div className={styles.input_container}>

            {
              !userLoginMethod && (
                <div className={styles.input_row}>

              <input 
              onChange={(e)=> setUsername(e.target.value)}
              type="text" placeholder='Username' className={styles.input_field} />

              <input 
              onChange={(e)=> setName(e.target.value)}
              type="text" placeholder='Name' className={styles.input_field} />

            </div>
              )
            }
            <input 
            onChange={(e)=> setEmail(e.target.value)}
            type="text" placeholder='Email' className={styles.input_field} />

            <input 
            onChange={(e)=> setPassword(e.target.value)}
            type="password" placeholder='Password' className={styles.input_field} />

            <div
            onClick = {
              () => {
                if(userLoginMethod) {
                  handleLogin();
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
            <p>{userLoginMethod ? "Already have an account?" : "Don't have an account?"}</p>

            <div
            style={{color: "black", width: "150px", textAlign: "center", cursor: "pointer"}}
            onClick={() => setUserLoginMethod(!userLoginMethod)}
            className={styles.submit_button}>
              <p>{userLoginMethod ? "Sign Up" : "Sign In"}</p>
            </div>
        </div>

      </div>
    </div>
    </UserLayout>
  )
}

export default LoginComponent