import React from 'react'
import styles from './styles.module.css'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '@/config/redux/reducer/authReducer';

function NavbarComponent() {

  const dispatch = useDispatch();
  const router = useRouter();

  const authState = useSelector((state) => state.auth)

  return (
    <div className={styles.container}>
        <nav className={styles.navbar}>


            <h2 onClick={()=> {
              router.push('/')
            }}>Pro Connect</h2>

            <div className={styles.navBarOptionContainer}>

            {authState.profileFetched && <div>
              <div style={{display: "flex", gap: "1.2rem"}}>
                <p
                onClick={()=>{
                  router.push("/profile");
                }}
                 style={{fontWeight: "bold", cursor: "pointer"}}>Profile</p>
                <p style={{fontWeight: "bold", cursor: "pointer"}} onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(reset());
                  router.push("/login")
                }}>Logout</p>
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