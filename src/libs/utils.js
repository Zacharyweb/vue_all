// 判断ios系统还是android系统
function getBlatFrom() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    // 返回1是android系统
    if (isAndroid && alaAndroid) {
        return 1;
    }
    // 返回2是ios系统
    if (isiOS && window.webkit && window.webkit.messageHandlers) {
        return 2;
    }
    return 0;
};

function getDomainName() {
    var protocol = window.location.protocol;
    var host = window.location.host;
    var domainName = protocol + '//' + host;
    return domainName;
};

function getUrlParam(para) {
    var queryStr = location.href.split('?')[1] || '';
    var paraArr = queryStr.substring(0).split("&");
    for (var i = 0; i < paraArr.length; i++) {
        if (para == paraArr[i].split('=')[0]) {
            return paraArr[i].split('=')[1];
        }
    }
    return '';
};

export default{
    getBlatFrom:getBlatFrom,
    getDomainName:getDomainName,
    getUrlParam:getUrlParam
}