import axios from 'axios';

global.baseURL = '//localhost:8081';
axios.defaults.baseURL = global.baseURL;
axios.defaults.headers['x-access-token'] = 'yiwuyu';
axios.defaults.headers['Content-Type'] = 'application/json';

let BUS = {};
BUS.$axios = axios;
global.BUS = BUS;
let router = {
	replace(url) {
		window.location.replace(url);
	}
};
global.router = {};

import {apiGet, apiPost, apiPut, apiPatch, apiDel, setHeaders, apiUploadFile} from './service';
