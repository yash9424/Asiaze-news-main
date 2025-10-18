 'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import styles from './page.module.css'

export default function AddNewsPage() {
  type FormData = {
    headline: string
    summary: string
    fullArticleLink: string
    category: string
    language: string
    tags: string[]
    currentTag: string
    source: string
    timestamp: string
  }

  const [formData, setFormData] = useState<FormData>({
    headline: '',
    summary: '',
    fullArticleLink: '',
    category: 'Politics',
    language: 'EN',
    tags: [],
    currentTag: '',
    source: '',
    timestamp: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement
    setFormData(prev => ({ ...prev, [name]: value } as unknown as FormData))
  }

  const handleAddTag = () => {
    if (formData.currentTag?.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.currentTag.trim()],
        currentTag: ''
      }))
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((tag: string) => tag !== tagToRemove)
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (e && 'preventDefault' in e) e.preventDefault()
    console.log('Form submitted:', formData)
    // TODO: wire to backend
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Add News</h1>
        </div>

        <div className={styles.content}>
          <form onSubmit={handleSubmit} className={styles.formGrid}>
            {/* Left column */}
            <div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Headline</label>
                <input
                  type="text"
                  name="headline"
                  value={formData.headline}
                  onChange={handleChange}
                  placeholder="Enter headline (max 100 chars)"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Summary</label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  placeholder="Enter summary (max ~60 words)"
                  className={styles.textarea}
                />
                <div className={styles.charCount}>0/60 words</div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Full Article Link</label>
                <input
                  type="text"
                  name="fullArticleLink"
                  value={formData.fullArticleLink}
                  onChange={handleChange}
                  placeholder="Enter full article link"
                  className={styles.input}
                />
              </div>

              <div className={styles.twoCol}>
                <div className={styles.w48}>
                  <label className={styles.label}>Category</label>
                  <select
                    name="category"
                    aria-label="Category"
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

                <div className={styles.w48}>
                  <label className={styles.label}>Language</label>
                  <select
                    name="language"
                    aria-label="Language"
                    value={formData.language}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="EN">EN</option>
                    <option value="HIN">HIN</option>
                    <option value="BEN">BEN</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Tags</label>
                <div className={styles.tagInputContainer}>
                  <input
                    type="text"
                    name="currentTag"
                    value={formData.currentTag}
                    onChange={handleChange}
                    placeholder="Type to add tags"
                    className={styles.tagInput}
                  />
                  <button type="button" onClick={handleAddTag} className={styles.addTagBtn}>
                    Add
                  </button>
                </div>
                <div className={styles.tagsContainer}>
                  {formData.tags.map((tag: string, index: number) => (
                    <span key={index} className={styles.tag}>
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className={styles.removeTagBtn}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div>
              <label className={styles.label}>Upload Image</label>
              <div className={styles.imageUploadWrap}>
                <div className={styles.imagePreview}>
                  <div className={styles.uploadPlaceholder}>Preview</div>
                </div>
                <button type="button" className={styles.uploadBtn}>
                  Upload/Replace Image
                </button>
              </div>

              <div className={styles.mt20}>
                <label className={styles.label}>Source</label>
                <input
                  type="text"
                  name="source"
                  aria-label="Source"
                  value={formData.source}
                  onChange={handleChange}
                  placeholder="Enter source"
                  className={styles.input}
                />
              </div>

              <div className={styles.mt16}>
                <label className={styles.label}>Timestamp</label>
                <input
                  type="datetime-local"
                  name="timestamp"
                  aria-label="Timestamp"
                  value={formData.timestamp}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
            </div>
          </form>

          <div className={styles.buttonRow}>
            <button type="button" className={styles.saveAsDraftBtn}>
              Save as Draft
            </button>
            <button type="submit" form="" onClick={handleSubmit} className={styles.publishBtn}>
              Publish
            </button>
            <Link href="/news" className={styles.cancelLink}>
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

