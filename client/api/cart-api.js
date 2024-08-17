import * as api from './requester.js';

const host = api.settings.host;

export async function addToCart(lightId) {
    return await api.put(host + '/cart/' + lightId);
}

export async function getCart(userId) { 
    return await api.get(host + '/cart/' + userId); 
}

export async function getCartLights(lightsId) {
    return await api.get(host + '/cart/lights/' + lightsId);
}

export async function removeLightFromCart(lightId) {
    return await api.del(host + '/cart/' + lightId);
}