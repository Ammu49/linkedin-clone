import React, { useEffect } from 'react'
import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '@/config/redux/action/authAction';

function Discoverpage() {

    const authState = useSelector((state) => state.auth);

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
            </div>
        </DashboardLayout>
    </UserLayout>
  )
}

export default Discoverpage