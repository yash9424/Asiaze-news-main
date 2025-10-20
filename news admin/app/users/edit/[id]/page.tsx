'use client'

import React, { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

export default function EditUserPage({ params }: any) {
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    isActive: true,
    dateRegistered: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initParams = async () => {
      const resolvedParams = await params
      setUserId(resolvedParams.id)
    }
    initParams()
  }, [params])

  useEffect(() => {
    if (!userId) return

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${userId}`)
        const data = await res.json()
        
        if (res.ok && data.user) {
          setFormData({
            name: data.user.name || '',
            email: data.user.email || '',
            phone: data.user.phone || '',
            role: data.user.role || 'user',
            isActive: data.user.isActive !== false,
            dateRegistered: data.user.createdAt ? new Date(data.user.createdAt).toISOString().split('T')[0] : ''
          })
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleToggle = () => {
    setFormData(prev => ({ ...prev, isActive: !prev.isActive }))
  }

  const handleSave = async () => {
    if (!userId) return

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          isActive: formData.isActive
        })
      })

      if (res.ok) {
        alert('User updated successfully!')
        router.push('/users')
      } else {
        alert('Failed to update user')
      }
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.main}>
          <h1 className={styles.title}>Loading...</h1>
        </div>
      </div>
    )
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
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Status</label>
              <div 
                className={`${styles.toggle} ${formData.isActive ? styles.toggleActive : ''}`}
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
