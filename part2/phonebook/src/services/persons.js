import axios from 'axios'
// const baseUrl = 'http://localhost:3001/persons'
const baseUrl = '/api/persons' // Use relative url
// Now HTTP GET requests to the address www.serversaddress.com/index.html or www.serversaddress.com will show the React frontend. GET requests to the address www.serversaddress.com/api/notes will be handled by the backend's code.

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = personObject => {
  const request = axios.post(baseUrl, personObject)
  return request.then(response => response.data)
}

const update = (id, personObject) => {
  const request = axios.put(`${baseUrl}/${id}`, personObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return getAll()
}
export default { getAll, create, update, remove }