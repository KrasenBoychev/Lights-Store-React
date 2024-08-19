import * as api from './requester.js';

const host = api.settings.host;

export async function addToCart(lightId) {
    return await api.put(host + '/cart/' + lightId);
}

export async function updateUserCart(lightsIds) {
    if (lightsIds.length == 0) {
        return await api.put(host + '/cart/userCart/' + 'noLights');
    } else {
        return await api.put(host + '/cart/userCart/' + lightsIds);
    }
   
}

export async function getCartLights(lightsId) {
    return await api.get(host + '/cart/lights/' + lightsId);
}

export async function removeLightFromCart(lightId) {
    return await api.del(host + '/cart/' + lightId);
}