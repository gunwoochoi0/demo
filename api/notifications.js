const twilio = require('twilio');
const twilioClient = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');
const db = require('./database');
const puzzling = require('./puzzling');

export const sendSMSConfirmation = async (toPhoneNumber, message) => {
    try {
        const messageResponse = await twilioClient.messages.create({
            body: puzzling.puzzleLogic(message),
            from: 'Your_Twilio_Phone_Number',
            to: toPhoneNumber
        });
        console.log('SMS sent:', messageResponse.sid);

        // Record SMS in database
        await db.recordSMSSent(toPhoneNumber, message, messageResponse.sid);

        // Save notification data
        await db.saveNotificationData({
            type: 'SMS',
            recipient: toPhoneNumber,
            message: message
        });
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw error;
    }
};

export const sendOTP = async (toPhoneNumber, otp) => {
    await twilioClient.messages.create({
        body: `Your OTP is: ${otp}`,
        from: 'Your_Twilio_Phone_Number',
        to: toPhoneNumber
    });
};

export const makeCall = async (toPhoneNumber, url) => {
    await twilioClient.calls.create({
        to: toPhoneNumber,
        from: 'Your_Twilio_Phone_Number',
        url: url // URL to a TwiML document
    });
};

export const startConferenceCall = async (participants) => {
    participants.forEach(async (participant) => {
        await twilioClient.calls.create({
            to: participant,
            from: 'Your_Twilio_Phone_Number',
            url: 'URL_to_TwiML_for_Conference' // TwiML script for joining conference
        });
    });
};

export const sendMMS = async (toPhoneNumber, imageUrl) => {
    await twilioClient.messages.create({
        to: toPhoneNumber,
        from: 'Your_Twilio_Phone_Number',
        body: 'Check out this image!',
        mediaUrl: imageUrl
    });
};