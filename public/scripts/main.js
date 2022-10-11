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
    let analytics = firebase.analytics();
    let startDate = moment().format("YYYY-MM-DD");
    let endDate = startDate;

    Vue.component("external-link", {
        template: "#externalLinkTemplate",
        props: {
            link: String, 
            text: String
        }
    });

    Vue.component("social-media-link", {
        template: "<a :href='link' target='_blank' :class='classString'></a>",
        props: {
            link: String, 
            classString: String
        }
    });

    Vue.component("employer-section", {
        template: "#employerTemplate",
        props: {
            href: String,
            employer: String,
            city: String,
            position: String,
            startdate: String,
            enddate: String
        }
    });

    const vm = new Vue({
        el: "#app",
        data: {
            projectsArray: [],
            employersArray: [],
            technologiesArray: [],
            summaryItems: [],
            socialMediaLinks: [],
            footerTag: ""
        },
        created: function() {
            db.ref("projects").once('value', snapshot => {
                this.projectsArray = snapshot.val();            
            });
            
            db.ref("employers").once('value', snapshot => {
                let tempArray = snapshot.val();
                
                for(let i = 0; i < tempArray.length; i ++) {
                    tempArray[i].startdate = moment(tempArray[i].startdate).format("MMMM YYYY");
                    if(tempArray[i].enddate != undefined) {
                        tempArray[i].enddate = moment(tempArray[i].enddate).format("MMMM YYYY");
                    }
                    else {
                        tempArray[i].enddate = "Present";
                    }
                }
                this.employersArray = tempArray;
            });

            db.ref("technologies").once('value', snapshot => {
                this.technologiesArray = snapshot.val();            
            });

            db.ref("summary").once('value', snapshot => {
                this.summaryItems = snapshot.val();            
            });

            db.ref("footerlinks").once('value', snapshot => {
                this.socialMediaLinks = snapshot.val().socialmedialinks;
                this.footerTag = snapshot.val().footertag.href;
            });
        }
    });
})();
