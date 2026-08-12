'use client';

import { useState } from 'react';
import { Save, Globe, Mail, Shield, AlertCircle, Check } from 'lucide-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'DIY Smart Home Robotics',
    siteUrl: 'https://diysmarthomerobotics.com',
    contactEmail: 'homerobotics515@gmail.com',
    adsensePubId: '',
    googleVerification: '',
    newsletterEnabled: true,
    forumEnabled: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Configure your site settings</p>
      </div>

      {/* Site Settings */}
      <div className="bg-[#0c0c14] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-neon-cyan/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-neon-cyan" />
          </div>
          <h3 className="text-lg font-semibold text-white">Site Settings</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-neon-cyan/50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Site URL</label>
            <input
              type="url"
              value={settings.siteUrl}
              onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
              className="w-full px-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-neon-cyan/50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Contact Email</label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="w-full px-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-neon-cyan/50"
            />
          </div>
        </div>
      </div>

      {/* Google Services */}
      <div className="bg-[#0c0c14] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-neon-green/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-neon-green" />
          </div>
          <h3 className="text-lg font-semibold text-white">Google Services</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">AdSense Publisher ID</label>
            <input
              type="text"
              value={settings.adsensePubId}
              onChange={(e) => setSettings({ ...settings, adsensePubId: e.target.value })}
              placeholder="ca-pub-XXXXXXXXXXXXXXXX"
              className="w-full px-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Google Search Console Verification</label>
            <input
              type="text"
              value={settings.googleVerification}
              onChange={(e) => setSettings({ ...settings, googleVerification: e.target.value })}
              placeholder="your_verification_code_here"
              className="w-full px-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50"
            />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-[#0c0c14] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-neon-purple/10 flex items-center justify-center">
            <Mail className="w-5 h-5 text-neon-purple" />
          </div>
          <h3 className="text-lg font-semibold text-white">Features</h3>
        </div>
        <div className="space-y-3">
          {[
            { name: 'Newsletter', key: 'newsletterEnabled', desc: 'Allow users to subscribe to newsletter' },
            { name: 'Community Forum', key: 'forumEnabled', desc: 'Enable the community forum section' },
          ].map((feature) => (
            <div key={feature.key} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
              <div>
                <p className="text-sm font-medium text-white">{feature.name}</p>
                <p className="text-xs text-gray-500">{feature.desc}</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, [feature.key]: !settings[feature.key as keyof typeof settings] })}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  settings[feature.key as keyof typeof settings] ? 'bg-neon-cyan' : 'bg-white/10'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    settings[feature.key as keyof typeof settings] ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-neon-cyan text-dark-900 font-semibold rounded-xl hover:bg-neon-cyan/90 transition-colors text-sm flex items-center gap-2"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
        {saved && (
          <span className="text-neon-green text-sm flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Settings saved successfully
          </span>
        )}
      </div>
    </div>
  );
}