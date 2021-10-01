import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function ProtectedRoute({ isLoggedIn, ...restProps}) {
  if(!isLoggedIn){
    return <Redirect to="/sign-in" />
  }
  return <Route {...restProps}></Route> 
  
};