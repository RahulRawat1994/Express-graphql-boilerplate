import axios from 'axios';

const API_URL = 'http://localhost:8000/graphql';

export const signIn = async variables => {
    const response = await axios.post(API_URL, {
        query:`
            mutation ($login: String!, $password: String!) {
                signIn(login: $login, password: $password) {
                token
                }
            }
        `,
        variables,
    })

    return response;
};


export const me = async token => {
    const response = await axios.post(API_URL, {
        query: `
            {
                me {
                    id
                    email
                    username
                }
            }
        `,
    },
    token ? {
        headers: {
            'x-token': token,
        },
    } : null,
    );

    return response;
}
