import * as api from './requester.js';

const host = api.settings.host;

export async function getComments() {
    return await api.get(host + '/comments');
}

export async function createComment(data) {
    return await api.post(host + '/comments', data);
}