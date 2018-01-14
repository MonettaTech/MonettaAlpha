import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import SmartPrepareMeeting from './SmartTeamMeeting/SmartPrepareMeeting.js'
import SmartConductMeeting from './SmartTeamMeeting/SmartConductMeeting.js'
import SmartReviewMinutes from './SmartTeamMeeting/SmartReviewMeeting.js'

export default class SmartTeamMeeting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meetingIndex: 1,
      meetingData: {
        title: '',
        date: '',
        members: [],
        notes: {
          general: [
            {
              text: 'temporary text 1',
              type: 'general',
              color: 'gray',
              timeStamp: '270000',
              formattedTimeStamp: '4:30'
            },
            {
              text: 'temporary text 3',
              type: 'general',
              color: 'gray',
              timeStamp: '500000',
              formattedTimeStamp: '8:20'
            },
            {
              text: 'temporary text 7',
              type: 'general',
              color: 'gray',
              timeStamp: '1740000',
              formattedTimeStamp: '29:00'
            }
          ],
            action: [
            {
              text: 'temporary text 2',
              type: 'action',
              color: 'rgb(70,153,255)',
              timeStamp: '390000',
              formattedTimeStamp: '6:30'
            },
            {
              text: 'temporary text 4',
              type: 'action',
              color: 'rgb(70,153,255)',
              timeStamp: '660000',
              formattedTimeStamp: '11:00'
            },
            {
              text: 'temporary text 8',
              type: 'action',
              color: 'rgb(70,153,255)',
              timeStamp: '2100000',
              formattedTimeStamp: '35:00'
            }
          ],
            decision: [
            {
              text: 'temporary text 5',
              type: 'decision',
              color: 'rgb(70,153,255)',
              timeStamp: '1160000',
              formattedTimeStamp: '19:20'
            },
            {
              text: 'temporary text 6',
              color: 'rgb(70,153,255)',
              type: 'decision',
              timeStamp: '1620000',
              formattedTimeStamp: '27:00'
            }
          ]
        },
        timeElapsed: {
          duration: 0,
          formattedDuration: '00:00'
        },
        host: '',
        goals: ['this is the goal 1', 'this is the second goal in the list'],
        expectedDuration: 0,
        actualDuration: 0
      }
    }

    this.handleIndexChange        = this.handleIndexChange.bind(this)
    this.handleFinishedMeeting    = this.handleFinishedMeeting.bind(this)
    this.getMeetingData           = this.getMeetingData.bind(this)
    this.submitMeetingData        = this.submitMeetingData.bind(this)
  }

  getMeetingData () {
    console.log('---')
    console.log('ORIGINAL (get): ')
    console.log(this.state.meetingData)
    return this.state.meetingData
  }

  submitMeetingData (meetingData) {
    console.log('ORIGINAL (submit): ')
    console.log(meetingData)
    console.log('---')
    this.setState(meetingData)
  }

  handleIndexChange(direction) {
    switch (direction) {
      case 'forward':
        this.setState({meetingIndex: this.state.meetingIndex + 1})
        break

      case 'backward':
        this.setState({meetingIndex: this.state.meetingIndex - 1})
        break

      case 'finished':
        this.handleFinishedMeeting()
        break
    }
  }

  handleFinishedMeeting () {
    console.log('Submitting: ' + this.state.meetingData)

    // compute the expected vs actual time of the meeting
    // input the host's name into this.state.meetingData.host
  }

  render () {
    //---------------------------VARIABLE CREATION------------------------------
    //---------------------------CONDITIONS-------------------------------------

    switch (this.state.meetingIndex) {
      case 0:
        var MeetingHeader     = 'Prepare the Meeting'
        var MeetingComponent  = (
          <SmartPrepareMeeting
            handleIndexChange       = {this.handleIndexChange}
            meetingData             = {this.state.meetingData}
            getMeetingData          = {this.getMeetingData}
            submitMeetingData       = {this.submitMeetingData}
            />
        )
        break

      case 1:
        var MeetingHeader     = 'Conduct the Meeting'
        var MeetingComponent  = (
          <SmartConductMeeting
            handleIndexChange       = {this.handleIndexChange}
            meetingData             = {this.state.meetingData}
            getMeetingData          = {this.getMeetingData}
            submitMeetingData       = {this.submitMeetingData}
            />
        )
        break

      case 2:
        var MeetingHeader     = 'Review the Minutes'
        var MeetingComponent  = (
          <SmartReviewMinutes
            handleIndexChange       = {this.handleIndexChange}
            meetingData             = {this.state.meetingData}
            getMeetingData          = {this.getMeetingData}
            submitMeetingData       = {this.submitMeetingData}
            />
        )
        break
    }
    //----------------------------RETURN----------------------------------------
    return (
      <div>
        <div>
          <Paper className='MeetingHeader'> <h1> {MeetingHeader} </h1> </Paper>
        </div>
        {MeetingComponent}
      </div>
    )
  }
}

/* default for testing

notes: {
  general: [
    {
      text: 'temporary text 1',
      type: 'general',
      color: 'gray',
      timeStamp: '270000',
      formattedTimeStamp: '4:30'
    },
    {
      text: 'temporary text 3',
      type: 'general',
      color: 'gray',
      timeStamp: '500000',
      formattedTimeStamp: '8:20'
    },
    {
      text: 'temporary text 7',
      type: 'general',
      color: 'gray',
      timeStamp: '1740000',
      formattedTimeStamp: '29:00'
    }
  ],
    action: [
    {
      text: 'temporary text 2',
      type: 'action',
      color: 'rgb(70,153,255)',
      timeStamp: '390000',
      formattedTimeStamp: '6:30'
    },
    {
      text: 'temporary text 4',
      type: 'action',
      color: 'rgb(70,153,255)',
      timeStamp: '660000',
      formattedTimeStamp: '11:00'
    },
    {
      text: 'temporary text 8',
      type: 'action',
      color: 'rgb(70,153,255)',
      timeStamp: '2100000',
      formattedTimeStamp: '35:00'
    }
  ],
    decision: [
    {
      text: 'temporary text 5',
      type: 'decision',
      color: 'rgb(70,153,255)',
      timeStamp: '1160000',
      formattedTimeStamp: '19:20'
    },
    {
      text: 'temporary text 6',
      color: 'rgb(70,153,255)',
      type: 'decision',
      timeStamp: '1620000',
      formattedTimeStamp: '27:00'
    }
  ]
},
*/
