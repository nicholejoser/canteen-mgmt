"use client";

import React, { useState } from "react";
import { X, UserPlus, Save } from "lucide-react";
import { User } from "@/public/data/mockdata";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: Omit<User, "id" | "avatar">) => void;
  editUser?: User | null;
}

export default function AddUserModal({
  isOpen,
  onClose,
  onSave,
  editUser,
}: AddUserModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student" as User["role"],
    department: "",
    status: "active" as User["status"],
    balance: 0,
    joinDate: new Date().toISOString().split("T")[0],
  });

  //   useEffect(() => {
  //     if (editUser) {
  //       setFormData({
  //         name: editUser.name,
  //         email: editUser.email,
  //         role: editUser.role,
  //         department: editUser.department,
  //         status: editUser.status,
  //         balance: editUser.balance,
  //         joinDate: editUser.joinDate,
  //       });
  //     } else {
  //       setFormData({
  //         name: '',
  //         email: '',
  //         role: 'student',
  //         department: '',
  //         status: 'active',
  //         balance: 0,
  //         joinDate: new Date().toISOString().split('T')[0],
  //       });
  //     }
  //   }, [editUser, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">
                {editUser ? "Edit User" : "Add New User"}
              </h2>
              <p className="text-primary-200 text-xs">
                {editUser
                  ? "Update user information"
                  : "Fill in the details below"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input-field"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="input-field"
                placeholder="user@school.edu"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value as User["role"],
                  })
                }
                className="input-field"
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Department
              </label>
              <input
                type="text"
                required
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className="input-field"
                placeholder="e.g., Engineering"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as User["status"],
                  })
                }
                className="input-field"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Balance ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.balance}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    balance: parseFloat(e.target.value) || 0,
                  })
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Join Date
              </label>
              <input
                type="date"
                value={formData.joinDate}
                onChange={(e) =>
                  setFormData({ ...formData, joinDate: e.target.value })
                }
                className="input-field"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors text-sm"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-sm">
              <Save className="w-4 h-4" />
              {editUser ? "Update User" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
