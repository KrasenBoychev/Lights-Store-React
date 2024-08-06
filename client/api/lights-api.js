import * as api from './requester.js';

const host = api.settings.host;

export async function getLightById(id) {
    return await api.get(host + '/data/light/' + id);
}

export async function getCatalogLights() {
    return await api.get(host + '/data/catalog/' + '668cfe59f18d95a1f2f52a13');
}

export async function getProfileLights() {
    const ownerId = localStorage.getItem('auth') !== null
        ? JSON.parse(localStorage.getItem('auth')).userId
        : 'noUser';
        
    return await api.get(host + '/data/catalog/' + ownerId);
}

export async function getMarketplaceLights() {
    const ownerId = localStorage.getItem('auth') !== null
        ? JSON.parse(localStorage.getItem('auth')).userId 
        : 'noUser';

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