'use client'

import Sidebar from '@/components/Sidebar'
import { useState } from 'react'
import styles from './page.module.css'

export default function TagsPage() {
  const [tags, setTags] = useState([
    { id: 1, name: 'Breaking', status: 'Active', dateCreated: '2023-10-01' },
    { id: 2, name: 'Trending', status: 'Inactive', dateCreated: '2023-09-15' },
    { id: 3, name: 'Elections', status: 'Active', dateCreated: '2023-08-20' }
  ])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', status: 'Active' })

  const handleEdit = (tag: any) => {
    setEditingId(tag.id)
    setFormData({ name: tag.name, status: tag.status })
    setShowModal(true)
  }

  const handleSubmit = () => {
    if (editingId) {
      setTags(tags.map(tag => tag.id === editingId ? { ...tag, name: formData.name, status: formData.status } : tag))
    } else {
      const newTag = {
        id: tags.length + 1,
        name: formData.name,
        status: formData.status,
        dateCreated: new Date().toISOString().split('T')[0]
      }
      setTags([...tags, newTag])
    }
    setShowModal(false)
    setEditingId(null)
    setFormData({ name: '', status: 'Active' })
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Manage Tags</h1>
          <button className={styles.addBtn} onClick={() => setShowModal(true)}>+ Add Tag</button>
        </div>

        <div className={styles.content}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tag Name</th>
                <th>Status</th>
                <th>Date Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tags.map(tag => (
                <tr key={tag.id}>
                  <td>{tag.name}</td>
                  <td>
                    <span className={tag.status === 'Active' ? styles.statusActive : styles.statusInactive}>
                      {tag.status}
                    </span>
                  </td>
                  <td>{tag.dateCreated}</td>
                  <td>
                    <button className={styles.iconBtn} onClick={() => handleEdit(tag)}>✏️</button>
                    <button className={styles.iconBtn}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2 className={styles.modalTitle}>{editingId ? 'Edit Tag' : 'Add New Tag'}</h2>
              <div className={styles.formGroup}>
                <label>Tag Name</label>
                <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className={styles.formGroup}>
                <label>Status</label>
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className={styles.modalButtons}>
                <button className={styles.cancelBtn} onClick={() => { setShowModal(false); setEditingId(null); }}>Cancel</button>
                <button className={styles.saveBtn} onClick={handleSubmit}>{editingId ? 'Update Tag' : 'Save Tag'}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
