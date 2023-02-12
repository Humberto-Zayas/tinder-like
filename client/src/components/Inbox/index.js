import { React, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import "../../css/chat.css";
import auth from "../../utils/auth";
import { useSubscription, useQuery, useLazyQuery } from '@apollo/client';
import { useMutation } from "@apollo/client";
import { QUERY_MESSAGES, QUERY_ME, QUERY_USERS } from '../../utils/queries';
import { GET_MESSAGES } from '../../utils/subscriptions';
import { POST_MESSAGE } from '../../utils/mutations';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import MatchList from '../MatchList';
import Chat from '../Chat';

const Inbox = () => {
  const loggedIn = auth.loggedIn(); // assign the auth login to one word variable makes it easier to type
  const [partner, setPartner] = useState(null);
  const [me, setMe] = useState(null); // value to control logged in user state
  const [users, setUsers] = useState(null); // value to control logged in user state
  // const { data, loading } = useSubscription(GET_MESSAGES);
  const { loading: loadingMe, data: myData } = useQuery(QUERY_ME);
  const { loading: loadingUsers, data: usersData } = useQuery(QUERY_USERS);

  const matchedUserIds = me?.me.friends.map(friend => friend._id).concat(me?.me._id);
  console.log('matched ids: ', matchedUserIds);

  const handleClick = (username) => {
    setPartner(username)
  }

  useEffect(() => {
    setMe(myData);
    setUsers(usersData);
  }, [myData, usersData]) 

  if (!loggedIn) { 
    return <div>You must login</div>
  }
  if (loadingMe) {

    return <div>Loading...</div>;
  }

  return (
    <div style={{ marginBottom: '5rem' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {/* <ul>
            {users?.users.map(user => 
                <li onClick={() => setPartner(user.username)} key={user._id}>{user.username}</li>
            )}
            </ul> */}

            {/* pass in function to get get username back here to setPartner */}

            <MatchList userNameClick={handleClick} matches={matchedUserIds} myID={me?.me._id}></MatchList> 
          </Grid>
          <Grid item xs={8}>
          {partner &&
            <Chat myData={me} currentChatPartner={partner}/>
          }
          </Grid>
        </Grid>
      </Box>
      <hr></hr>
    </div>
  )
}
export default Inbox;