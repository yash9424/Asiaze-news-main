'use client'

import Sidebar from '@/components/Sidebar'
import { useState } from 'react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.main}>
        <h1 style={styles.title}>Settings</h1>

        <div style={styles.tabs}>
          <button style={activeTab === 'general' ? styles.tabActive : styles.tab} onClick={() => setActiveTab('general')}>General Settings</button>
          <button style={activeTab === 'language' ? styles.tabActive : styles.tab} onClick={() => setActiveTab('language')}>Language Settings</button>
          <button style={activeTab === 'policies' ? styles.tabActive : styles.tab} onClick={() => setActiveTab('policies')}>Policies & Static Pages</button>
          <button style={activeTab === 'admin' ? styles.tabActive : styles.tab} onClick={() => setActiveTab('admin')}>Admin Users Management</button>
          <button style={activeTab === 'notifications' ? styles.tabActive : styles.tab} onClick={() => setActiveTab('notifications')}>Notifications Defaults</button>
        </div>

        <div style={styles.content}>
          <div style={styles.field}>
            <label style={styles.label}>Site/App Name</label>
            <input type="text" style={styles.input} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Logo Upload</label>
            <input type="text" style={styles.input} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Contact Email</label>
            <input type="text" style={styles.input} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Footer Text</label>
            <textarea style={styles.textarea}></textarea>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Default Language</label>
            <select style={styles.select}>
              <option>EN</option>
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Enable/Disable Language</label>
            <label style={styles.toggle}>
              <input type="checkbox" style={styles.checkbox} />
              <span style={styles.slider}></span>
            </label>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Privacy Policy</label>
            <textarea style={styles.textarea}></textarea>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Terms & Conditions</label>
            <textarea style={styles.textarea}></textarea>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>About Us</label>
            <textarea style={styles.textarea}></textarea>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Admin Users Management</label>
            <div style={styles.adminTable}>
              <div style={styles.adminHeader}>
                <span style={styles.adminCol}>Name</span>
                <span style={styles.adminCol}>Email</span>
                <span style={styles.adminCol}>Role</span>
                <span style={styles.adminCol}>Status</span>
                <button style={styles.addBtn}>Add New Admin</button>
              </div>
              <div style={styles.adminRow}>
                <span style={styles.adminCol}>John Doe</span>
                <span style={styles.adminCol}>john@example.com</span>
                <span style={styles.adminCol}>Super Admin</span>
                <span style={styles.adminCol}>Active</span>
                <div style={styles.adminActions}>
                  <button style={styles.editBtn}>Edit</button>
                  <button style={styles.deleteBtn}>Delete</button>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Default Notification Tone</label>
            <input type="text" style={styles.input} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Default Delivery Type</label>
            <select style={styles.select}>
              <option>Immediate</option>
            </select>
          </div>

          <div style={styles.buttons}>
            <button style={styles.saveBtn}>Save Changes</button>
            <button style={styles.cancelBtn}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  main: {
    marginLeft: '250px',
    flex: 1,
    padding: '30px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700' as const,
    marginBottom: '25px',
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '8px',
  },
  tab: {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  tabActive: {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: '#e5e7eb',
    fontSize: '14px',
    fontWeight: '600' as const,
    cursor: 'pointer',
    borderRadius: '5px',
  },
  content: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
  },
  field: {
    marginBottom: '25px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600' as const,
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #e5e7eb',
    borderRadius: '5px',
    fontSize: '14px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #e5e7eb',
    borderRadius: '5px',
    fontSize: '14px',
    minHeight: '100px',
    resize: 'vertical' as const,
  },
  select: {
    width: '100%',
    padding: '10px',
    border: '1px solid #e5e7eb',
    borderRadius: '5px',
    fontSize: '14px',
  },
  toggle: {
    position: 'relative' as const,
    display: 'inline-block',
    width: '50px',
    height: '24px',
  },
  checkbox: {
    opacity: 0,
    width: 0,
    height: 0,
  },
  slider: {
    position: 'absolute' as const,
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#e31e3a',
    borderRadius: '24px',
  },
  adminTable: {
    border: '1px solid #e5e7eb',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  adminHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr 1fr 1fr auto',
    padding: '15px',
    backgroundColor: '#f9fafb',
    fontWeight: '600' as const,
    fontSize: '14px',
    alignItems: 'center',
  },
  adminRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr 1fr 1fr auto',
    padding: '15px',
    borderTop: '1px solid #e5e7eb',
    fontSize: '14px',
    alignItems: 'center',
  },
  adminCol: {
    padding: '0 10px',
  },
  adminActions: {
    display: 'flex',
    gap: '10px',
  },
  addBtn: {
    backgroundColor: '#e31e3a',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600' as const,
    cursor: 'pointer',
  },
  editBtn: {
    backgroundColor: '#f3f4f6',
    color: '#000',
    padding: '6px 16px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '13px',
    cursor: 'pointer',
  },
  deleteBtn: {
    backgroundColor: '#f3f4f6',
    color: '#000',
    padding: '6px 16px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '13px',
    cursor: 'pointer',
  },
  buttons: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'flex-end',
    marginTop: '30px',
  },
  saveBtn: {
    backgroundColor: '#e31e3a',
    color: 'white',
    padding: '12px 30px',
    border: 'none',
    borderRadius: '25px',
    fontSize: '14px',
    fontWeight: '600' as const,
    cursor: 'pointer',
  },
  cancelBtn: {
    backgroundColor: '#f3f4f6',
    color: '#000',
    padding: '12px 30px',
    border: 'none',
    borderRadius: '25px',
    fontSize: '14px',
    fontWeight: '600' as const,
    cursor: 'pointer',
  },
}
