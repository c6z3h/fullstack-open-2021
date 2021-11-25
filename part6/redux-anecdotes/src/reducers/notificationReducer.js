let timer

const reducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
      case 'SET_NOTE':
        return state = action.data.notification
      case 'ADD_NOTE':
        return state = action.data.notification
      // case 'REM_NOTE':
      //   return state = action.data.notification
      default: return state
    }
  }
  
  export const setNotification = (notification, timeout) => {
    return async dispatch => {
      dispatch ({
        type: 'SET_NOTE', // cannot use 'VOTE_NOTE' same as anecdoteReducer
        data: { notification }
      })
      // clearTimeout(timer)
      timer = setTimeout(() => dispatch({
        type: 'SET_NOTE',
        data: { notification: '' }
      }), timeout * 5000)     
    }
  }
  
  export const addNotification = (notification, timeout) => {
    return async dispatch => {
      dispatch ({
        type: 'ADD_NOTE', // cannot use 'VOTE_NOTE' same as anecdoteReducer
        data: { notification }
      })
      // clearTimeout(timer)
      timer = setTimeout(() => dispatch({
        type: 'ADD_NOTE',
        data: { notification: '' }
      }), timeout * 5000)     
    }
      
    }

  // export const removeNotification = (notification) => {
  //   return {
  //     type: 'REM_NOTE', // cannot use 'VOTE_NOTE' same as anecdoteReducer
  //     data: { notification }
  //   }
  // }

export default reducer