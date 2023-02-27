const authHandler = (code) => {
    
    switch (code){
        case "auth/email-already-in-use":
            return "That email address is already in use!";
        case "auth/wrong-password":
            return "Incorrect password. Try again!"
        case "auth/weak-password":
            return "That password is too weak! Try and make something stronger..."
    }

}

export default authHandler;