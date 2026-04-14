'use client';

import React, { useState } from 'react';
import { User } from '@/data/mockData';
import { Edit, Trash2, Eye, Search, Filter, MoreVertical, Shield, UserCheck, GraduationCap, Briefcase } from 'lucide-react';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const roleConfig = {
  admin: { color: 'bg-red-100 text-red-700', icon: Shield },
  staff: { color: 'bg-blue-100 text-blue-700', icon: UserCheck },
  student: { color: 'bg-green-100 text-green-700', icon: GraduationCap },
  faculty: { color: 'bg-purple-100 text-purple-700', icon: Briefcase },
};

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="card">
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
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 rounded-lg">
              <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm rounded-l-lg">User</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Role</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Department</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Balance</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Status</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Join Date</th>
              <th className="text-center py-4 px-4 font-semibold text-gray-600 text-sm rounded-r-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              const role = roleConfig[user.role];
              const RoleIcon = role.icon;
              return (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                        <p className="text-gray-500 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`badge ${role.color} flex items-center gap-1 w-fit`}>
                      <RoleIcon className="w-3 h-3" />
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{user.department}</td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-gray-900 text-sm">${user.balance.toFixed(2)}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`badge ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">{user.joinDate}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                        title="View"
                      >
                        <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                      </button>
                      <button
                        onClick={() => onEdit(user)}
                        className="p-2 hover:bg-yellow-50 rounded-lg transition-colors group"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-gray-400 group-hover:text-yellow-500" />
                      </button>
                      <button
                        onClick={() => onDelete(user.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
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
          <p className="text-gray-300 text-sm mt-1">Try adjusting your search or filter</p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-700">{filteredUsers.length}</span> of <span className="font-semibold text-gray-700">{users.length}</span> users
        </p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">Previous</button>
          <button className="px-3 py-1.5 text-sm bg-primary-600 text-white rounded-lg">1</button>
          <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">2</button>
          <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">Next</button>
        </div>
      </div>
    </div>
  );
}