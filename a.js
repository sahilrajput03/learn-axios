const axios = require('axios')
// Using axios instances
const baseURL = 'http://localhost:8005'

const payload = {
	firstName: 'Fred',
	lastName: 'Flintstone',
}

// instance
// NOTE: Instance must be created before setting `axios` default values bcoz otherwise default values will be inherited into axios insatance as well. ~Sahil
const api = axios.create({
	baseURL,
})

axios.defaults.baseURL = baseURL
axios.defaults.headers.common['Authorization'] = 'BEARER my-token'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 2500

const sleep = (TIME = 500) => new Promise((res) => setTimeout(res, TIME))

void (async function () {
	try {
		const r1 = await axios.post('/', payload)

		// Updating `Authorization` header
		axios.defaults.headers.common['Authorization'] = 'BEARER my-token-UPDATED'
		await sleep()
		const r2 = await axios.get('/bar')

		// Setting defaults values for instance
		api.defaults.headers.common['Authorization'] = 'BEARER my-token-FOR-INSTANCE'
		await sleep()
		const {data} = await api.get('/fso/patients.json')
	} catch (e) {
		console.log(e.name)
		console.log(e.message)
	}
})()
