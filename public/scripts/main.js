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
    firebase.analytics();
    let db = app.database();
    
    const projects = new Vue({
        el: "#projectContainer",
        data: {
            projectsArray: []
        },
        created() {
            this.projectsArray = getProjects();
        }
    });
    
    const employers = new Vue({
        el: '#experienceContainer',
        data: {
            employersArray: []
        },
        created() {
            this.employersArray = getEmployers();
        }
    });

    function getEmployers() {
        return db.ref('employers').once('value').val();
    }

    function getProjects() {
        let snapshot = db.ref('projects').once('value');
        return snapshot.val();
    }
})();
