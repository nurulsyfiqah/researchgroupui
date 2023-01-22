// localhost
// const base_url = "http://localhost:3000"
// export default base_url

function base_url() {
    if (process.env.IS_HEROKU === 'true') {
        return "https://researchgroupui.herokuapp.com"
    } else {
        return "http://localhost:3000"
    }
}
// let base_url;
// if (process.env.IS_HEROKU === 'true') {
//     base_url = "https://researchgroupui.herokuapp.com"
// } else {
//     base_url =  "http://localhost:3000"
// }
// server
// const base_url = "https://researchgroupui.herokuapp.com"
export default base_url