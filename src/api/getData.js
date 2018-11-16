import axios from 'axios';

export const cityGuess = () => axios.get('/api/v1/cities', {
    params:{
        type: 'guess'
    }
})

export const cityHot = () => axios.get('/api/v1/cities', {
    params:{
        type: 'cityHot'
    }
})

export const cityGroup = () => axios.get('/api/v1/cities', {
    params:{
        type: 'cityGroup'
    }
})

export const getVerificationCode = () => axios.post('/api/v1/captchas')

export const accountLogin = (username, password, captchaCode) => axios.post('/api/v2/login', {
    type: 'account',
    username,
    password,
    captchaCode
});
