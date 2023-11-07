import axios from 'axios';
import React, { useEffect, useState } from 'react';

import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const PrivatePage = () => {
  const [content, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
      setData(data);
      console.log(data);
    };

    fetchData();
  }, []);
  return (<div>hello there</div>);
};
export default PrivatePage;
