import axios from 'axios'

export default axios.create({
    baseURL: 'https://lift-mate.herokuapp.com/',
    headers: {
        'Content-type': 'application/json'
    }
})