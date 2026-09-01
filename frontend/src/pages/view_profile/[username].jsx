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
            <div className={styles.profileContainer_flex}>
              <div style={{flex: '0.8'}}>
                <div style={{display: 'flex', width: 'fit-content', alignItems: 'center', gap: '1.2rem'}}>
                  <p style={{ color: 'grey'}}>@{userProfile.userId.username}</p>
                </div>
                <div className={styles.buttons}>

                {
                  isCurrentUserInConnection ? <button className={styles.connectionButton} >{isConnectionNull ? "Pending" : "Connected"}</button> : <button onClick={async()=>{
                    await dispatch(sendConnectionRequest({ token: localStorage.getItem("token"), connectionId: userProfile.userId?._id}));
                    await dispatch(getConnectionRequest({
                      token: localStorage.getItem("token")
                  }));
                  }} className={styles.connectBtn}>Connect</button>
                }
                <div
                onClick={async()=>{
                  const response = await clientServer.get(`/user/download_resume?id=${userProfile.userId._id}`);
                  window.open(`${BASE_URL}/${response.data.path}`, "_blank")
                }} className={styles.dowBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
</svg>

                </div>
                </div>

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

          <div className="workHistory">
            <h4>Work History</h4>
            <div className={styles.workHistory_container}>
              {
                userProfile.pastWork.map((work, index)=>{
                  return(
                    <div key={index} className={styles.workHistoryCard}>
                        <p style={{fontWeight: "bold", display: "flex"}}>{work.company} {work.position}</p>
                        <p>{work.years} years</p>
                    </div>
                  )
                })
              }
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