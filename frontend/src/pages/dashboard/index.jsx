import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/config/redux/action/postAction';
import { getAboutUser, getAllUsers } from '@/config/redux/action/authAction';
import UserLayout from '@/layout/UserLayout';
import DashboardLayout from "@/layout/DashboardLayout/index";
import styles from './style.module.css'
import { BASE_URL } from '@/config/index.jsx'

function Dashboard() {

    const router = useRouter();

    const dispatch = useDispatch();

    const authState = useSelector((state) => state.auth)


    useEffect(() => {
      if(authState.isTokenThere) {
        dispatch(getAboutUser({ token: localStorage.getItem("token") }));
        dispatch(getAllPosts())
      }
      if(!authState.all_profiles_fetched) {
            dispatch(getAllUsers());
        }
    }, [authState.isTokenThere] )



    const [postContent, setPostContent] = useState("");

    const [fileContent, setFileContent] = useState();

    if(authState.user){

  return (
    <UserLayout>
      
      <DashboardLayout>
          
        <div className={ styles.scrollComponent }>


          <div className= {styles.createPostContainer}>
              {authState.user?.userId?.profilePicture && (
                <img className={styles.userProfile}
                width={100}
                    src={`${BASE_URL}/uploads/${authState.user.userId.profilePicture}`}
                    alt=""
                />
            )}
            <textarea placeholder='What is on your mind?' name='' id='' className={styles.postTextarea}
            onChange={(e)=> {
              setPostContent(e.target.value)
            }} value={postContent}></textarea>
            <label htmlFor='file-upload'>
            <div className={styles.fab}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>
            </label>
            <input type="file" hidden id='file-upload' onChange={(e)=> {
              setFileContent(e.target.files[0])
            }}/>
            {postContent.length > 0 && <div className={styles.uploadButton}>Post</div>}
            

            </div>
        </div>



      </DashboardLayout>

    </UserLayout>
  )
}  else {
  return (
    <UserLayout>
      <DashboardLayout>
        <div className={ styles.scrollComponent }>
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    </UserLayout>
  )
}
}
export default Dashboard