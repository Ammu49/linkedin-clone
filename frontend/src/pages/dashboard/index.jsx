import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/config/redux/action/postAction';
import { getAboutUser } from '@/config/redux/action/authAction';
import UserLayout from '@/layout/UserLayout';

function Dashboard() {

    const router = useRouter();

    const dispatch = useDispatch();

    const authState = useSelector((state) => state.auth)

    const [isTokenThere, setIsTokenThere] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('token') === null){
            router.push('/login')
        }

        setIsTokenThere(true)
    }, [router]);

    useEffect(() => {
      if(isTokenThere) {
        dispatch(getAboutUser({ token: localStorage.getItem("token") }));
        dispatch(getAllPosts())
      }
    }, [isTokenThere, dispatch] )

  return (
    <UserLayout>
      {authState.profileFetched && <div>
        <div style={{display: "flex", gap: "1.2rems"}}>
          <p>Hey, {authState.user.userId.name}</p>
          <p style={{fontWeight: "bold", cursor: "pointer"}}>Profile</p>
        </div>
        
        </div>}
    </UserLayout>
  )
}

export default Dashboard