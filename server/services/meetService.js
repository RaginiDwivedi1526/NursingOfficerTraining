const { google } = require('googleapis');

// Note: For simplicity in this example, we assume the admin's refresh token 
// is stored in the environment variables after an initial manual authorization,
// or we use a Service Account if domain-wide delegation is set up.
// Here, we provide a standard OAuth2 client setup.

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/api/live-classes/oauth2callback'
);

// If using a fixed admin refresh token:
if (process.env.GOOGLE_REFRESH_TOKEN) {
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });
}

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

/**
 * Generates an authorization URL for the admin to log in and grant Calendar access.
 */
const getAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.events'],
    prompt: 'consent' // Force to get refresh token
  });
};

/**
 * Handles the OAuth2 callback to get tokens from the auth code.
 */
const getTokensFromCode = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
};

/**
 * Helper function to create a Google Meet (Calendar Event)
 */
const createMeetEvent = async (summary, description, startTime, durationMins) => {
  try {
    const start = new Date(startTime);
    const end = new Date(start.getTime() + durationMins * 60000);

    const event = {
      summary: summary,
      description: description,
      start: {
        dateTime: start.toISOString(),
        timeZone: 'UTC', // Change to your preferred timezone
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: 'UTC',
      },
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      }
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1, // Important to create the Meet link
    });

    return {
      eventId: response.data.id,
      meetLink: response.data.hangoutLink,
      htmlLink: response.data.htmlLink // Calendar event link
    };
  } catch (error) {
    console.error('Error creating Google Meet event:', error.message);
    throw new Error('Failed to create Google Meet event');
  }
};

/**
 * Helper function to delete a Google Meet event
 */
const deleteMeetEvent = async (eventId) => {
    try {
        await calendar.events.delete({
            calendarId: 'primary',
            eventId: eventId,
        });
        return true;
    } catch (error) {
        console.error('Error deleting Google Meet event:', error.message);
        throw new Error('Failed to delete Google Meet event');
    }
}

module.exports = {
  getAuthUrl,
  getTokensFromCode,
  createMeetEvent,
  deleteMeetEvent
};
