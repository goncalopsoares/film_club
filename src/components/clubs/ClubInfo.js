import {FaLock, FaLockOpen} from "react-icons/fa";
import ClubLogo from "./ClubLogo";
import React from "react";

const ClubInfo = ({club, members}) => {
    return (
        <div style={{
            backgroundColor: '#fff',
            padding: '1rem',
            width: '100%'
        }}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    {club.clubVisibility === 'Private' ?
                        <><FaLock size={12} style={{marginRight: '0.4rem'}}/><span
                            style={{fontSize: '0.9rem'}}> {club.clubVisibility}</span></>
                        : club.clubVisibility === 'Open' &&
                        <><FaLockOpen size={12} style={{marginRight: '0.4rem'}}/><span
                            style={{fontSize: '0.9rem'}}> {club.clubVisibility}</span></>}
                    <span style={{fontSize: '0.9rem'}}><b
                        style={{marginLeft: '4rem'}}>Pace</b> {club.clubPace}</span>
                    <span style={{fontSize: '0.9rem'}}><b
                        style={{marginLeft: '4rem'}}>Code </b> {club.clubCode}</span>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h2>{club.clubName}</h2>
                <ClubLogo clubLogo={club.clubLogo} style={{width: '3rem'}}/>
            </div>
            <p style={{color: '#2D2D2A'}}>{club.clubDescription}</p>
            <div>
                {members.length > 0 && members.map((member, index) => {
                    try {
                        return (
                            <div
                                style={{
                                    display: 'inline-block',
                                    margin: '1.5rem 0.3rem 0 0.3rem',
                                    textAlign: 'center',
                                }}
                               >
                                {index === 0 ? <p style={{margin: '0 0 0.5rem 0', textAlign: 'center'}}>Admin</p> : null}
                                <img
                                    className={'profile-pic'}
                                    src={member.userData.avatar}
                                    alt={member.userData.name}
                                    style={{
                                        margin: '0 0.3rem 1rem 0.3rem',
                                    }}
                                />
                            </div>
                        );
                    } catch (error) {
                        console.log(error);
                    }
                })}
                <div>
                    {members.length > 0 && members.map((member, index) => {
                        try {
                            return (
                                index === 0 && <p style={{marginTop: '0.4rem'}}>Club founded
                                    by <b>{member.userData.name}</b> in <b>{club.clubCreationDate.toDate().toLocaleDateString('en-GB')}</b>
                                </p>
                            );
                        } catch (error) {
                            console.log(error);
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default ClubInfo;