(function() {
    particlesJS.load('backgroundParticles', 'assets/particles.json', function() {});
    let firebaseConfig = {
        apiKey: "AIzaSyC-6HjAZWCKfFkrKq8Ch02XklzPVTzwwEI",
        authDomain: "portfolio-2cae0.firebaseapp.com",
        databaseURL: "https://portfolio-2cae0.firebaseio.com",
        projectId: "portfolio-2cae0",
        storageBucket: "portfolio-2cae0.appspot.com",
        messagingSenderId: "893043010869",
        appId: "1:893043010869:web:ce9e17a82275b095bbf07c",
        measurementId: "G-DKDTLEE8XP"
    };
    let app = firebase.initializeApp(firebaseConfig);
    let db = app.database();
    let projectsRef = db.ref("projects");
    let employersRef = db.ref("employers"); 
    let technologiesRef = db.ref("technologies");
    let analytics = firebase.analytics();
    
    const projects = new Vue({
        el: "#container",
        data: {
            projectsArray: [],
            employersArray: [],
            technologiesArray: []
        },
        created: function() {
            projectsRef.once('value', snapshot => {
                this.projectsArray = snapshot.val();            
            });

            employersRef.once('value', snapshot => {
                this.employersArray = snapshot.val();            
            });

            technologiesRef.once('value', snapshot => {
                this.technologiesArray = snapshot.val();            
            });
        }
    });
})();
