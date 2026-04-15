"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  UserPlus,
  Download,
  Upload,
  Users as UsersIcon,
  Shield,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import Header from "../components/Header";
import UserTable from "../components/UserTable";
import AddUserModal from "../components/AddUserModal";
import { User } from "../types/user";
import { toast } from "sonner";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const hasFetchUser = useRef<boolean>(false);
  useEffect(() => {
    if (hasFetchUser.current) return;
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users", { method: "GET" });
        const data = await res.json();
        setUsers(data);
        toast.success("Users fetched successfully");
      } catch (error) {
        toast.error("Unable to fetch users.");
        console.log(error);
      }
    };
    fetchUsers();
    hasFetchUser.current = true;
  }, []);
  const handleAddUser = async (userData: Omit<User, "id" | "avatar">) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const savedUser = await res.json();
      setUsers((prev) => [...prev, savedUser]);
      toast.success("New user created successfully");
    } catch (error) {
      toast.error("Unable to add new user.");
      console.log("Server error:", error);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleUpdateUser = (userData: Omit<User, "id" | "avatar">) => {
    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                ...userData,
                avatar: userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase(),
              }
            : u,
        ),
      );
      setEditingUser(null);
    }
  };

  const handleDeleteUser = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const adminCount = useMemo(
    () => users.filter((u) => u.role === "admin").length,
    [users],
  );

  const staffCount = useMemo(
    () => users.filter((u) => u.role === "staff").length,
    [users],
  );

  const studentCount = useMemo(
    () => users.filter((u) => u.role === "student").length,
    [users],
  );

  const facultyCount = useMemo(
    () => users.filter((u) => u.role === "faculty").length,
    [users],
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="User Management"
        subtitle="Manage all canteen users, roles, and permissions"
      />

      <div className="p-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <UsersIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              <p className="text-sm text-gray-500">Total Users</p>
            </div>
          </div>
          <div className="card flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {adminCount + staffCount}
              </p>
              <p className="text-sm text-gray-500">Admin & Staff</p>
            </div>
          </div>
          <div className="card flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{studentCount}</p>
              <p className="text-sm text-gray-500">Students</p>
            </div>
          </div>
          <div className="card flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{facultyCount}</p>
              <p className="text-sm text-gray-500">Faculty</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              className="btn-primary"
              onClick={() => {
                setEditingUser(null);
                setIsModalOpen(true);
              }}
            >
              <UserPlus className="w-4 h-4" />
              Add User
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <Upload className="w-4 h-4" />
              Import
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* User Table */}
        <UserTable
          users={users}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />

        {/* Modal */}
        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingUser(null);
          }}
          onSave={editingUser ? handleUpdateUser : handleAddUser}
          editUser={editingUser}
        />
      </div>
    </div>
  );
}
