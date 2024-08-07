class AppUrl { 
    static baseUrl = "http://127.0.0.1:8000";
    static apiUrl =  "http://127.0.0.1:8000/api";
    // Home
    static home = this.apiUrl + "/home";
    // Payment 
    static payment = this.apiUrl + "/payment";
}

export default AppUrl;