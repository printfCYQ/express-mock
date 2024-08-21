const express = require('express');
const router = express.Router();
const { sendResponse, host, port } = require('../utils')
const Mock = require('mockjs')
const Random = Mock.Random

const API_URL_LIST = {
    USER_LIST: '/user/list',
    USER_DETAIL: '/user/detail',
    USER_ADD: '/user/add',
    USER_UPDATE: '/user/update',
    USER_DELETE: '/user/delete',
};

console.log('🥳🥳🥳-----------------------------------')
Object.keys(API_URL_LIST).forEach(key => {
    console.log(`${host}:${port}${API_URL_LIST[key]}`);
});
console.log('🥳🥳🥳-----------------------------------')

router.get(API_URL_LIST.USER_LIST, (req, res) => {
    const { page, pageSize } = req.query;
    const data = Mock.mock({
        'list|10': [{
            'id|+1': 1,
            'name': () => Random.cname(),
            'age|1-100': 1,
            'address': () => Random.city(),
            'createdAt': () => Random.datetime(),
            'updatedAt': () => Random.datetime(),
        }],
        'page': page,
        'pageSize': pageSize,
        'total': 100,
    });
    sendResponse(res, data);
});

router.get(API_URL_LIST.USER_DETAIL, (req, res) => {
    const data = Mock.mock({
        'id|+1': 1,
        'name': Random.cname(),
        'age|1-100': 1,
        'address': Random.city(),
        'createdAt': Random.datetime(),
        'updatedAt': Random.datetime(),
    });
    sendResponse(res, data);
});

router.post(API_URL_LIST.USER_ADD, (req, res) => {
    sendResponse(res, {});
});

router.put(API_URL_LIST.USER_UPDATE, (req, res) => {
    sendResponse(res, {});
});

router.delete(API_URL_LIST.USER_DELETE, (req, res) => {
    sendResponse(res, {});
});

module.exports = router;
