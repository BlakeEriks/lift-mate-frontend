import http from '../http-common'

const LiftService = {

    getAll: () => {
        return http.get('/lifts')
    },

    getAllForMonth: month => {
        return http.get(`/lifts?month=${month+1}`)
    },

    getByDate: date => {
        return http.get(`/lifts?date=${date.toLocaleDateString("en-US")}`)
    },

    create: date => {
        return http.post(`/lifts`, date)
    },

    update: (id, data) => {
        return http.put(`/lifts/${id}`, data)
    },

    remove: id => {
        return http.delete(`/lifts/${id}`)
    }

}

export default LiftService