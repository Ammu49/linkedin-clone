

const { default: axios } = require("axios")

export const BASE_URL = "https://linkedin-clone-ih90.onrender.com/"

export const clientServer = axios.create({
    baseURL: BASE_URL,
})
