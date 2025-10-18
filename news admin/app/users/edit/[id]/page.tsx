'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

export default function EditUserPage({ params }: any) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '1234567890',
    role: 'User',
    status: true,
    dateRegistered: '2021-07-16'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleToggle = () => {
    setFormData(prev => ({ ...prev, status: !prev.status }))
  }

  const handleSave = () => {
    console.log('Save:', formData)
    router.push('/users')
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <h1 className={styles.title}>User Profile & Edit</h1>

        <div className={styles.content}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={styles.select}
              >
                <option>User</option>
                <option>Admin</option>
                <option>Moderator</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Status</label>
              <div 
                className={`${styles.toggle} ${formData.status ? styles.toggleActive : ''}`}
                onClick={handleToggle}
              >
                <div className={styles.toggleCircle}></div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Date Registered</label>
              <input
                type="text"
                name="dateRegistered"
                value={formData.dateRegistered}
                onChange={handleChange}
                className={styles.input}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className={styles.loginHistory}>
          <h2 className={styles.sectionTitle}>Login History</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Device</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2023-10-10 10:00 AM</td>
                <td>Chrome on Windows 10</td>
              </tr>
              <tr>
                <td>2023-09-28 09:45</td>
                <td>Safari on iOS</td>
              </tr>
              <tr>
                <td>2023-09-20 14:30</td>
                <td>Firefox on MacOS</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.buttonRow}>
          <button onClick={() => router.push('/users')} className={styles.cancelBtn}>Cancel</button>
          <button onClick={handleSave} className={styles.saveBtn}>Save Changes</button>
        </div>
      </div>
    </div>
  )
}
