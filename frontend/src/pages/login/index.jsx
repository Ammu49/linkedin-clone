import React, { useEffect, useState } from 'react'
import UserLayout from "@/layout/UserLayout"
import styles from './style.module.css'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

function LoginComponent() {

  const router = useRouter();

  const [userLoginMethod, setUserLoginMethod] = useState(false);


  const authState = useSelector((state) => state.auth);


  useEffect(()=> {
    if(authState.loggedIn) {
      router.push("/dashboaerd")
    }
  })




  return (
    <UserLayout>
    <div className={styles.container}>

      <div className={styles.cardContainer}>

        <div className={styles.cardContainer_left}>
          <p className={styles.cardLeft_heading}>{userLoginMethod ? "Sign In" : "Sign Up"}</p>


          <input type="text" placeholder='Email' className={styles.cardLeft_input} />
          <input type="password" placeholder='Password' className={styles.cardLeft_input} />
          <input type="text" placeholder='Username' className={styles.cardLeft_input} style={{display: userLoginMethod ? "none" : "block"}} />


        </div>

        <div className={styles.cardContainer_right}>

        </div>

      </div>
    </div>
    </UserLayout>
  )
}

export default LoginComponent