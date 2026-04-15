"use client";

import React, { useState } from "react";
import { X, UtensilsCrossed, Save } from "lucide-react";
import { MenuItem } from "@/public/data/mockdata";

interface AddMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<MenuItem  , "id" | "soldToday">) => void;
  editItem?: MenuItem | null;
}

export default function AddMenuModal({
  isOpen,
  onClose,
  onSave,
  editItem,
}: AddMenuModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Main Course",
    price: 0,
    available: true,
    image: "🍽️",
    description: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const emojis = [
    "🍔",
    "🍕",
    "🌯",
    "🥗",
    "🍝",
    "🍟",
    "🥤",
    "☕",
    "🧃",
    "🍰",
    "🍽️",
    "🥪",
    "🌮",
    "🍜",
    "🍣",
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="bg-gradient-to-r from-canteen-orange to-orange-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">
                {editItem ? "Edit Menu Item" : "Add Menu Item"}
              </h2>
              <p className="text-orange-200 text-xs">Fill in item details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Item Icon
            </label>
            <div className="flex flex-wrap gap-2">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData({ ...formData, image: emoji })}
                  className={`w-10 h-10 text-xl flex items-center justify-center rounded-lg transition-all ${
                    formData.image === emoji
                      ? "bg-primary-100 ring-2 ring-primary-500 scale-110"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input-field"
                placeholder="Item name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="input-field"
              >
                <option value="Main Course">Main Course</option>
                <option value="Sides">Sides</option>
                <option value="Salads">Salads</option>
                <option value="Beverages">Beverages</option>
                <option value="Desserts">Desserts</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Price ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Availability
              </label>
              <select
                value={formData.available.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    available: e.target.value === "true",
                  })
                }
                className="input-field"
              >
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="input-field resize-none"
              rows={3}
              placeholder="Brief description..."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-canteen-orange hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {editItem ? "Update Item" : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
