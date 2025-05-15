import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Pencil, Trash2, Plus } from 'lucide-react';
import axios from 'axios';

interface AdminRole {
  _id: string;
  name: string;
  role: string;
  email_or_phone: string;
  password: string;
  created_at: string;
}

const AdminManager: React.FC = () => {
  const [roles, setRoles] = useState<AdminRole[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<AdminRole | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email_or_phone: '',
    password: ''
  });

  const API_URL = 'http://localhost:3001/admin-roles';

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await axios.get(API_URL);
      setRoles(res.data);
    } catch (err) {
      console.error('Error fetching roles:', err);
    }
  };

  const handleAddRole = async () => {
    try {
      const res = await axios.post(API_URL, formData);
      setRoles([res.data, ...roles]);
      setFormData({ name: '', role: '', email_or_phone: '', password: '' });
      setIsAddModalOpen(false);
    } catch (err) {
      console.error('Error adding role:', err);
    }
  };

  const handleEditRole = async () => {
    if (!currentRole) return;
    try {
      const res = await axios.put(`${API_URL}/${currentRole._id}`, formData);
      const updated = roles.map((r) => (r._id === currentRole._id ? res.data : r));
      setRoles(updated);
      setCurrentRole(null);
      setFormData({ name: '', role: '', email_or_phone: '', password: '' });
      setIsEditModalOpen(false);
    } catch (err) {
      console.error('Error updating role:', err);
    }
  };

  const handleDeleteRole = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setRoles(roles.filter((role) => role._id !== id));
    } catch (err) {
      console.error('Error deleting role:', err);
    }
  };

  const openEditModal = (role: AdminRole) => {
    setCurrentRole(role);
    setFormData({
      name: role.name,
      role: role.role,
      email_or_phone: role.email_or_phone,
      password: role.password
    });
    setIsEditModalOpen(true);
  };

  const renderFormFields = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Role</option>
          <option value="Super User">Super User</option>
          <option value="User">User</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email or Phone</label>
        <input
          type="text"
          value={formData.email_or_phone}
          onChange={(e) => setFormData({ ...formData, email_or_phone: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Roles List</h2>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Role
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">No</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email / Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Password</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Created At</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {roles.map((role, index) => (
                  <tr key={role._id}>
                    <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{role.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{role.role}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{role.email_or_phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{role.password}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {format(new Date(role.created_at), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => openEditModal(role)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteRole(role._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Role</h3>
            {renderFormFields()}
            <div className="mt-6 flex justify-end space-x-3">
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-md">
                Cancel
              </button>
              <button onClick={handleAddRole} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Add Role
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Role</h3>
            {renderFormFields()}
            <div className="mt-6 flex justify-end space-x-3">
              <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-md">
                Cancel
              </button>
              <button onClick={handleEditRole} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManager;
