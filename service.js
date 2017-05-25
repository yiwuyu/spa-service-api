import {request} from './request';

import qs from 'qs';

// qiniu文件上传
export const upload = `https://upload-z2.qbox.me`;

export async function apiUploadFile(params, cb) {
	return request(upload, {
		method: 'POST',
		data: params,
		onUploadProgress: function(progressEvent) {
			cb(progressEvent);
		}
	});
};
/**
 * 空交车
 * @createdAt 2017-05-25T18:12:52+0800
 * @author yiwuyu
 */
export function setHeaders(key, value) {
	global.BUS.$axios.defaults.headers[key] = value;
};

export async function apiGet(url, params) {
	return request(`${url}?${qs.stringify(params)}`);
};

export async function apiPost(url, params) {
	return request(url, {
		method: 'POST',
		data: params
	});
};

export async function apiPut(url, id, params) {
	return request(`${url}/${id}`, {
		method: 'PUT',
		data: params
	});
};

export async function apiPatch(url, id, params) {
	return request(`${url}/${id}`, {
		method: 'PATCH',
		data: params
	});
};

/**
 * 删除接口
 * @param     {String} request url
 * @param     {String || Array} resource id
 * @return    {Promise} Promise对象
 * @createdAt 2017-05-04T11:01:57+0800
 * @updatedAt 2017-05-25T17:01:57+0800
 * @description update surport String type for ids
 *              if ids is an empty Array or ids is an empty String
 *              	resove a error promise
 *              else
 *              	excute the data handle for request
 *              	resove the request promise
 * @author yiwuyu
 */
export async function apiDel(url, ids) {
	let config = {
		method: 'DELETE'
	};
	let result = {
		code: 500
	};
	return new Promise(function(resolve) {
		if (Array.isArray(ids) && !ids.length || !ids) {
			console.warn('can not send an empty data');
			result.msg = '未选择操作对象';
			resolve(result);
		} else {
			if (Array.isArray(ids)) {
				if (ids.length > 1) {
					config.data = { ids: ids };
				} else {
					url += `/${ids[0]}`;
				}
			} else {
				url += `/${ids}`;
			}
			resolve(request(url, config));
		}
	});
};
