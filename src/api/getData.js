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

export const getVerificationCode = () => axios.post('/api/v2/captchas')

export const accountLogin = (username, password, captchaCode) => axios.post('/api/v2/login', {
    type: 'account',
    username,
    password,
    captchaCode
});
//选择地址页面 根据输入内容查询详细地址
export const getDetailPlace = (cityId,keyword) => axios.get('/api/v1/pois',{
    params:{
        cityId,
        keyword,
    }
});
export const getFoodType = () => axios.get('/api/v1/foodType')
