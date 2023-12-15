import axios from 'axios';
import React, { useEffect } from 'react';
import {
  Row, Container,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Header from './Header.jsx'
import Channels from './Channels.jsx'
import Messages from './Messages.jsx';
import { setChannels } from '../store/channelsSlice.jsx';
import { setMessages } from '../store/messagesSlice.jsx';

import routes from '../routes.js';


const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
    return { Authorization: `Bearer ${user.token}`};
};

const PrivatePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() } );
      dispatch(setChannels(data.channels));
      dispatch(setMessages(data.messages));
    };
    fetchData();
  }, [dispatch]);

return (
     <div className="h-100">
       <div className="d-flex flex-column h-100">
         <Header />
         <Container className="h-100 my-4 overflow-hidden rounded shadow">
           <Row className="h-100 bg-white flex-md-row">
           <Channels></Channels>
           <Messages></Messages>
           </Row>
         </Container>
       </div>
     </div>
   );
 };
export default PrivatePage;
