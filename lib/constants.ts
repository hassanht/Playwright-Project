import * as path from 'path';
export const USERDATA_FILEPATH=path.join(__dirname, 'userData.csv');
export let USER_CREDENTIALS = {
    admin: {
        username: 'admin@example.com',
        password: 'password123',
    },
    moderator: {
        username: 'moderator@example.com',
        password: 'password123',
    },
    standard: {
        username: 'newoptest',
        password: '123@Pakistan',
        newPassword:'12@Pakistan',
    },
    locked_out: {
        username: 'locked_out_user',
        password: 'secret_sauce',
    }
};


export const URLS = {
    login: 'https://marketplace.bimtvist.com/login',
    registrationConfirmed: 'https://marketplace.bimtvist.com/registrationconfirmed',
   
};






