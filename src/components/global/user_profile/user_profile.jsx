import React, {useState} from "react";
import '@/components/global/user_profile/user_profile.css'
import UserDashboard from "@/components/global/user_profile/user_dashbord/user_dashboard.jsx"
export default function UserProfile(){
    const [userDashIsActive, setUserDashIsActive] = useState(false);
    return(
        <>
    <img src="images/user(3).png" alt="" className="user_icon" onClick={()=>{
            setUserDashIsActive(true)
        }}/> 

        {userDashIsActive && <UserDashboard setUserDashIsActive={setUserDashIsActive}/>}
        </>
    )
}