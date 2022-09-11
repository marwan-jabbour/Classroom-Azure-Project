import axios from 'axios';

/**
 * URLs and other api constants
 */
const constants = {
    api: {
        baseURL: 'https://aspapimanagementservicev2.azure-api.net/aspfunctionappv8',
    },
};

/**
 * Create an Axios Client with defaults
 */
export default axios.create({
    baseURL: constants.api.baseURL,
    headers: {'Ocp-Apim-Subscription-Key': 'dd4b9efb1bef436da2a9c5499764077c' }
});