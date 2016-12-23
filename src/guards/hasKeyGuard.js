import axios from 'axios';

export const hasKeyGuard = (nextState, replace) => {
    const api_key = localStorage.getItem('api_key');

    if (!api_key) {
        // If they don't have their key stored locally, force them to add one by redirecting them.
        replace(`/key`);
    } else {
        // If their key is already stored locally, set the Basic Auth username to it.
        axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa(`${ api_key }:anything`);
    }
}
