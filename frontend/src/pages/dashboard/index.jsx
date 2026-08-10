import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/config/redux/action/postAction';
import { getAboutUser, getAllUsers } from '@/config/redux/action/authAction';
import UserLayout from '@/layout/UserLayout';
import DashboardLayout from "@/layout/DashboardLayout/index";

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
    }, [authState.isTokenThere, dispatch] )

  return (
    <UserLayout>
      
      <DashboardLayout>
          <h2>Dashboard</h2>
      </DashboardLayout>

    </UserLayout>
  )
}

export default Dashboard