import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function Dashboard() {

    const router = useRouter();

    useEffect(() => {
        if(localStorage.getItem('token') === null){
            router.push('/login')
        }
    })

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard