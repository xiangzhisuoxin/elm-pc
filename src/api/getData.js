import axios from 'axios';

export const cityGuess = () => {
    return axios.get('/api/v1/cities', {
        params:{
            type: 'guess'
        }
    })
}

export const cityHot = () => {
    axios.get('/api/v1/cities',{
        type: 'cityHot'
    })
}