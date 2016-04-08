'use strict';

const async_wrap = process.binding('async_wrap');

const nextIdArray = async_wrap.getNextAsyncId2();
const currentIdArray = async_wrap.getCurrentAsyncId2();

function getLittleEndian(a) {
    if (a[0] === 0xffffffff) {
        a[0] = 0;
        a[1]++;
    }
    return a[0] + a[1] * 0x100000000;
}

function getBigEndian(a) {
    if (a[1] === 0xffffffff) {
        a[1] = 0;
        a[0]++;
    }
    return a[1] + a[0] * 0x100000000;
}

function getCurrentIdLittleEndian() {
    return getLittleEndian(currentIdArray);
}

function getCurrentIdBigEndian() {
    return getBigEndian(currentIdArray);
}

function getNextIdLittleEndian() {
    return getLittleEndian(nextIdArray);
}

function getNextIdBigEndian() {
    return getBigEndian(nextIdArray);
}

module.exports.getCurrentAsyncWrapId = async_wrap.getCurrentAsyncId;
module.exports.getNextAsyncWrapId = async_wrap.getNextAsyncId;

module.exports.getCurrentAsyncWrapId2 =
    process.binding('os').isBigEndian ? getCurrentIdBigEndian : getCurrentIdLittleEndian;

module.exports.getNextAsyncWrapId2 =
    process.binding('os').isBigEndian ? getNextIdBigEndian : getNextIdLittleEndian;
