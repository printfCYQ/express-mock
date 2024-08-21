const port = 3000;
const host = 'http://localhost';
module.exports = {
    port,
    host,
    sendResponse: (res, data, timer = 0) => {
        setTimeout(() => {
            res.send({
                code: 0,
                msg: 'CYQ mock',
                data
            })
        }, timer)
    },
    sendErrorResponse: (res, data) => {
        res.send({
            code: 100,
            msg: 'CYQ error mock',
            data
        })
    }
};