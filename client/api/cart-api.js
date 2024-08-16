import * as api from './requester.js';

const host = api.settings.host;

export async function addToCart(lightId) {
    return await api.put(host + '/cart/' + lightId);
}

export async function getCart(userId) { //signal
    return await api.get(host + '/cart/' + userId); //signal
}

export async function getCartLights(lightsId) { //signal
    return await api.get(host + '/cart/lights/' + lightsId); //signal
}

export async function removeLightFromCart(lightId) {
    return await api.del(host + '/cart/' + lightId);
}