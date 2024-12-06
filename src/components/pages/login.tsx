// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from "react";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { getFirestore, doc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import "../../firebase/firebase";

// const Login: React.FC = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
//         <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
//         {error && (
//           <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
//         )}
//         <form onSubmit={handleLogin} className="mt-4 space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
//           >
//             Login
//           </button>
//         </form>
//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600">¿No tienes una cuenta?</p>
//           <button
//             onClick={handleGuestLogin}
//             className="mt-2 py-2 px-4 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
//           >
//             Login como invitado
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
