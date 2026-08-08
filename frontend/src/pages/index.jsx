import { useRouter } from "next/router";
import styles from '@/styles/Home.module.css'
import UserLayout from "@/layout/UserLayout";



export default function Home() {

  const router = useRouter();

  return (
    <UserLayout>
      <div className={styles.container}>

        <div className={styles.mainContainer}>

          <div className={styles.mainContainer_left}>
            <p>Connect with friends without Exaggeration</p>
            <p>A True social media platform, with stories no bluff !</p>
            
            <div onClick={() => {
              router.push("/login")
            }} className={styles.buttonJoin}>
              <p>Join Now</p>
            </div>

          </div>
          <div className={styles.mainContainer_right}>
            <img src="images/home_connection.jpg" alt="" /> 
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
