import * as api from './api.js';

const host = 'http://localhost:5000';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// export async function getLights() {
//     return await api.get(host + '/data/catalog');
// }

export async function getLightById(id) {
    return await api.get(host + '/data/light/' + id);
}

export async function getCatalogLights() {
    return await api.get(host + '/data/catalog/' + '668cfe59f18d95a1f2f52a13');
}

export async function getProfileLights() {
    const ownerId = JSON.parse(localStorage.getItem('auth'))._id;
    return await api.get(host + '/data/catalog/' + ownerId);
}

export async function getMarketplaceLights() {
    let ownerId = JSON.parse(localStorage.getItem('auth'))._id;
    if (!ownerId) {
        ownerId = 'noUser';
    }
    return await api.get(host + '/data/marketplace/' + ownerId);
}

export async function createRecord(data) {
    return await api.post(host + '/data/light', data);
}

export async function editRecord(id, data) {
    return await api.put(host + '/data/light/' + id, data);
}

export async function deleteRecord(id) {
    return await api.del(host + '/data/light/' + id);
}

export async function getComments() {
    return await api.get(host + '/comments');
}

export async function createComment(data) {
    return await api.post(host + '/comments', data);
}

export async function addToCart(lightId) {
    return await api.put(host + '/data/cart/' + lightId);
}

export async function getCart(userId) { //signal
    return await api.get(host + '/data/cart/' + userId); //signal
}