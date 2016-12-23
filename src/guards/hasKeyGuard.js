export const hasKeyGuard = (nextState, replace) => {
    const api_key = localStorage.getItem('api_key');

    if (!api_key) {
        replace(`/key`)
    }
}
