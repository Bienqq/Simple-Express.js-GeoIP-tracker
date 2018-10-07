document.addEventListener("DOMContentLoaded", () => {
    
    const generateLinkEndpoint = "http://localhost:8090/generate" // hardcoded to be removed
    new Vue({
        el: "#vue-app",
        data: {
            link: "",
            linkFromHistory:"<li> Cos</li>" //for test purposes only
        },
        methods: {
            generate: function () {
                axios.get(generateLinkEndpoint).then(response =>{
                    this.link = response.data
                    return this.linkFromHistory;
                })
            }
        }
    });

});