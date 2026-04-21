"use client";

import React, { useMemo, useState } from "react";
import {
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Shield,
  UserCheck,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/app/types/user";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const roleConfig = {
  admin: { color: "bg-red-100 text-red-700", icon: Shield },
  staff: { color: "bg-blue-100 text-blue-700", icon: UserCheck },
  student: { color: "bg-green-100 text-green-700", icon: GraduationCap },
  faculty: { color: "bg-purple-100 text-purple-700", icon: Briefcase },
};

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === "all" || user.role === filterRole;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, filterRole]);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filteredUsers]);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
          />
        </div>
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-gray-400" />
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-45 h-11!">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all" className="h-10 cursor-pointer">
                  {" "}
                  All Roles
                </SelectItem>
                <SelectItem value="admin" className="h-10 cursor-pointer">
                  {" "}
                  Admin
                </SelectItem>
                <SelectItem value="staff" className="h-10 cursor-pointer">
                  {" "}
                  Staff
                </SelectItem>
                <SelectItem value="student" className="h-10 cursor-pointer">
                  {" "}
                  Student
                </SelectItem>
                <SelectItem value="faculty" className="h-10 cursor-pointer">
                  {" "}
                  Faculty
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 rounded-lg">
              <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm rounded-l-lg">
                User
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">
                Role
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">
                Department
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">
                Balance
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">
                Status
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">
                Join Date
              </th>
              <th className="text-center py-4 px-4 font-semibold text-gray-600 text-sm rounded-r-lg">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user: User) => {
              const role = roleConfig[user.role];
              const RoleIcon = role.icon;
              return (
                <tr
                  key={user.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-linear-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {user.name}
                        </p>
                        <p className="text-gray-500 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`badge ${role.color} flex items-center gap-1 w-fit`}
                    >
                      <RoleIcon className="w-3 h-3" />
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {user.department}
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-gray-900 text-sm">
                      ${user.balance.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`badge text-nowrap ${user.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                    >
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${user.status === "active" ? "bg-green-500" : "bg-gray-400"}`}
                      ></span>
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500 text-nowrap">
                    {user.joinDate}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center">
                      <button
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors group cursor-pointer"
                        title="View"
                      >
                        <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                      </button>
                      <button
                        onClick={() => onEdit(user)}
                        className="p-2 hover:bg-yellow-50 rounded-lg transition-colors group cursor-pointer"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-gray-400 group-hover:text-yellow-500" />
                      </button>
                      <button
                        onClick={() => onDelete(user.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors group cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No users found</p>
          <p className="text-gray-300 text-sm mt-1">
            Try adjusting your search or filter
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-700">
            {filteredUsers.length === 0 ? 0 : startIndex + 1}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-gray-700">
            {Math.min(endIndex, filteredUsers.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-700">
            {filteredUsers.length}
          </span>{" "}
          users
        </p>

        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1.5 text-sm border border-gray-200 rounded-lg transition-colors ${
              currentPage === 1
                ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-50 text-gray-600 cursor-pointer"
            }`}
          >
            Previous
          </button>

          {/* Dynamic Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors cursor-pointer ${
                  currentPage === pageNum
                    ? "bg-blue-600 text-white" // Using generic blue, replace with bg-primary-600 if using custom tailwind config
                    : "border border-gray-200 hover:bg-gray-50 text-gray-600"
                }`}
              >
                {pageNum}
              </button>
            ),
          )}

          {/* Next Button */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1.5 text-sm border border-gray-200 rounded-lg transition-colors ${
              currentPage === totalPages || totalPages === 0
                ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-50 text-gray-600 cursor-pointer"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
