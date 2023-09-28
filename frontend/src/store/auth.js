const state = {
    token: null,
};

const mutations = {
    setToken(state, token) {
        state.token = token;
    },
};

const actions = {
    login({ commit }, token) {
        commit('setToken', token);
    },
    logout({ commit }) {
        commit('setToken', null);
    },
};

const getters = {
    isAuthenticated: (state) => !!state.token,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
