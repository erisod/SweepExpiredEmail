// Scan emails tagged with 'expires' that are older than N days (configurable), 
// and archive them.

var sweepOlderThanNDays = 3;
var expiresLabelString="expires";
var debug = false;

function SweepExpiredEmail(e) {
  
  // Use a label to indicate when an autoresponse has been sent.  Create it if it doesn't exist.
  expiresLabel = GmailApp.getUserLabelByName(expiresLabelString);
  if (!expiresLabel) {
    expiresLabel = GmailApp.createLabel(expiresLabelString);
  }

  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - sweepOlderThanNDays);
  var dateString = yesterday.getFullYear() + '/' + (yesterday.getMonth()+1) + '/' +yesterday.getDate();
 
  // Consider emails only from the last N days.  Using a search filter for this.
  var query = "to:me in:inbox before:" + dateString + " AND !is:starred AND label:" + expiresLabelString
  doLog(debug, "Using Query : " + query)
  var threads = GmailApp.search(query);
  
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
