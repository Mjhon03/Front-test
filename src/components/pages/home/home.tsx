import React, { useState, useEffect } from "react";
import { useUserContext } from "../../../provider/provider";
import ItemList from "../../layout/list";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const { user } = useUserContext();
  const [userData, setUserData] = useState<object>();
  const auth = getAuth();
  const navigate = useNavigate();

  const fetchUserFromFirestore = async (uid: string) => {
    const db = getFirestore(); // Referencia a Firestore
    const userRef = doc(db, "users", uid); // Referencia al documento del usuario en la colección 'users'

    try {
      const docSnapshot = await getDoc(userRef); // Obtener el documento del usuario
      if (docSnapshot.exists()) {
        return docSnapshot.data();
      } else {
        console.log("Usuario no encontrado en Firestore.");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el usuario de Firestore:", error);
      return null;
    }
  };

  const handleLogout = async () => {
  
    try {
      await signOut(auth);
      console.log("Sesión cerrada exitosamente");
  
      // Eliminar datos del usuario del localStorage si se guardaron
      localStorage.removeItem("user");
      localStorage.removeItem("guest");
  
      // Redirigir al usuario a la pantalla de inicio de sesión o página inicial
      navigate("/"); // Cambia la ruta según tu configuración
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    fetchUserFromFirestore(user?.uid).then((userData) => {
      console.log(user.uid);
      
      if (userData) {
        setUserData(userData);
        console.log("Datos del usuario desde Firestore:", userData);
      }
    });
  }, [user]);

  return (
    <main>
      <header className="flex items-center justify-between bg-gray-100 px-10 py-2">
        <p className="text-gray-700">
          <i className="pi pi-user mr-1"></i>
          Welcome
          <b>{userData?.Name ? ` ${userData?.Name}` : "Guest User"} </b>
        </p>

        <button onClick={handleLogout}>
          <i className="pi pi-times cursor-pointer"></i>
        </button>
      </header>
      <section>
        <ItemList isAuthenticated={true} userId={user?.uid} />
      </section>
    </main>
  );
};

export default Home;
