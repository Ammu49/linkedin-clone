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

    if(authState.user){

  return (
    <UserLayout>
      
      <DashboardLayout>
          
        <div className={ styles.scrollComponent }>


          <div className= {styles.createPostContainer}></div>
              {authState.user?.userId?.profilePicture && (
                <img 
                width={100}
                    src={`${BASE_URL}/uploads/${authState.user.userId.profilePicture}`}
                    alt=""
                />
            )}
            <textarea placeholder='What is on your mind?' name='id' ></textarea>
            <label>
            <div className="fab">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
            </label>
            <input type="file" name='id' id='id' style={{display: "none"}} />
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