// This function will create a new feedback document
const Feedback = require('../../../models/feedbackModel.js')

module.exports = function (feedbackReq, userInfo) {
  return new Promise (function(resolve, reject) {
    console.log('creating new feedback doc')

    var newFeedbackDoc = new Feedback({
      username: userInfo.username,
      fullName: userInfo.fullName,
  		feedback: {
        message: feedbackReq.body.feedback.message,
        location: feedbackReq.body.feedback.location
      }
    });

    if (newFeedbackDoc) {
      console.log(newFeedbackDoc)
      resolve(newFeedbackDoc)
    } else {
      reject('createThisFeedback.js): Feedback content is empty and not created')
    }
  })
};
