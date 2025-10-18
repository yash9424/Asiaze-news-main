'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

export default function EditReelPage({ params }: any) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: 'Current Reel Title',
    summary: 'Current summary text, limited to 60 words.',
    fullArticleLink: 'https://currentarticlelink.com',
    category: 'Current Category',
    language: 'EN',
    tags: ['Tag1', 'Tag2', 'Tag3'],
    sourceName: 'Current Source Name',
    duration: '00:02:30',
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

  const handleUpdate = () => {
    console.log('Update:', formData)
    router.push('/reels')
  }

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
                  placeholder="Current Reel Title"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Summary/Caption</label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  placeholder="Current summary text, limited to 60 words."
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
                  placeholder="https://currentarticlelink.com"
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
                  <option>Current Category</option>
                  <option>Politics</option>
                  <option>Entertainment</option>
                  <option>Finance</option>
                  <option>Sports</option>
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
                <label className={styles.label}>Current Video</label>
                <div className={styles.videoPreview}>
                  <div className={styles.previewText}>Video Preview</div>
                </div>
                <button className={styles.replaceBtn}>Replace Video</button>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Current Thumbnail</label>
                <div className={styles.thumbnailPreview}>
                  <div className={styles.previewText}>Thumbnail Preview</div>
                </div>
                <button className={styles.replaceBtn}>Replace Thumbnail</button>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Source Name</label>
                <input
                  type="text"
                  name="sourceName"
                  value={formData.sourceName}
                  onChange={handleChange}
                  placeholder="Current Source Name"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="00:02:30"
                  className={styles.input}
                />
              </div>

              <div className={styles.toggleRow}>
                <div className={styles.toggleGroup}>
                  <label className={styles.label}>Featured/Breaking</label>
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
          </div>

          <div className={styles.buttonRow}>
            <button onClick={() => router.push('/reels')} className={styles.cancelBtn}>Cancel</button>
            <button onClick={handleUpdate} className={styles.updateBtn}>Update</button>
          </div>
        </div>
      </div>
    </div>
  )
}
