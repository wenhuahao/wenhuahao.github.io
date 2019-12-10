function f(n) {
    if (n == 1 || n == 2) {
        return 1;
    }
    return f(n - 2) + f(n - 1);
}

// 监听接收来自主线程的 消息
onmessage = function (event) {
    // console.log(event.data);
    var result = f(event.data)
    // 向主线程发送 消息
    postMessage(result)
}