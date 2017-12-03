// Scan emails tagged with 'expires' that are older than N days (configurable), 
// and archive them.

var sweepOlderThanNDays = 3;
var expiredLabelString="Expires";
var debug = false;

function SweepExpiredEmail(e) {
  
  // Use a label to indicate when an autoresponse has been sent.  Create it if it doesn't exist.
  expiredLabel = GmailApp.getUserLabelByName(expiredLabelString);
  if (!expiredLabel) {
    expiredLabel = GmailApp.createLabel(expiredLabelString);
  }

  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - sweepOlderThanNDays);
  var dateString = yesterday.getFullYear() + '/' + (yesterday.getMonth()+1) + '/' +yesterday.getDate();
 
  // Consider emails only from the last N days.  Using a search filter for this.
  var threads = GmailApp.search("to:me after:" + dateString + " AND !is:starred AND !label:" + expiredLabelString);
  
  for (var i = 0; i < threads.length; i++) {
    doLog(debug, "Archiving thread with subject : " + threads[i].getFirstMessageSubject())
    threads[i].moveToArchive();
  }
}

function doLog(doLog, message) {
  if (doLog) {
    Logger.log(message); 
  }
}
