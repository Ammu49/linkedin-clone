import React, { useEffect } from 'react'
import DashboardLayout from "@/layout/DashboardLayout/index";
import UserLayout from '@/layout/UserLayout';
import { useDispatch, useSelector } from 'react-redux';
import { AcceptConnection, getMyConnectionRequests } from '@/config/redux/action/authAction';
import styles from './index.module.css';
import { BASE_URL } from '@/config';
import { useRouter } from 'next/router';

function My_connections() {

    const dispatch = useDispatch();

    const router = useRouter();

    const authState = useSelector((state)=>state.auth);

    useEffect(()=>{
        dispatch(getMyConnectionRequests({token: localStorage.getItem("token")}));
    }, []);
    

    useEffect(()=>{

       if(authState.connectionRequests.length != 0){
        console.log(authState.connectionRequests)
        }
    }, [authState.connectionRequests])
  return (
    <UserLayout>
        <DashboardLayout>
            <div style={{display: 'flex', justifyContent: 'center', gap: '1.2rem', flexDirection: 'column'}}>
                <h3>My Connections</h3>
                {authState.connectionRequests.length === 0 && <h2>No Connection Requests</h2>}


                {authState.connectionRequests.length != 0 && authState.connectionRequests.filter((connection)=> connection.status_accepted === null).map((user)=>{
                    return(
                        <div style={{cursor: 'pointer'}}
                        onClick={()=>{
                            router.push(`/view_profile/${user.userId.username}`)
                        }}
                         className={styles.userCard} key={user._id}>
                            <div style={{display: 'flex', alignItems: 'center'}} className={styles.profilePic}>
                                <img src={`${BASE_URL}/uploads/${user.userId.profilePicture}`} alt='' />
                            </div>
                            <div className={styles.userInfo}>
                                <h3>{user.userId.name}</h3>
                                <p>@{user.userId.username}</p>
                            </div>
                            <div 
                            onClick={(e)=>{
                                e.stopPropagation();
                                dispatch(AcceptConnection({
                                token: localStorage.getItem("token"),
                                requestId: user._id,
                                action_type: "accept"
                            }))
                            }}
                            className={styles.connectionButton}>
                                <button>Accept</button>
                            </div>
                            
                        </div>
                    )
                })}


                <h3>My Network</h3>
                {authState.connectionRequests.filter((connection)=>connection.status_accepted === true).map((user)=>{
                    return(
                        <div style={{cursor: 'pointer'}}
                        onClick={()=>{
                            router.push(`/view_profile/${user.userId.username}`)
                        }}
                         className={styles.userCard} key={user._id}>
                            <div style={{display: 'flex', alignItems: 'center'}} className={styles.profilePic}>
                                <img src={`${BASE_URL}/uploads/${user.userId.profilePicture}`} alt='' />
                            </div>
                            <div className={styles.userInfo}>
                                <h3>{user.userId.name}</h3>
                                <p>@{user.userId.username}</p>
                            </div>
                            
                            
                        </div>
                    )
                })}
            </div>
        </DashboardLayout>
    </UserLayout>

  )
}

export default My_connections