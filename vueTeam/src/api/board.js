import myaxios from "@/utils/axios-common.js"

const url = "/boards" // 주소

function selectAll(success, fail) {
    myaxios.get(`${url}`)
    .then(success)
    .catch(fail);
}

function selectOne(id, success, fail) {
    myaxios.get(`${url}/${id}`)
    .then(success)
    .catch(fail)
}

function addBoard(board, success, fail) {
    myaxios.post(`${url}`, board)
    .then(success)
    .catch(fail)
}

function removeBoard(id, success, fail) {
    myaxios.delete(`${url}/${id}`)
    .then(success)
    .catch(fail)
}

function updateBoard(board, success, fail) {
    myaxios.put(`${url}/${board.id}`, board)
    .then(success)
    .catch(fail)
}

export {
    selectAll, selectOne, addBoard, removeBoard, updateBoard
}