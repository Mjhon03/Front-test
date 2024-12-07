import { useRef, useState } from "react";
import "./auth.css";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../../../firebase/firebase";

const Auth: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleSlide = (slide: boolean) =>
    slide
      ? containerRef.current?.classList.add("active")
      : containerRef.current?.classList.remove("active");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const user = userCredential.user;

    localStorage.setItem(
      "user",
      JSON.stringify({ email: user.email, uid: user.uid }),
    );

    navigate("/home");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Registrar al usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario registrado:", userCredential.user);

    } catch (err: unknown) {
      console.log(err);
       // Mostrar mensaje de error en caso de fallo
    }
  };

  return (
    <main className="flex bg-slate-100 justify-center items-center flex-col overflow-hidden h-[100vh]">
      <section
        className="container rounded-3xl relative w-[950px] max-w-full overflow-hidden shadow-2xl h-[500px]"
        ref={containerRef}
      >
        <div className="form-container register-container">
          <form
            onSubmit={handleRegister}
            className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center"
          >
            <h1 className="text-4xl font-bold">Sign Up here.</h1>
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <button type="button">Sign Up</button>
          </form>
        </div>
        <div className="form-container login-container">
          <form
            onSubmit={handleLogin}
            className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center"
          >
            <h1 className="text-4xl font-bold">Sign In here.</h1>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit">Sign In</button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div
              className="overlay-panel
              absolute flex items-center justify-center flex-col px-[40px] text-center top-0 h-full w-1/2 translate-x-0
              overlay-left"
            >
              <h1 className="text-5xl font-bold max-w-[300px]">
                manage your items
              </h1>
              <p className="text-lg my-5">
                If you have an account, login here and have fun
              </p>
              <button
                className="ghost"
                type="button"
                id="login"
                onClick={() => handleSlide(false)}
              >
                Sign in
              </button>
            </div>

            <div
              className="overlay-panel
              absolute flex items-center justify-center flex-col px-[40px] text-center top-0 h-full w-1/2 translate-x-0
              overlay-right"
            >
              <h1 className="text-5xl font-bold max-w-[300px]">
                manage your items
              </h1>
              <p className="text-lg my-5">
                If you dont have an account yet, join us and start the journey
              </p>
              <button
                className="ghost"
                type="button"
                id="register"
                onClick={() => handleSlide(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Auth;
