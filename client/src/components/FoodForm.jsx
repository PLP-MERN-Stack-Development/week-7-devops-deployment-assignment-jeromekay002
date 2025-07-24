import { useState } from "react";

function FoodForm({ onAddFood }) {
    const [newFood, setNewFood] = useState({ name: "", type: "" });
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", newFood.name);
        formData.append("type", newFood.type);
        formData.append("image", image);

        onAddFood(formData);
        setNewFood({ name: "", type: "" });
        setImage(null);
    };

    return (
        <section className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Add a New Food</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 max-w-md mx-auto">
                <input
                    type="text"
                    placeholder="Food Name"
                    value={newFood.name}
                    onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    required
                />
                <input
                    type="text"
                    placeholder="Food Type"
                    value={newFood.type}
                    onChange={(e) => setNewFood({ ...newFood, type: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/*"
                    className="w-full"
                />
                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                    Add Food
                </button>
            </form>
        </section>
    );
}

export default FoodForm;