const emailParams = (name, email, token) => {
    return {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: [email],
        },
        ReplyToAddresses: [process.env.EMAIL_TO],
        Message: {
            Body: {
                Html:{
                    Charset: 'UTF-8',
                    Data: `<html>
                                <h1 style="color:#1775e5;">Verify Your Email:</h1>
                                <p>Dear ${name}, Please click the below link to verify your email</p>
                                <p>${process.env.CLIENT_REQ_URL}/auth/activate/${token}</p>
                                <p>The above link is valid for 10 mins.</p>
                            </html>`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Complete you verification.'
            }
        }
    };
}

const forgotPasswordEmailParams = (email, token) => {
    return {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: [email],
        },
        ReplyToAddresses: [process.env.EMAIL_TO],
        Message: {
            Body: {
                Html:{
                    Charset: 'UTF-8',
                    Data: `<html>
                                <h1 style="color:#1775e5;">Reset Password:</h1>
                                <p>Please click the below link to reset your password</p>
                                <p>${process.env.CLIENT_REQ_URL}/auth/password/reset/${token}</p>
                                <p>The above link is valid for 10 mins.</p>
                            </html>`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Reset password link.'
            }
        }
    };
}

module.exports = { emailParams, forgotPasswordEmailParams };
