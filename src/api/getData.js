import axios from 'axios';

export const cityGuess = () => {
    axios.get('/api/v1/cities', {
        type: 'guess'
    })
}