import React from "react";

function FoodCard({ food, onDelete }) {
    const imageUrl = food.image
        ? `http://localhost:4000/uploads/${food.image}`
        : null;

    return (
        <div className="bg-white p-4 rounded shadow-md">
            {imageUrl && (
                <img src={imageUrl} alt={food.name} className="w-full h-40 object-cover rounded mb-2" />
            )}
            <h3 className="text-lg font-bold">{food.name}</h3>
            <p className="text-sm text-gray-500">{food.type}</p>
            <button
                onClick={() => onDelete(food._id)}
                className="mt-2 text-red-500 hover:underline"
            >
                Delete
            </button>
        </div>
    );
}

export default FoodCard;