import React, { createContext, useState, useEffect } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profileData, setProfileData] = useState(null);
    const [unreadCount, setUnreadCount] = useState(null);

    useEffect(() => {
        const storedProfile = localStorage.getItem('_p');
        if (storedProfile) {
            setProfileData(JSON.parse(storedProfile));
        }

        const storedUnread = localStorage.getItem('_ur');
        if (storedUnread) {
            setUnreadCount(JSON.parse(storedUnread));
        }
    }, []);

    const saveProfile = (data) => {
        setProfileData(data);
        localStorage.setItem('_p', JSON.stringify(data));
    };

    const removeProfile = () => {
        setProfileData(null);
        localStorage.removeItem('_p');
    };

    const getProfile = () => {
        return profileData;
    };

    const saveUnread = (data) => {
        setUnreadCount(data);
        localStorage.setItem('_ur', JSON.stringify(data));
    };

    const removeUnread = () => {
        setUnreadCount(null);
        localStorage.removeItem('_ur');
    };

    const getUnread = () => {
        return unreadCount;
    };

    return (
        <ProfileContext.Provider
            value={{
                profileData,
                saveProfile,
                removeProfile,
                getProfile,
                saveUnread,
                removeUnread,
                getUnread,
                unreadCount
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
};
