import React, { useState } from 'react';
import EditProfile from './EditProfile';
import Preferences from './Preferences';
import Security from './Security';

type Tab = 'profile' | 'preferences' | 'security';

const Settings = () => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'profile'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            Edit Profile
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'preferences'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            Preferences
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'security'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            Security
          </button>
        </nav>
      </div>

      <div>
        {activeTab === 'profile' && <EditProfile />}
        {activeTab === 'preferences' && <Preferences />}
        {activeTab === 'security' && <Security />}
      </div>
    </div>
  );
};

export default Settings;