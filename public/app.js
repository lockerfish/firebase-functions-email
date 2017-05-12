(function() {

	// Initialize Firebase
	const config = {
	    apiKey: "[YOUR_KEY_HERE",
	    authDomain: "[YOUR_DOMAIN]",
	    databaseURL: "[DATABASE_URL]",
	    storageBucket: "[STORAGE]",
	    messagingSenderId: ""
	}
	firebase.initializeApp(config);

	// Get elements
	const txtEmail = document.getElementById("txtEmail");
	const txtPassword = document.getElementById("txtPassword");
	const btnLogin = document.getElementById("btnLogin");
	const btnSignUp = document.getElementById("btnSignUp");
	const btnLogout = document.getElementById("btnLogout");
	// const btnGoogle = document.getElementById("btnGoogle");

	// btnGoogle.addEventListener("click", e => {
	// 	// Using a popup.
	// 	var provider = new firebase.auth.GoogleAuthProvider();
	// 	provider.addScope('profile');
	// 	provider.addScope('email');
	// 	firebase.auth().signInWithPopup(provider).then(function(result) {
	// 	  // This gives you a Google Access Token.
	// 	  var token = result.credential.accessToken;
	// 	  // The signed-in user info.
	// 	  var user = result.user;
	// 	});
	// });

	// Login event
	btnLogin.addEventListener("click", e => {
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();

		const promise = auth.signInWithEmailAndPassword(email, pass);
		promise.catch(e => console.log(e));
	});

	// Sign up event
	btnSignUp.addEventListener("click", e => {
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();

		const promise = auth.createUserWithEmailAndPassword(email, pass);
		promise
		  // .then(user => console.log(user))
		  .catch(e => console.log(e));
	});

	// Logout event
	btnLogout.addEventListener("click", e => {
		firebase.auth().signOut();
	});

	// 
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if (firebaseUser) {
			console.log(firebaseUser);
			console.log(firebaseUser.emailVerified);
			if (!firebaseUser.emailVerified) {
				const promise = firebaseUser.sendEmailVerification();
				promise.then(() => {
				  // Email sent.
				  console.log("email verification sent");

			  	  // const credential = firebase.auth().EmailAuthProvider.credential(user.email, user.password);
			  	  // firebase.auth().reauthenticate(credential);
			  	  // console.log("reauthenticate user");

				}, e => {
				  // An error happened.
				  console.log(e);
				});	
			}
			btnLogout.classList.remove("hide");
		} else {
			console.log("not logged in");
			btnLogout.classList.add("hide");
		}
	});

}());
