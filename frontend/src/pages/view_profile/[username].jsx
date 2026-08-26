import { useSearchParams } from 'next/navigation'
import styles from './index.module.css'

import React, { useEffect, useState } from 'react'
import { BASE_URL, clientServer } from '@/config';
import DashboardLayout from '@/layout/DashboardLayout';
import UserLayout from '@/layout/UserLayout';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/config/redux/action/postAction';
import { sendConnectionRequest, getConnectionRequest, getMyConnectionRequests } from '@/config/redux/action/authAction';

function viewProfile({userProfile}) {

  const router = useRouter();

  const [isConnectionNull, setIsConnectionNull] = useState(true)

  const postReducer = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const [userPosts, setUserPosts] = useState([]);

  const [isCurrentUserInConnection, setIsCurrentuserInConnection] = useState(false);

  const getUsersPost = async () => {
    await dispatch(getAllPosts());
    await dispatch(getConnectionRequest({token: localStorage.getItem("token")}));
    await dispatch(getMyConnectionRequests({token: localStorage.getItem("token")}))
  }


  useEffect(()=> {
    let post = postReducer.posts.filter((post)=> {
      return post.userId.username === router.query.username;
    })

    setUserPosts(post);
  }, [postReducer.posts])

  useEffect(()=> {
    
    if(
      authState.connections.some(user => user.connectionId?._id === userProfile?.userId?._id)){
      setIsCurrentuserInConnection(true);
      if(authState.connections.find(user => user.connectionId._id === userProfile.userId._id).status_accepted === true){
          setIsConnectionNull(false)
        }
    }

    if(
      authState.connectionRequests.some(user => user.userId._id === userProfile.userId._id)){
        setIsCurrentuserInConnection(true);
      if(authState.connectionRequests.find(user=> user.userId._id === userProfile.userId._id).status_accepted === true){
          setIsConnectionNull(false)
        }
    }
      
    
  }, [authState.connections, authState.connectionRequests])


    const searchParameters = useSearchParams();



    useEffect(()=> {
      console.log(authState.connections, userProfile.user?._id)
     
        
    })

    useEffect(()=> {
      getUsersPost();
    }, [])



  return (
    <UserLayout>
      <DashboardLayout>
        <div className={styles.container}>
          <div className={styles.backDropContainer}>
            <img className={styles.backDrop} src={`${BASE_URL}/uploads/${userProfile.userId.profilePicture}`} alt=''/>
          </div>
          <div className={styles.profileContainer_details}>
            <div style={{display: 'flex', gap: '0.7rem'}}>
              <div style={{flex: '0.8'}}>
                <div style={{display: 'flex', width: 'fit-content', alignItems: 'center', gap: '1.2rem'}}>
                  <p style={{ color: 'grey'}}>@{userProfile.userId.username}</p>
                </div>

                {
                  isCurrentUserInConnection ? <button className={styles.connectionButton} >{isConnectionNull ? "Pending" : "Connected"}</button> : <button onClick={async()=>{
                    await dispatch(sendConnectionRequest({ token: localStorage.getItem("token"), connectionId: userProfile.userId?._id}));
                    await dispatch(getConnectionRequest({
                      token: localStorage.getItem("token")
                  }));
                  }} className={styles.connectBtn}>Connect</button>
                }

                <div>
                  <p>{userProfile.bio}</p>
                </div>



              </div>
              <div style={{flex: '0.2'}}>
                <h3>Recent activity</h3>
                {userPosts.map((post)=>{
                  return(
                    <div key={post._id} className={styles.postCard}>
                      <div className={styles.card}>
                        <div className={styles.card_profileContainer}>
                          {post.media !== "" ? <img src={`${BASE_URL}/uploads/${post.media}`}  alt='' /> : <div style={{width: '3.4rem', height:'3.4rem'}}></div>}
                        </div>
                        <p>{post.body}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
    
  )
}

export async function getServerSideProps(context) {
    console.log(context.query.username);

    const request = await clientServer.get('/user/get_profile', {
        params: {
            username: context.query.username
        }
    });

    return {
        props: {
            userProfile: request.data.Profile
        }
    };
}


export default viewProfile