import { useEffect, useState } from 'react';
import { Pencil, Trash2, X } from 'lucide-react';
import axios from 'axios';

interface AdminFormData {
  name: string;
  role: 'SuperAdmin';
  email: string;
  password: string;
  phone: string;
}

interface AdminUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  createdAt?: string;
}

const AdminManager = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState<AdminFormData>({
    name: '',
    role: 'SuperAdmin',
    email: '',
    password: '',
    phone: ''
  });
  const [admins, setAdmins] = useState<AdminUser[]>([]);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/admins');
      setAdmins(res.data);
    } catch (err) {
      console.error('Failed to fetch admins', err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/auth/admins/${editId}`, formData);
        alert('Admin updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/auth/register', formData);
        alert('Admin user created successfully!');
      }

      setShowAddModal(false);
      setFormData({ name: '', role: 'SuperAdmin', email: '', password: '', phone: '' });
      setEditId(null);
      fetchAdmins();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to submit');
    }
  };

  const handleEdit = (admin: AdminUser) => {
    setFormData({
      name: admin.name,
      role: 'SuperAdmin',
      email: admin.email,
      password: '',
      phone: admin.phone || ''
    });
    setEditId(admin._id);
    setShowAddModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/auth/admins/${id}`);
      fetchAdmins();
    } catch (err) {
      console.error('Failed to delete admin', err);
      alert('Failed to delete');
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Roles List</h2>
            <button 
              onClick={() => {
                setFormData({ name: '', role: 'SuperAdmin', email: '', password: '', phone: '' });
                setEditId(null);
                setShowAddModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
            >
              <span>+</span>
              <span>Add Role</span>
            </button>
          </div>

          {admins.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">No</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Phone</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Created At</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {admins.map((admin, index) => (
                    <tr key={admin._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 text-sm">{admin.name}</td>
                      <td className="px-6 py-4 text-sm">{admin.role}</td>
                      <td className="px-6 py-4 text-sm">{admin.email}</td>
                      <td className="px-6 py-4 text-sm">{admin.phone || '-'}</td>
                      <td className="px-6 py-4 text-sm">{admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : '-'}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-3">
                          <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEdit(admin)}>
                            <Pencil size={18} />
                          </button>
                          <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(admin._id)}>
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-sm text-gray-500">User data is stored in database and will appear here once fetched.</div>
          )}
        </div>
      </div>

      {/* Add/Edit Role Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">{editId ? 'Edit Role' : 'Add New Role'}</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select name="role" value={formData.role} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required>
                    <option value="SuperAdmin">Super Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
                </div>
                {!editId && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{editId ? 'Update' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManager;
