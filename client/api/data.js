import * as api from './api.js';

const host = 'http://localhost:5000';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Implement application-specific requests
export async function getLights() {
    return await api.get(host + '/data/catalog');
}

export async function getLightById(id) {
    return await api.get(host + '/data/catalog/' + id);
}

export async function getCatalogLights(ownerId) {
    return await api.get(host + `/data/catalog?where=_ownerId%3D%22${ownerId}%22`);
}

export async function getProfileLights() {
    const ownerId = sessionStorage.getItem('userId');
    return await api.get(host + `/data/catalog?where=_ownerId%3D%22${ownerId}%22`);
}

export async function getMarketplaceLights() {
    let ownerId = sessionStorage.getItem('userId');
    if (!ownerId) {
        ownerId = 'noUser';
    }
    return await api.get(host + '/data/catalog/marketplace/' + ownerId);
}

export async function createRecord(data) {
    return await api.post(host + '/data/catalog', data);
}

export async function editRecord(id, data) {
    return await api.put(host + '/data/catalog/' + id, data);
}

export async function deleteRecord(id) {
    return await api.del(host + '/data/catalog/' + id);
}