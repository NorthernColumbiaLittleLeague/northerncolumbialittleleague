NCLL.Calendar = (function() {
  // Array of API discovery doc URLs for APIs used by the quickstart
  const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
  
  
  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }
  
  
  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  function initClient() {
    gapi.client.init({
      apiKey: ConfigKeys.API_KEY,
      clientId: ConfigKeys.CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {
      listUpcomingEvents();
    });
  }
  
  /**
   * Append a pre element to the body containing the given message
   * as its text node. Used to display the results of the API call.
   *
   * @param {string} message Text to be placed in pre element.
   */
  function appendPre(message) {
    var $pre = $('#little-league-schedule');
    $pre.append(message);
  }

  /**
   * Print the summary and start datetime/date of the next ten events in
   * the authorized user's calendar. If no events are found an
   * appropriate message is printed.
   */
  function listUpcomingEvents() {
    gapi.client.calendar.events.list({
      'calendarId': ConfigKeys.CALENDAR_ID,
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(function(response) {
      var events = response.result.items;
      
      if (events.length > 0) {
        appendPre('<ul>');
        for (i = 0; i < events.length; i++) {
          var event = events[i];
          var when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }
          appendPre('<li><strong>'+ event.summary + '</strong><br/> (' + when + ') </li>')
        }
        appendPre('</ul>');
      } else {
        appendPre('No upcoming events found.');
      }
    });
  }
  
  return {
    init: handleClientLoad
  }
})();

$(document).ready(function() {
  NCLL.Calendar.init();
})