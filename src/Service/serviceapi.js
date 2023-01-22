// const base_url = "http://localhost:8080"
// const base_url = "https://resgm.herokuapp.com"

let base_url;
if (process.env.IS_HEROKU === 'true') {
    base_url = "https://resgm.herokuapp.com"
} else {
    base_url =  "http://localhost:8080"
}

// const upload_url = "http://localhost:8081/Documents/FYP workspace/upload/"

// const base_url="http://localhost:8080"

const upload_url="http://localhost:8081/Documents/FYP workspace/upload/"

export {base_url, upload_url}