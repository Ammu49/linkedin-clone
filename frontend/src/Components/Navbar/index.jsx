import React from 'react'
import styles from './styles.module.css'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';

function NavbarComponent() {


  const router = useRouter();

  const authState = useSelector((state) => state.auth)

  return (
    <div className={styles.container}>
        <nav className={styles.navbar}>


            <h3 onClick={()=> {
              router.push('/')
            }}>Pro Connect</h3>

            <div className={styles.navBarOptionContainer}>

            {authState.profileFetched && <div>
              <div style={{display: "flex", gap: "1.2rem"}}>
                <p>Hey, &nbsp; {authState.user.userId.name}</p>
                <p style={{fontWeight: "bold", cursor: "pointer"}}>Profile</p>
            </div>
        
        </div>}


            {
              !authState.profileFetched && 
              <div onClick={() => {
              router.push("/login")
            }} className={styles.buttonJoin}>
              <p>Be a part</p>
            </div>}

</div>


        </nav>
    </div>
  )
}

export default NavbarComponent