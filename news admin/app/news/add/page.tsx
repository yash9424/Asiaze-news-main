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
    explanation: string
    fullArticleLink: string
    category: string
    languages: string[]
    currentLang: string
    translations: {
      EN: { headline: string; summary: string; explanation: string; fullArticleLink: string }
      HIN: { headline: string; summary: string; explanation: string; fullArticleLink: string }
      BEN: { headline: string; summary: string; explanation: string; fullArticleLink: string }
    }
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
    explanation: '',
    fullArticleLink: '',
    category: '',
    languages: [],
    currentLang: 'EN',
    translations: {
      EN: { headline: '', summary: '', explanation: '', fullArticleLink: '' },
      HIN: { headline: '', summary: '', explanation: '', fullArticleLink: '' },
      BEN: { headline: '', summary: '', explanation: '', fullArticleLink: '' }
    },
    tags: [],
    currentTag: '',
    source: '',
    timestamp: '',
    image: ''
  })

  const translateText = async (text: string, targetLang: string) => {
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLang })
      })
      const data = await res.json()
      return data.translatedText || text
    } catch (error) {
      console.error('Translation failed:', error)
      return text
    }
  }

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
    if (['headline', 'summary', 'explanation', 'fullArticleLink'].includes(name)) {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        translations: {
          ...prev.translations,
          [prev.currentLang]: {
            ...prev.translations[prev.currentLang as keyof typeof prev.translations],
            [name === 'fullArticleLink' ? 'fullArticleLink' : name]: value
          }
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value } as unknown as FormData))
    }
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
    
    if (!formData.headline || !formData.summary || !formData.category || formData.languages.length === 0) {
      alert('Please fill in all required fields and select at least one language')
      return
    }

    setLoading(true)
    try {
      const langMap: any = { 'EN': 'english', 'HIN': 'hindi', 'BEN': 'bengali' }
      
      // Build translations object with proper structure
      const translations: any = {}
      formData.languages.forEach(lang => {
        const langKey = lang as keyof typeof formData.translations
        const langName = langMap[lang] || lang.toLowerCase()
        translations[langName] = {
          title: formData.translations[langKey]?.headline || '',
          content: formData.translations[langKey]?.fullArticleLink || '',
          summary: formData.translations[langKey]?.summary || '',
          explanation: formData.translations[langKey]?.explanation || ''
        }
      })

      console.log('Languages:', formData.languages)
      console.log('Translations being saved:', translations)

      const languageNames = formData.languages.map(lang => langMap[lang] || lang.toLowerCase())
      
      const payload = {
        title: formData.translations[formData.languages[0] as keyof typeof formData.translations]?.headline || formData.headline,
        content: formData.translations[formData.languages[0] as keyof typeof formData.translations]?.fullArticleLink || formData.fullArticleLink,
        summary: formData.translations[formData.languages[0] as keyof typeof formData.translations]?.summary || formData.summary,
        explanation: formData.translations[formData.languages[0] as keyof typeof formData.translations]?.explanation || formData.explanation,
        image: formData.image,
        category: formData.category,
        tags: formData.tags,
        languages: languageNames,
        translations: translations,
        source: formData.source,
        status: status,
        publishedAt: status === 'published' ? (formData.timestamp || new Date().toISOString()) : null
      }
      
      console.log('Full payload:', JSON.stringify(payload, null, 2))

      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
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
          {formData.languages.length > 0 && (
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', borderBottom: '2px solid #e0e0e0', paddingBottom: '10px' }}>
              {formData.languages.map(lang => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      currentLang: lang,
                      headline: prev.translations[lang as keyof typeof prev.translations].headline,
                      summary: prev.translations[lang as keyof typeof prev.translations].summary,
                      explanation: prev.translations[lang as keyof typeof prev.translations].explanation,
                      fullArticleLink: prev.translations[lang as keyof typeof prev.translations].fullArticleLink
                    }))
                  }}
                  style={{
                    padding: '10px 20px',
                    border: 'none',
                    backgroundColor: formData.currentLang === lang ? '#e31e3a' : '#f0f0f0',
                    color: formData.currentLang === lang ? 'white' : '#333',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
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
                  rows={3}
                />
                <div className={styles.charCount}>0/60 words</div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Explanation (Detailed)</label>
                <textarea
                  name="explanation"
                  value={formData.explanation}
                  onChange={handleChange}
                  placeholder="Enter detailed explanation for users"
                  className={styles.textarea}
                  rows={5}
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
                  <label className={styles.label}>Languages</label>
                  <div style={{ display: 'flex', gap: '15px', marginTop: '8px' }}>
                    {['EN', 'HIN', 'BEN'].map(lang => (
                      <label key={lang} style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={formData.languages.includes(lang)}
                          onChange={async (e) => {
                            if (e.target.checked && !formData.languages.includes(lang)) {
                              let translatedHeadline, translatedSummary, translatedExplanation
                              
                              if (lang === 'EN') {
                                translatedHeadline = formData.headline
                                translatedSummary = formData.summary
                                translatedExplanation = formData.explanation
                              } else {
                                const targetLangCode = lang === 'HIN' ? 'hi' : 'bn'
                                translatedHeadline = formData.headline ? await translateText(formData.headline, targetLangCode) : ''
                                translatedSummary = formData.summary ? await translateText(formData.summary, targetLangCode) : ''
                                translatedExplanation = formData.explanation ? await translateText(formData.explanation, targetLangCode) : ''
                              }
                              
                              setFormData(prev => {
                                const uniqueLangs = [...new Set([...prev.languages, lang])]
                                return {
                                  ...prev,
                                  languages: uniqueLangs,
                                  translations: {
                                    ...prev.translations,
                                    [lang]: {
                                      headline: translatedHeadline,
                                      summary: translatedSummary,
                                      explanation: translatedExplanation,
                                      fullArticleLink: prev.fullArticleLink
                                    }
                                  }
                                }
                              })
                            } else if (!e.target.checked) {
                              setFormData(prev => ({
                                ...prev,
                                languages: prev.languages.filter(l => l !== lang)
                              }))
                            }
                          }}
                        />
                        <span>{lang}</span>
                      </label>
                    ))}
                  </div>
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

