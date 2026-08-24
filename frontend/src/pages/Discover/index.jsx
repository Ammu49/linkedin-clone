import React, { useEffect } from 'react'
import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '@/config/redux/action/authAction';
import styles from './index.module.css'
import { BASE_URL } from '@/config/index.jsx'
import { useRouter } from 'next/router';


function Discoverpage() {

    const authState = useSelector((state) => state.auth);

    const router = useRouter();

    const dispatch = useDispatch();


    useEffect(() => {
        if(!authState.all_profiles_fetched) {
            dispatch(getAllUsers());
        }
    }, [])


  return (
    <UserLayout>
        <DashboardLayout>
            <div>
                <h2>Discover</h2>

                <div className={styles.allUserProfiles}>
                    {authState.all_profiles_fetched && authState.all_users.map((user) => {
                        return(
                            <div 
                            onClick={() => {
                                router.push(`/view_profile/${user.userId.username}`);
                            }}
                            key={user._id} className={styles.userCard}>
                                <img src={`${BASE_URL}/uploads/${user.userId.profilePicture}`} alt='' />
                                <div>
                                    <h1>{user.userId.name}</h1>
                                    <p>{user.userId.email}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </DashboardLayout>
    </UserLayout>
  )
}

export default Discoverpage