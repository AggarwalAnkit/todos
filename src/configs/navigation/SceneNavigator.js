/**
  This file provides navigator related configs.
*/
import React from 'react';
import { Navigator } from 'react-native';
import Home from '../../containers/Home';

//if you want to navigate a scene like a modal then pass 'type' as ROUTE_TYPE_MODAL to route
export const ROUTE_TYPE_MODAL = 'navigation/SceneNavigator/modal';
export const ROUTE_TYPE_NORMAL = 'navigation/SceneNavigator/normal';

//provide this scene configuration to Navigator
export const configureScene = (route) => {
  if (route.type === ROUTE_TYPE_MODAL) {
    return Navigator.SceneConfigs.FloatFromBottom;
  }
  return Navigator.SceneConfigs.PushFromRight;
};

//will be called to render a component (scene) when route is given to navigator
//it passes navigator to newly rendring component
//pass the component to be rendered in 'component' property.
//pass props as 'passProps' object to pass the props to the rendring component
export const renderScene = (route, navigator) => (
  <route.component navigator={navigator} {...route.passProps} />
);

//open home screen as inital route
export const initialRoute = {
  component: Home,
  passProps: {
    screenTitle: 'My Todos'
  },
  type: ROUTE_TYPE_NORMAL
};
