// PrivateRoute.js
import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/common/Login';

const Authorization = (roles,token) => async (element) => {
  if(token){
    try{
      const reponse = await fetch('http://localhost:3000/api/auth/role', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
    const data = await reponse.json();
    return data.role;
  }catch(e){
    console.log(e);
  }
  if (roles.includes(element)) {
    return true;
  }
  return false;
}
else{
  return false;
 }
}


function PrivateRoute({ element, roles }) {
  const token = localStorage.getItem('token');
  if (token) {
    const role = Authorization(roles,token);
    if (role) {
      return element;
    }
    return <Route element={element} />;;
  }
  return <Route element={<Login />} />;
  
  
  
}

export default PrivateRoute;
