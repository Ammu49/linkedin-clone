import React from 'react'
import DashboardLayout from "@/layout/DashboardLayout/index";
import UserLayout from '@/layout/UserLayout';

function My_connections() {
  return (
    <UserLayout>
        <DashboardLayout>
            <div>
                <h2>Connections</h2>
            </div>
        </DashboardLayout>
    </UserLayout>

  )
}

export default My_connections