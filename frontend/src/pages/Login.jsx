import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* ======================
     PANDA EMOTION SYSTEM
  ====================== */
  const [emotion, setEmotion] = useState("happy"); 
  // happy | focused | shy | excited

  const [eyeTarget, setEyeTarget] = useState({ x: 0, y: 0 });
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const typingTimeout = useRef(null);

  /* ======================
     BLINK SYSTEM
  ====================== */
  const [blink, setBlink] = useState(false);
  useEffect(() => {
    const loop = () => {
      if (!isTypingPassword) {
        setBlink(true);
        setTimeout(() => setBlink(false), 120);
      }
      setTimeout(loop, 2800 + Math.random() * 3000);
    };
    loop();
  }, [isTypingPassword]);

  /* ======================
     FORM SUBMIT
  ====================== */
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setEmotion("excited");

    try {
      const url =
        currentState === "Login"
          ? "/api/user/login"
          : "/api/user/register";

      const payload =
        currentState === "Login"
          ? { email, password }
          : { name, email, password };

      const res = await axios.post(backendUrl + url, payload);

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
      } else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  /* ======================
     INPUT FOCUS → EYES
  ====================== */
  const focusName = () => {
    setEmotion("happy");
    setEyeTarget({ x: 0, y: -4 });
  };

  const focusEmail = () => {
    setEmotion("focused");
    setEyeTarget({ x: 0, y: 3 });
  };

  const focusPassword = () => {
    setEmotion("shy");
    setIsTypingPassword(true);
  };

  const blurField = () => {
    setEmotion("happy");
    setEyeTarget({ x: 0, y: 0 });
    setIsTypingPassword(false);
  };

  /* ======================
     SVG PANDA
  ====================== */
  const PandaSVG = () => {
    const eyeX = eyeTarget.x;
    const eyeY = eyeTarget.y;

    return (
      <div className="w-40 h-40 mx-auto mb-6 relative">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Face */}
          <circle cx="100" cy="100" r="80" fill="#fff" stroke="#d1fae5" strokeWidth="6" />

          {/* Ears */}
          <circle cx="45" cy="40" r="28" fill="#1f2937" />
          <circle cx="155" cy="40" r="28" fill="#1f2937" />

          {/* Eye patches */}
          <ellipse cx="70" cy="95" rx="22" ry="26" fill="#1f2937" />
          <ellipse cx="130" cy="95" rx="22" ry="26" fill="#1f2937" />

          {/* Eyes */}
          {!isTypingPassword && !blink && (
            <>
              <circle cx={70 + eyeX} cy={95 + eyeY} r="6" fill="#fff" />
              <circle cx={130 + eyeX} cy={95 + eyeY} r="6" fill="#fff" />
            </>
          )}

          {/* Closed eyes */}
          {(isTypingPassword || blink) && (
            <>
              <line x1="55" y1="95" x2="85" y2="95" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
              <line x1="115" y1="95" x2="145" y2="95" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
            </>
          )}

          {/* Nose */}
          <ellipse cx="100" cy="115" rx="8" ry="6" fill="#111827" />

          {/* Mouth */}
          <path
            d={
              emotion === "excited"
                ? "M82 125 Q100 140 118 125"
                : emotion === "shy"
                ? "M90 128 Q100 132 110 128"
                : "M85 125 Q100 135 115 125"
            }
            stroke="#111827"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />

          {/* ARMS */}
          <g
            className="arm"
            style={{
              transformOrigin: "60px 120px",
              transform: isTypingPassword
                ? "rotate(-40deg)"
                : "rotate(-10deg)",
            }}
          >
            <rect x="40" y="110" width="50" height="14" rx="7" fill="#1f2937" />
          </g>

          <g
            className="arm"
            style={{
              transformOrigin: "140px 120px",
              transform: isTypingPassword
                ? "rotate(40deg)"
                : "rotate(10deg)",
            }}
          >
            <rect x="110" y="110" width="50" height="14" rx="7" fill="#1f2937" />
          </g>
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10">

        <PandaSVG />

        <h2 className="text-3xl font-black text-center mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          {currentState === "Login" ? "Welcome Back" : "Join Fashion World"}
        </h2>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          {currentState === "Sign Up" && (
            <input
              className="premium-input"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={focusName}
              onBlur={blurField}
            />
          )}

          <input
            className="premium-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={focusEmail}
            onBlur={blurField}
          />

          <div className="relative">
            <input
              className="premium-input pr-14"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsTypingPassword(true);
                clearTimeout(typingTimeout.current);
                typingTimeout.current = setTimeout(
                  () => setIsTypingPassword(false),
                  400
                );
              }}
              onFocus={focusPassword}
              onBlur={blurField}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button
            disabled={isLoading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg"
          >
            {isLoading
              ? "Processing..."
              : currentState === "Login"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          {currentState === "Login" ? (
            <>
              New here?{" "}
              <button
                onClick={() => setCurrentState("Sign Up")}
                className="text-emerald-600 font-bold"
              >
                Create account →
              </button>
            </>
          ) : (
            <>
              Already have one?{" "}
              <button
                onClick={() => setCurrentState("Login")}
                className="text-teal-600 font-bold"
              >
                Sign in →
              </button>
            </>
          )}
        </p>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .premium-input {
          width: 100%;
          padding: 16px 18px;
          border-radius: 18px;
          border: none;
          outline: none;
          background: rgba(255, 255, 255, 0.75);
          box-shadow: inset 0 0 0 1px rgba(16, 185, 129, 0.25),
            0 10px 25px rgba(16, 185, 129, 0.15);
          font-weight: 500;
          transition: all 0.35s ease;
        }

        .premium-input:focus {
          box-shadow: inset 0 0 0 2px rgba(16, 185, 129, 0.6),
            0 15px 35px rgba(16, 185, 129, 0.35);
          transform: translateY(-1px);
        }

        .arm {
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
    </div>
  );
};

export default Login;
