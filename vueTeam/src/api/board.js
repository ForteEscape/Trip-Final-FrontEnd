import myaxios from "@/utils/axios-common.js"

const url = "/boards" // 주소

function selectAll(success, fail) {
    myaxios.get(`${url}`)
    .then(success)
    .catch(fail);
}

function selectOne(num, success, fail) {
    myaxios.get(`${url}/${num}`)
    .then(success)
    .catch(fail)
}

function addBoard(board, success, fail) {
    myaxios.post(`${url}`, board)
    .then(success)
    .catch(fail)
}

function removeBoard(num, success, fail) {
    myaxios.delete(`${url}/${num}`)
    .then(success)
    .catch(fail)
}

function updateBoard(board, success, fail) {
    myaxios.put(`${url}/${board.num}`, board)
    .then(success)
    .catch(fail)
}

export {
    selectAll, selectOne, addBoard, removeBoard, updateBoard
}