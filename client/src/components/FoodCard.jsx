import React, { useState } from "react";

function FoodCard({ food, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(food.name);
    const [type, setType] = useState(food.type);
    const [image, setImage] = useState(null);

    const imageUrl = food.image
        ? `http://localhost:4000/uploads/${food.image}`
        : null;

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("type", type);
        if (image) formData.append("image", image);

        await onEdit(food._id, formData);
        setIsEditing(false);
    };

    return (
        <div className="bg-white p-4 rounded shadow-md">
            {imageUrl && !isEditing && (
                <img src={imageUrl} alt={food.name} className="w-full h-40 object-cover rounded mb-2" />
            )}

            {isEditing ? (
                <form onSubmit={handleEditSubmit} className="space-y-2">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Food name"
                    />
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Food type"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full"
                    />
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="text-green-500 hover:underline"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="text-gray-500 hover:underline"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <h3 className="text-lg font-bold">{food.name}</h3>
                    <p className="text-sm text-gray-500">{food.type}</p>
                    <div className="flex gap-4 mt-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-blue-500 hover:underline"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(food._id)}
                            className="text-red-500 hover:underline"
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default FoodCard;
