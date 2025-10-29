 'use client'

import React, { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
    image: string
  }

  const router = useRouter()
  const [categories, setCategories] = useState<any[]>([])
  const [existingTags, setExistingTags] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [showTagDropdown, setShowTagDropdown] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    headline: '',
    summary: '',
    fullArticleLink: '',
    category: '',
    language: 'EN',
    tags: [],
    currentTag: '',
    source: '',
    timestamp: '',
    image: ''
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchTags()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      const activeCategories = (data.categories || []).filter((cat: any) => cat.isActive)
      setCategories(activeCategories)
      if (activeCategories.length > 0) {
        setFormData(prev => ({ ...prev, category: activeCategories[0]._id }))
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const fetchTags = async () => {
    try {
      const res = await fetch('/api/tags')
      const data = await res.json()
      setExistingTags(data.filter((tag: any) => tag.isActive))
    } catch (error) {
      console.error('Failed to fetch tags:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement
    setFormData(prev => ({ ...prev, [name]: value } as unknown as FormData))
  }

  const handleAddTag = async () => {
    const tagName = formData.currentTag?.trim()
    if (tagName && !formData.tags.includes(tagName)) {
      // Check if tag exists in database
      const tagExists = existingTags.find(t => t.name.toLowerCase() === tagName.toLowerCase())
      
      if (!tagExists) {
        // Create new tag in database
        try {
          await fetch('/api/tags', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: tagName, isActive: true })
          })
          fetchTags() // Refresh tags list
        } catch (error) {
          console.error('Failed to create tag:', error)
        }
      }
      
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagName],
        currentTag: ''
      }))
      setShowTagDropdown(false)
    }
  }

  const handleSelectTag = (tagName: string) => {
    if (!formData.tags.includes(tagName)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagName],
        currentTag: ''
      }))
    }
    setShowTagDropdown(false)
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((tag: string) => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>, status: string = 'published') => {
    if (e && 'preventDefault' in e) e.preventDefault()
    
    if (!formData.headline || !formData.summary || !formData.category) {
      alert('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.headline,
          content: formData.fullArticleLink,
          summary: formData.summary,
          image: formData.image,
          category: formData.category,
          tags: formData.tags,
          language: formData.language,
          source: formData.source,
          status: status,
          publishedAt: status === 'published' ? (formData.timestamp || new Date().toISOString()) : null
        })
      })

      if (res.ok) {
        alert(`News ${status} successfully!`)
        router.push('/news')
      } else {
        const error = await res.json()
        alert(`Failed to ${status} news: ${error.error}`)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to save news')
    } finally {
      setLoading(false)
    }
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
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
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
                <div style={{ position: 'relative' }}>
                  <div className={styles.tagInputContainer}>
                    <input
                      type="text"
                      name="currentTag"
                      value={formData.currentTag}
                      onChange={handleChange}
                      onFocus={() => setShowTagDropdown(true)}
                      onBlur={() => setTimeout(() => setShowTagDropdown(false), 200)}
                      placeholder="Type to add tags or select from dropdown"
                      className={styles.tagInput}
                    />
                    <button type="button" onClick={handleAddTag} className={styles.addTagBtn}>
                      Add
                    </button>
                    <button 
                      type="button" 
                      onClick={(e) => {
                        e.preventDefault()
                        setShowTagDropdown(!showTagDropdown)
                      }} 
                      className={styles.dropdownBtn}
                    >
                      ▼
                    </button>
                  </div>
                  {showTagDropdown && existingTags.length > 0 && (
                    <div className={styles.tagDropdown}>
                      {existingTags
                        .filter(tag => 
                          !formData.tags.includes(tag.name) &&
                          tag.name.toLowerCase().includes((formData.currentTag || '').toLowerCase())
                        )
                        .slice(0, 10)
                        .map(tag => (
                          <div 
                            key={tag._id} 
                            className={styles.tagDropdownItem}
                            onMouseDown={(e) => {
                              e.preventDefault()
                              handleSelectTag(tag.name)
                            }}
                          >
                            {tag.name}
                          </div>
                        ))
                      }
                      {existingTags.filter(tag => 
                        !formData.tags.includes(tag.name) &&
                        tag.name.toLowerCase().includes((formData.currentTag || '').toLowerCase())
                      ).length === 0 && (
                        <div className={styles.tagDropdownItem} style={{ color: '#999', cursor: 'default' }}>
                          No tags found
                        </div>
                      )}
                    </div>
                  )}
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
                  {formData.image ? (
                    <img src={formData.image} alt="Preview" className={styles.previewImage} />
                  ) : (
                    <div className={styles.uploadPlaceholder}>Preview</div>
                  )}
                </div>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  className={styles.uploadBtn}
                  onClick={() => document.getElementById('imageUpload')?.click()}
                >
                  {formData.image ? 'Replace Image' : 'Upload Image'}
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
            <button 
              type="button" 
              onClick={(e) => handleSubmit(e, 'draft')} 
              disabled={loading}
              className={styles.saveAsDraftBtn}
            >
              {loading ? 'Saving...' : 'Save as Draft'}
            </button>
            <button 
              type="submit" 
              onClick={(e) => handleSubmit(e, 'published')} 
              disabled={loading}
              className={styles.publishBtn}
            >
              {loading ? 'Publishing...' : 'Publish'}
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

