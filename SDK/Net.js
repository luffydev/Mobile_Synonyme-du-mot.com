import axios from 'axios';
import CONFIG from '../config'

class Net {

    constructor() {
    }
    
    getData(pService) {
        return axios.get(CONFIG.BASE_PROTOCOL + '://' + CONFIG.BASE_URL + '/' + pService);
    }
}

export default Net;