import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import FoodForm from "./components/FoodForm";
import FoodCard from './components/FoodCard';
import Footer from "./components/Footer";
import './App.css'

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [foods, setFoods] = useState([]);

  // Fetch foods from backend
  const fetchFoods = () => {
    fetch(`${API_URL}/foods`)
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch(err => console.error("Error fetching foods:", err));
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const addFood = (formData) => {
    fetch(`${API_URL}/foods`, {
      method: "POST",
      body: formData,
    }).then(() => fetchFoods());
  };

  const handleEditFood = async (id, formData) => {
    try {
      const res = await fetch(`${API_URL}/foods/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update food");

      fetchFoods(); // Refresh the list
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    }
  };


  const deleteFood = (id) => {
    fetch(`${API_URL}/foods/${id}`, {
      method: "DELETE",
    }).then(() => fetchFoods());
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-orange-100 p-4">
      <Navbar />
      <FoodForm onAddFood={addFood} />
      <section className="mt-10 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food} onDelete={deleteFood} onEdit={handleEditFood} />
        ))}
      </section>
      <Footer />
    </div>
  );
}
export default App
