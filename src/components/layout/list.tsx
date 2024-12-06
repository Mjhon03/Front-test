import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase"; // Firebase configurado
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy
} from "firebase/firestore";

interface Item {
  id: string;
  name: string;
}

const ItemList = ({
  isAuthenticated,
  userId,
}: {
  isAuthenticated: boolean;
  userId: string;
}) => {
  const [itemName, setItemName] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    if (isAuthenticated) {
      // Ordenar por un criterio consistente, como timestamp o nombre
      const itemsQuery = query(
        collection(db, "users", userId, "Items"),
        orderBy("name", "asc") // Orden ascendente por nombre
      );
      const querySnapshot = await getDocs(itemsQuery);

      setItems(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      );
    } else {
      const localItems = localStorage.getItem("guestItems");
      const parsedItems = localItems ? JSON.parse(localItems) : [];
      setItems(parsedItems.sort((a: Item, b: Item) => a.name.localeCompare(b.name))); // Ordenar por nombre
    }
  };

  const handleAddItem = async () => {
    if (!itemName.trim() || items.some((item) => item.name === itemName))
      return;

    const newItem = { id: `${Date.now()}`, name: itemName };

    if (isAuthenticated) {
      await addDoc(collection(db, "users", userId, "Items"), {
        name: newItem.name,
      });
    } else {
      const updatedItems = [...items, newItem];
      localStorage.setItem("guestItems", JSON.stringify(updatedItems));
    }
    setItems((prev) => [...prev, newItem]);
    setItemName("");
  };

  const handleAttendItem = async () => {
    if (!items.length) return;
  
    const [firstItem, ...restItems] = items; // Obtener el primer elemento y los restantes
    if (isAuthenticated) {
      // Eliminar del Firestore
      const itemDoc = doc(db, "users", userId, "Items", firstItem.id);
      await deleteDoc(itemDoc);
    } else {
      // Actualizar los elementos en localStorage
      const updatedItems = restItems.sort((a, b) =>
        a.name.localeCompare(b.name)
      ); // Ordenar los elementos restantes
      localStorage.setItem("guestItems", JSON.stringify(updatedItems)); // Guardar los elementos restantes
    }
    setItems(restItems); // Actualizar el estado local
  };

  useEffect(() => {
    fetchItems();
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50">
      {/* Título */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Item List</h1>

      {/* Entrada y Botones */}
      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Item name"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
        />
        <button
          onClick={handleAddItem}
          disabled={!itemName.trim()}
          className={`px-4 py-2 rounded-md text-white font-medium ${!itemName.trim() ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          Add
        </button>
        <button
          onClick={handleAttendItem}
          disabled={!items.length}
          className={`px-4 py-2 rounded-md text-white font-medium ${!items.length ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}`}
        >
          Attend Item
        </button>
      </div>

      {/* Lista de elementos */}
      <div className="w-full max-w-md bg-white shadow-md rounded-md p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Current Items
        </h2>
        <ul className="space-y-2">
          {items.length ? (
            items.map((item) => (
              <li
                key={item.id}
                className="bg-gray-100 p-2 rounded-md border border-gray-300 text-gray-800"
              >
                {item.name}
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">No items to attend</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ItemList;
