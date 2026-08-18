import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { createPost, deletepost, getAllPosts } from '@/config/redux/action/postAction';
import { getAboutUser, getAllUsers } from '@/config/redux/action/authAction';
import UserLayout from '@/layout/UserLayout';
import DashboardLayout from "@/layout/DashboardLayout/index";
import styles from './style.module.css'
import { BASE_URL } from '@/config/index.jsx'

function Dashboard() {

    const router = useRouter();

    const dispatch = useDispatch();

    const authState = useSelector((state) => state.auth)

    const postState = useSelector((state) => state.post)


    useEffect(() => {
      if(authState.isTokenThere) {
        dispatch(getAboutUser({ token: localStorage.getItem("token") }));
        dispatch(getAllPosts())
      }
      if(!authState.all_profiles_fetched) {
            dispatch(getAllUsers());
        }
    }, [authState.isTokenThere] )



    const [postContent, setPostContent] = useState("");

    const [fileContent, setFileContent] = useState();

    const handleupload = async () => {
      await dispatch(createPost({file: fileContent, body: postContent }));

      setPostContent("");
      setFileContent("");
    }


    useState(()=> {
      setInterval(()=> {
        dispatch(getAllPosts())
      }, 900)
    })

    if(authState.user){

  return (
    <UserLayout>
      
      <DashboardLayout>
          
        <div className={ styles.scrollComponent }>

          <div className={styles.wrapper}>
            <div className= {styles.createPostContainer}>
                {authState.user?.userId?.profilePicture && (
                  <img className={styles.userProfile}
                  width={100}
                      src={`${BASE_URL}/uploads/${authState.user.userId.profilePicture}`}
                      alt=""
                  />
              )}
              <textarea placeholder='What is on your mind?' name='' id='' className={styles.postTextarea}
              onChange={(e)=> {
                setPostContent(e.target.value)
              }} value={postContent}></textarea>
              <label htmlFor='file-upload'>
              <div className={styles.fab}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
              </div>
              </label>
              <input type="file" hidden id='file-upload' onChange={(e)=> {
                setFileContent(e.target.files[0])
              }}/>
              {postContent.length > 0 && <div onClick={handleupload} className={styles.uploadButton}>Post</div>}
              </div>



              <div className={styles.postContainer}>
              {postState.posts.map((post) => {
                return (
                  <div key={post._id} className={styles.singleCard}>

                    <div className={styles.singleCard_profileContainer}>
                      <img  src={`${BASE_URL}/uploads/${authState.user.userId.profilePicture}`} />
                      <div>
                        <div style={{display: 'flex', gap: '1.2rem', justifyContent: 'space-between'}}>
                        <p style={{fontWeight: 'bold'}}>{post.userId.name}</p>
                        {
                          post.userId._id === authState.user.userId._id &&
                          <div
                          onClick={async () => {
                              await dispatch(deletepost(post._id))
                              await dispatch(getAllPosts());
                            }}
                           style={{cursor: 'pointer'}}>
                            <svg style={{height: '1.4em', color: 'red'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </div>
                        }

                        </div>
                        <p style={{color: 'grey'}}>@{post.userId.username}</p>
                        <p>{post.body}</p>
                        <div className={styles.silgleCard_image}>
                          <img src={`${BASE_URL}/uploads/${post.media}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      
      </DashboardLayout>



    </UserLayout>
  )
}  else {
  return (
    <UserLayout>
      <DashboardLayout>
        <div className={ styles.scrollComponent }>
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    </UserLayout>
  )
}
}
export default Dashboard