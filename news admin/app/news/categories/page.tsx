'use client'

import Sidebar from '@/components/Sidebar'
import { useState } from 'react'
import styles from './page.module.css'

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Politics', labels: { english: 'Politics', hindi: 'राजनीति', bengali: 'রাজনীতি' }, status: 'Active', visible: true },
    { id: 2, name: 'Sports', labels: { english: 'Sports', hindi: 'खेल', bengali: 'ক্রীড়া' }, status: 'Inactive', visible: true },
    { id: 3, name: 'Business', labels: { english: 'Business', hindi: 'व्यापार', bengali: 'ব্যবসা' }, status: 'Active', visible: true }
  ])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', english: '', hindi: '', bengali: '', status: 'Active' })

  const toggleVisibility = (id: number) => {
    setCategories(categories.map(cat => cat.id === id ? { ...cat, visible: !cat.visible } : cat))
  }

  const handleEdit = (cat: any) => {
    setEditingId(cat.id)
    setFormData({ name: cat.name, english: cat.labels.english, hindi: cat.labels.hindi, bengali: cat.labels.bengali, status: cat.status })
    setShowModal(true)
  }

  const handleSubmit = () => {
    if (editingId) {
      setCategories(categories.map(cat => cat.id === editingId ? {
        ...cat,
        name: formData.name,
        labels: { english: formData.english, hindi: formData.hindi, bengali: formData.bengali },
        status: formData.status
      } : cat))
    } else {
      const newCategory = {
        id: categories.length + 1,
        name: formData.name,
        labels: { english: formData.english, hindi: formData.hindi, bengali: formData.bengali },
        status: formData.status,
        visible: true
      }
      setCategories([...categories, newCategory])
    }
    setShowModal(false)
    setEditingId(null)
    setFormData({ name: '', english: '', hindi: '', bengali: '', status: 'Active' })
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Manage Categories</h1>
          <button className={styles.addBtn} onClick={() => setShowModal(true)}>+ Add Category</button>
        </div>

        <div className={styles.content}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Language Labels</th>
                <th>Status</th>
                <th>Visibility</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id}>
                  <td>{cat.name}</td>
                  <td>English: {cat.labels.english}, Hindi: {cat.labels.hindi}, Bengali: {cat.labels.bengali}</td>
                  <td>
                    <span className={cat.status === 'Active' ? styles.statusActive : styles.statusInactive}>
                      {cat.status}
                    </span>
                  </td>
                  <td>
                    <label className={styles.toggle}>
                      <input type="checkbox" checked={cat.visible} onChange={() => toggleVisibility(cat.id)} />
                      <span className={styles.slider}></span>
                    </label>
                  </td>
                  <td>
                    <button className={styles.iconBtn} onClick={() => handleEdit(cat)}>✏️</button>
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
              <h2 className={styles.modalTitle}>{editingId ? 'Edit Category' : 'Add New Category'}</h2>
              <div className={styles.formGroup}>
                <label>Category Name</label>
                <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className={styles.formGroup}>
                <label>English Label</label>
                <input value={formData.english} onChange={(e) => setFormData({...formData, english: e.target.value})} />
              </div>
              <div className={styles.formGroup}>
                <label>Hindi Label</label>
                <input value={formData.hindi} onChange={(e) => setFormData({...formData, hindi: e.target.value})} />
              </div>
              <div className={styles.formGroup}>
                <label>Bengali Label</label>
                <input value={formData.bengali} onChange={(e) => setFormData({...formData, bengali: e.target.value})} />
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
                <button className={styles.saveBtn} onClick={handleSubmit}>{editingId ? 'Update Category' : 'Save Category'}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
