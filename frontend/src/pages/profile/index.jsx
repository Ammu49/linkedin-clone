import { getAboutUser } from '@/config/redux/action/authAction';
import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import { BASE_URL, clientServer } from '@/config';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.css'
import { getAllPosts } from '@/config/redux/action/postAction';
import { useRouter } from 'next/router';

function Profilepage() {

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth)

  const router = useRouter()

  const postReducer = useSelector((state) => state.post);

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [userProfile, setUserProfile] = useState({});


  const [userPosts, setUserPosts] = useState([]);


  const [inputData, setInputData] = useState({ company: "", position: "", years: ''});


  const handleWorkChanges = (e) => {

    const {name, value} = e.target;
    setInputData({...inputData, [name]: value})
  }


  useEffect(()=>{
    dispatch(getAboutUser({token: localStorage.getItem("token")}));
    dispatch(getAllPosts())
  }, [])

    useEffect(()=>{
    setUserProfile(authState.user)
  }, [authState.user])

    useEffect(()=> {
      if(authState.user != undefined){let post = postReducer.posts.filter((post)=> {
        return post.userId.username === authState.user.userId.username;
        
      })
      setUserPosts(post);}
    }, [postReducer.posts, authState.user])

const updateProfilePicture = async (file) => {
  try {
    if (!file) return;

    const formData = new FormData();

    formData.append("profile_picture", file);
    formData.append("token", localStorage.getItem("token"));

    const response = await clientServer.post(
      "/upload_profile_picture",
      formData
    );

    console.log("UPLOAD RESPONSE:", response.data);

    dispatch(
      getAboutUser({
        token: localStorage.getItem("token")
      })
    );

  } catch (error) {
    console.error(
      "UPLOAD ERROR:",
      error.response?.data || error.message
    );
  }
};

const updateProfile = async ()=>{
  const request = await clientServer.post('/user_update', {
    token: localStorage.getItem('token'),
    name: userProfile?.userId?.name
  });

  const response = await clientServer.post('/update_profile_data', {
    token: localStorage.getItem('token'),
    bio: userProfile?.bio,
    currentPost: userProfile?.currentPost,
    pastWork: userProfile?.pastWork,
    education: userProfile?.education
  });

  dispatch(getAboutUser({token: localStorage.getItem('token')}))
}
  
  return (
    <UserLayout>
        <DashboardLayout>
          {authState.user?.userId && userProfile?.userId &&
            <div className={styles.container}>
          <div className={styles.backDropContainer}>
            <div className={styles.profilePictureContainer}>
              <img 
                className={styles.backDrop} 
                src={`${BASE_URL}/uploads/${userProfile?.userId?.profilePicture}`} 
                alt="Profile"
              />

              <label htmlFor='profilePictureUpload' className={styles.profileEditOverlay}>
                <p>Edit</p>
              </label>
              <input onChange={(e)=>{
                updateProfilePicture(e.target.files[0]);
              }} hidden type='file' id='profilePictureUpload' />
            </div>
          </div>
          <div className={styles.profileContainer_details}>
            <div className={styles.profileContainer_flex}>
              <div style={{flex: '0.8'}}>
                <div style={{display: 'flex', width: 'fit-content', alignItems: 'center', flexDirection: 'column'}}>
                  <input className={styles.nameEdit} type='text' value={userProfile?.userId?.name || ""} onChange={(e)=>{
                    setUserProfile({...userProfile, userId: {...userProfile.userId, name: e.target.value}})
                  }} />
                  <p style={{color: 'grey', alignSelf: 'flex-start', paddingBottom: '1rem'}}>@{userProfile?.userId?.username}</p>
                </div>

                
                <div>
                  <textarea
                    value={userProfile.bio || ""}
                    rows={Math.max(3, Math.ceil((userProfile.bio || "").length / 80))}
                    onChange={(e) => {
                      setUserProfile({
                        ...userProfile,
                        bio: e.target.value
                      });
                    }}
                    style={{width: "100%", outline: 'none', borderStyle: 'none', fontSize: '1.2rem', fontFamily: 'poppins'}}
                  />
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
          <div className={styles.workHistory}>


                <h4>Work History</h4> <div className={styles.workHistory_container}> { userProfile.pastWork.map((work, index)=>{ return( <div key={index} className={styles.workHistoryCard}> <p style={{fontWeight: "bold", display: "flex"}}>{work.company} {work.position}</p> <p>{work.years} years</p> </div> ) }) }
              <button
                className={styles.addBtn}
                 onClick={()=>{
                  
                  setIsModalOpen(true)
                 }}
              >Add Work</button>
            </div>
          </div>


          <div className={styles.workHistory}>
            <h4>Education</h4>
            <div className={styles.workHistory_container}>
              {userProfile?.education?.map((edu, index) => (
                <div key={index} className={styles.workHistoryCard}>

                  <input
                    type="text"
                    placeholder="School/University"
                    value={edu.school}
                    onChange={(e) => {
                      const updatedEdu = [...userProfile.education];
                      updatedEdu[index].school = e.target.value;

                      setUserProfile({
                        ...userProfile,
                        education: updatedEdu
                      });
                    }}
                  />

                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => {
                      const updatedEdu = [...userProfile.education];
                      updatedEdu[index].degree = e.target.value;

                      setUserProfile({
                        ...userProfile,
                        pastWork: updatedEdu
                      });
                    }}
                  />

                  <input
                    type="text"
                    placeholder="Field Of Study"
                    value={edu.fieldOfStudy}
                    onChange={(e) => {
                      const updatedEdu = [...userProfile.education];
                      updatedEdu[index].fieldOfStudy = e.target.value;

                      setUserProfile({
                        ...userProfile,
                        pastWork: updatedEdu
                      });
                    }}
                  />

                </div>
              ))}

              <button
                className={styles.addBtn}
                onClick={() => {
                  setUserProfile({
                    ...userProfile,
                    education: [
                      ...(userProfile.education || []),
                      {
                        school: "",
                        degree: "",
                        fieldOfStudy: ""
                      }
                    ]
                  });
                }}
              >Add Education</button>
            </div>
          </div>



          {userProfile != authState.user && <div
          onClick={()=>{
            updateProfile()
          }}
           className={styles.connectionButton}>Update Profile</div>}
        </div>}


        { isModalOpen && 
        <div
         
        
        className={styles.componentsContainer}>
            <div 
             onClick={(e)=> {
              e.stopPropagation()
             }}
            className={styles.allCommentsContainer}>
            <input 
            onChange={handleWorkChanges} name='company'
            type="text" placeholder='Company' className={styles.input_field} />

            <input 
            onChange={handleWorkChanges}
            name='position'
            type="text" placeholder='Position' className={styles.input_field} />

            <input 
            onChange={handleWorkChanges}
            name='years'
            type="number" placeholder='Years' className={styles.input_field} />

            <div
            onClick={()=>{
              setUserProfile({
                    ...userProfile,
                    pastWork: [
                      ...userProfile.pastWork , inputData ]
                  });
                setIsModalOpen(false);
            }}
           className={styles.connectionButton}>Add Work</div>
            </div>

             
        </div>
        
      }

        </DashboardLayout>
    </UserLayout>
    
  )
}

export default Profilepage