/************************** SERVER CALLS PRESENT*****************************/
import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

import SmartHome from './SmartComponents/SmartHome.js'
import SmartMain from './SmartComponents/SmartMain.js'

class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      appLocation: 'home',
      userTokenObj: {
        username: localStorage.username,
        fullName: localStorage.fullName,
        token: localStorage.token
      },
      isLoggedIn: false,
      userSettings: {
        quickMeeting: {
          title: 'Quick Meeting',
          participants: [{
            fullName: '',
            email: '',
            guest: true
          }],
          location: 'HQ',
          timeElapsed: {
            expectedDuration: 900000,
            formattedExpectedDuration: '15 mins'
          }
        }
      }
    }
    /******************* REMOVE SEED DATA ABOVE AFTER TESTING *****************/

    this.submitUserTokenObj     = this.submitUserTokenObj.bind(this)
    this.changeAppLocation      = this.changeAppLocation.bind(this)
    this.authenticateMe         = this.authenticateMe.bind(this)
    this.signOut                = this.signOut.bind(this)
    this.initializeUserSettings = this.initializeUserSettings.bind(this)
	}

  componentWillMount () {
    if (localStorage.access_token && this.state.isLoggedIn === false) {
      console.log('authenticating...')
      this.authenticateMe(localStorage.access_token)
    } else if (!localStorage.access_token) {
      localStorage.removeItem('username')
      localStorage.removeItem('fullName')
    }
  }

  authenticateMe (tokenVal) {
    axios.post('http://localhost:8080/authenticateMe', {
      token: tokenVal
    })
    .then((successObj) => {
      if (!successObj.data.success) {
        console.log(successObj.data.errorText)
        this.setState({isLoggedIn: false})
      } else {
        localStorage.username = successObj.data.username
        localStorage.fullName = successObj.data.fullName
        this.initializeUserSettings()
        this.setState({isLoggedIn: true})
      }
    })
    .catch((error) => {
      console.log(error)
    })

    return this.state.isLoggedIn
  }

  initializeUserSettings () {
      const self = this
      axios.post('http://localhost:8080/secure/userDocument/getSettings')
      .then((resultObj) => {
        if (resultObj.data.settings) {
          console.log(resultObj.data.settings)
          this.setState({userSettings: resultObj.data.settings})
        } else {
          console.log('no user settings were found')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }



  submitUserTokenObj (userTokenObjVal) {
    localStorage.access_token  = 'bearer ' + userTokenObjVal.token
    localStorage.username        = userTokenObjVal.username
    localStorage.fullName        = userTokenObjVal.fullName


    axios.defaults.headers.common['access_token'] = localStorage.access_token
    this.setState({appLocation: 'app'})
  }

  changeAppLocation (direction) {
    this.setState({appLocation: direction})
  }

  signOut () {
    console.log('Signing out...')
    localStorage.removeItem('access_token')
    localStorage.removeItem('username')
    localStorage.removeItem('fullName')
    this.setState({appLocation: 'home', isLoggedIn: false})
  }



  render() {
    //---------------------------CONDITIONS-------------------------------------
    //----------------------------RETURN----------------------------------------
    switch(this.state.appLocation) {
      case 'home':
      return (
        <SmartHome
          submitUserTokenObj   = {this.submitUserTokenObj}
          changeAppLocation    = {this.changeAppLocation}
          isLoggedIn           = {this.state.isLoggedIn}
        />
      )

      case 'app':
      return (
        <div>
          <SmartMain
            userTokenObj       = {this.state.userTokenObj}
            submitUserTokenObj = {this.submitUserTokenObj}
            changeAppLocation  = {this.changeAppLocation}
            signOut            = {this.signOut}
            userSettings       = {this.state.userSettings}
          />
        </div>
      )
    }
  }
}

export default withRouter(App)

/*


*/
