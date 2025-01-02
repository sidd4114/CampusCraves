// ./src/Components/SignInwithGoogle.jsx
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../Components/firebase"; // Adjusted import path
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Use React Router navigation


function SignInwithGoogle() {
  const navigate = useNavigate(); // Initialize navigation

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        // Store user info in Firestore
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName || "",
          lastName: "",
          photo: user.photoURL || "",
        });

        toast.success(`Welcome, ${user.displayName || "User"}! You have logged in successfully.`, {
          position: "top-center",
        });

        // Redirect to Home or Profile
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during Google Sign-In: ", error.message);
      toast.error("Google Sign-In failed. Please try again.", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div>
      <p className="continue-p">-- Or continue with --</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={googleLogin}
      >
    <img src={'/google.png'} alt="Google Sign-In" width={"60%"} />

      </div>
    </div>
  );
}

export default SignInwithGoogle;
