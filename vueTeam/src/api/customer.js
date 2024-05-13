// axios 요청 처리하는 함수들
// axios-common.js 에서, export 한 객체를 import 해서 비동기 요청을 함.
import myaxios from "@/utils/axios-common.js"

function addCustomer(customer, success, fail) {
    myaxios.post(`/customers`, customer)
    .then(success)
    .catch(fail)
}

function removeCustomer(num, success, fail) {
    myaxios.delete(`/customers/${num}`)
    .then(success)
    .catch(fail)
}

function updateCustomer(customer, success, fail) {
    myaxios.put(`/customers`, customer)
    .then(success)
    .catch(fail)
}

export {
    selectAll, selectOne, insertCustomer, removeCustomer, updateCustomer
}