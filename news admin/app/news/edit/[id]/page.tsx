'use client'

import React, { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from '../../add/page.module.css'

export default function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [id, setId] = useState<string>('')
  const [categories, setCategories] = useState<any[]>([])
  const [existingTags, setExistingTags] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [showTagDropdown, setShowTagDropdown] = useState(false)
  const [formData, setFormData] = useState<any>({
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

  useEffect(() => {
    params.then(p => {
      setId(p.id)
      fetchCategories()
      fetchTags()
      fetchNews(p.id)
    })
  }, [])

  const fetchNews = async (newsId: string) => {
    try {
      const res = await fetch(`/api/news/${newsId}`)
      const data = await res.json()
      const news = data.news
      setFormData({
        headline: news.title || '',
        summary: news.summary || '',
        fullArticleLink: news.content || '',
        category: news.category?._id || '',
        language: news.language || 'EN',
        tags: news.tags?.map((t: any) => t.name) || [],
        currentTag: '',
        source: news.source || '',
        timestamp: news.publishedAt ? new Date(news.publishedAt).toISOString().slice(0, 16) : '',
        image: news.image || ''
      })
    } catch (error) {
      console.error('Failed to fetch news:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      const activeCategories = (data.categories || []).filter((cat: any) => cat.isActive)
      setCategories(activeCategories)
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev: any) => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleAddTag = async () => {
    const tagName = formData.currentTag?.trim()
    if (tagName && !formData.tags.includes(tagName)) {
      const tagExists = existingTags.find(t => t.name.toLowerCase() === tagName.toLowerCase())
      if (!tagExists) {
        try {
          await fetch('/api/tags', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: tagName, isActive: true })
          })
          fetchTags()
        } catch (error) {
          console.error('Failed to create tag:', error)
        }
      }
      setFormData((prev: any) => ({
        ...prev,
        tags: [...prev.tags, tagName],
        currentTag: ''
      }))
      setShowTagDropdown(false)
    }
  }

  const handleSelectTag = (tagName: string) => {
    if (!formData.tags.includes(tagName)) {
      setFormData((prev: any) => ({
        ...prev,
        tags: [...prev.tags, tagName],
        currentTag: ''
      }))
    }
    setShowTagDropdown(false)
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev: any) => ({
      ...prev,
      tags: prev.tags.filter((tag: string) => tag !== tagToRemove)
    }))
  }

  const handleUpdate = async () => {
    if (!formData.headline || !formData.summary || !formData.category) {
      alert('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/news/${id}`, {
        method: 'PUT',
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
          publishedAt: formData.timestamp || null
        })
      })

      if (res.ok) {
        alert('News updated successfully!')
        router.push('/news')
      } else {
        const error = await res.json()
        alert(`Failed to update news: ${error.error}`)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to update news')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Edit News</h1>
        </div>

        <div className={styles.content}>
          <div className={styles.formGrid}>
            <div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Headline</label>
                <input
                  type="text"
                  name="headline"
                  value={formData.headline}
                  onChange={handleChange}
                  placeholder="Enter headline"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Summary</label>
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
                  placeholder="Enter full article link"
                  className={styles.input}
                />
              </div>

              <div className={styles.twoCol}>
                <div className={styles.w48}>
                  <label className={styles.label}>Category</label>
                  <select
                    name="category"
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
                      placeholder="Type to add tags"
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

            <div>
              <label className={styles.label}>Current Image</label>
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
                  Replace Image
                </button>
              </div>

              <div className={styles.mt20}>
                <label className={styles.label}>Source</label>
                <input
                  type="text"
                  name="source"
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
                  value={formData.timestamp}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          <div className={styles.buttonRow}>
            <Link href="/news" className={styles.cancelLink}>
              Cancel
            </Link>
            <button 
              type="button" 
              onClick={handleUpdate} 
              disabled={loading}
              className={styles.publishBtn}
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
