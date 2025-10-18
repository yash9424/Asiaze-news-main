'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

export default function AddReelPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    fullArticleLink: '',
    category: 'Politics',
    language: 'EN',
    tags: ['#Politics', '#Finance', '#Entertainment'],
    featured: true,
    enableComments: true
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleToggle = (field: 'featured' | 'enableComments') => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const handleCancel = () => router.push('/reels')
  const handleSaveDraft = () => console.log('Save draft:', formData)
  const handlePublish = () => console.log('Publish:', formData)

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.formGrid}>
            <div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Reel Title/Headline</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Summary/Caption</label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  placeholder="Enter summary"
                  className={styles.textarea}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Full Article Link</label>
                <input
                  type="text"
                  name="fullArticleLink"
                  value={formData.fullArticleLink}
                  onChange={handleChange}
                  placeholder="Enter URL"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="Politics">Politics</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Finance">Finance</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Language</label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="EN">EN</option>
                  <option value="HIN">HIN</option>
                  <option value="BEN">BEN</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Tags</label>
                <div className={styles.tagsContainer}>
                  {formData.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Upload Video</label>
                <div className={styles.uploadBox}>
                  <div className={styles.uploadContent}>
                    <div className={styles.uploadText}>Drag & drop video here or click to browse</div>
                    <div className={styles.videoPreview}>
                      <img src="/placeholder-video.jpg" alt="Preview" className={styles.previewImg} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Upload Thumbnail (Optional)</label>
                <div className={styles.thumbnailBox}>
                  <div className={styles.uploadIcon}>⬆</div>
                  <div className={styles.thumbnailText}>Click to upload thumbnail</div>
                </div>
              </div>

              <div className={styles.toggleGroup}>
                <label className={styles.label}>Featured</label>
                <div 
                  className={`${styles.toggle} ${formData.featured ? styles.toggleActive : ''}`}
                  onClick={() => handleToggle('featured')}
                >
                  <div className={styles.toggleCircle}></div>
                </div>
              </div>

              <div className={styles.toggleGroup}>
                <label className={styles.label}>Enable Comments</label>
                <div 
                  className={`${styles.toggle} ${formData.enableComments ? styles.toggleActive : ''}`}
                  onClick={() => handleToggle('enableComments')}
                >
                  <div className={styles.toggleCircle}></div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.buttonRow}>
            <button onClick={handleCancel} className={styles.cancelBtn}>Cancel</button>
            <button onClick={handleSaveDraft} className={styles.draftBtn}>Save Draft</button>
            <button onClick={handlePublish} className={styles.publishBtn}>Publish</button>
          </div>
        </div>
      </div>
    </div>
  )
}
