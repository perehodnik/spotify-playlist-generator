import axios from 'axios';

export function setTokenHeader(token) {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
}

export async function createPlaylist(apiurl, postData) {
    return axios.post(apiurl, postData)
    .then(data => data)
    .catch(function (error) {
        console.log(error);
    });
}

export async function getPlaylist(apiurl) {
    return axios.get(apiurl)
    .then(data => data)
    .catch(function (error) {
        console.log(error);
    });
}
