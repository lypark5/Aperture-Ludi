import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './ProfileHeader.css'
import { fetchUser } from '../../store/users';

export default function ProfileHeader({userId}){
    const dispatch = useDispatch()
    const user = useSelector(state => state.users.singleUser)
   
    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [])

    if (!user) return null

    const urlToString = url => {
        return `url(${url})`
    }
   
    const backgroundImageStyle = (url) => {
        return {
            backgroundImage: urlToString(url),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }
    }
  
    return (
        <div className='user-profile-container' style={backgroundImageStyle(user.userBackgroundPic)}>
            <div style={{width: '80%'}}>
                <span className='profile-content'>
                    <div className='profile-img'>
                        <img src={user.profilePic} alt={user.profilePic} style={{height: "100px", width: "100px", borderRadius: "50px", objectFit: 'cover'}}/>
                    </div>
                    <div className='name-and-bio'>
                        <div className='names'>{user.firstName} {user.lastName}</div>
                        <div className='bio'>{user.bio}</div>
                    </div>
                </span>
            </div>
        </div>
    )
}
