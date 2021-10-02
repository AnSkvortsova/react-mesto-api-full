import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function ProtectedRoute({ isLoggedIn, ...restProps}) {
  if(!isLoggedIn){
    return <Redirect to="/signin" />
  }
  return <Route {...restProps}></Route> 
  
};