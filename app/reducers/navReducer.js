
import { NavigationActions } from 'react-navigation'
import {
  StatusBar
} from 'react-native'
import { MasterNavigator } from '../routes/Router'


// Start with two routes: The Main screen, with the Login screen on top.
// const firstAction = MasterNavigator.router.getActionForPathAndParams('Login')
// const tempNavState = MasterNavigator.router.getStateForAction(firstAction)
// const secondAction = MasterNavigator.router.getActionForPathAndParams('Tabs');
// const initialNavState = MasterNavigator.router.getStateForAction(
//   secondAction,
//   tempNavState
// );

export var navReducer = (state, action) =>  {
  let nextState;
  switch (action.type) {
    case 'Navigation/NAVIGATE':
      switch (action.routeName) {
        case 'Home':
          StatusBar.setBarStyle('default', true)
          break;
        case 'Profile':
          StatusBar.setBarStyle('light-content', true)
          break;
        default:
          break;
      }
      nextState = MasterNavigator.router.getStateForAction(action, state);
      break
    case 'Login':
      nextState = MasterNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Home' }),
        state
      );
      break;
    default:
      nextState = MasterNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}