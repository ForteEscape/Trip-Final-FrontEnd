import axios from "axios"

export default axios.create({
    baseURL: "http://localhost", // 여기에 주소 입력하면 됩니다
    headers: {
        "Content-Type": "application/json",
    }
})