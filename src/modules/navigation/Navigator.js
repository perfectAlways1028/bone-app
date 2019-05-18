import React from 'react';

import AuthNavigator from './AuthNavigator';

export default function NavigatorView() {
  // if (authState.isLoggedIn || authState.hasSkippedLogin) {
  //     return <AppNavigator />;
  // }
  // return <AuthScreen />;

  return <AuthNavigator />;
}
