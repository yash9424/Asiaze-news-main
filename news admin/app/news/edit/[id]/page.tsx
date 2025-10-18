'use client'

import React, { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import { useRouter } from 'next/navigation'
import styles from '../page.module.css'

export default function EditNewsPage({ params }: any) {
  const router = useRouter()
  const [formData, setFormData] = useState<any>({
    headline: '',
    summary: '',
    fullArticleLink: '',
    category: '',
    language: 'English',
    source: '',
    timestamp: '',
    imageUrl: ''
  })

  useEffect(() => {
    // TODO: fetch existing news by id and setFormData
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleUpdate = () => {
    console.log('Update payload', formData)
    // TODO: call update API and navigate on success
    router.push('/news')
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Edit News</h2>
            <div className={styles.formGroup}>
              <label htmlFor="headline">Headline</label>
              <input id="headline" name="headline" value={formData.headline} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="summary">Summary</label>
              <textarea id="summary" name="summary" value={formData.summary} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="fullArticleLink">Full Article Link</label>
              <input id="fullArticleLink" name="fullArticleLink" value={formData.fullArticleLink} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="category">Category</label>
              <input id="category" name="category" value={formData.category} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="language">Language</label>
              <select id="language" name="language" value={formData.language} onChange={handleChange}>
                <option>English</option>
                <option>Hindi</option>
                <option>Bengali</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="source">Source</label>
              <input id="source" name="source" value={formData.source} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="timestamp">Timestamp</label>
              <input id="timestamp" name="timestamp" type="datetime-local" value={formData.timestamp} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="imageUrl">Image URL</label>
              <input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
            </div>
            <div className={styles.modalButtons}>
              <button className={styles.cancelBtn} onClick={() => router.push('/news')}>Cancel</button>
              <button className={styles.saveBtn} onClick={handleUpdate}>Update News</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}