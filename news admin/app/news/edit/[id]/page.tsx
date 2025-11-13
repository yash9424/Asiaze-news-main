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
      
      console.log('Fetched news from DB:', news)
      console.log('Languages from DB:', news.languages)
      console.log('Translations from DB:', news.translations)
      
      const langs = news.languages || ['EN']
      const currentLang = langs[0]
      
      const translations: any = {
        EN: {
          title: news.translations?.EN?.title || news.title || '',
          content: news.translations?.EN?.content || news.content || '',
          summary: news.translations?.EN?.summary || news.summary || '',
          explanation: news.translations?.EN?.explanation || news.explanation || ''
        },
        HIN: {
          title: news.translations?.HIN?.title || '',
          content: news.translations?.HIN?.content || '',
          summary: news.translations?.HIN?.summary || '',
          explanation: news.translations?.HIN?.explanation || ''
        },
        BEN: {
          title: news.translations?.BEN?.title || '',
          content: news.translations?.BEN?.content || '',
          summary: news.translations?.BEN?.summary || '',
          explanation: news.translations?.BEN?.explanation || ''
        }
      }
      
      console.log('Processed translations:', translations)
      console.log('Languages to set:', langs)
      
      const formDataToSet = {
        headline: translations[currentLang]?.title || '',
        summary: translations[currentLang]?.summary || '',
        explanation: translations[currentLang]?.explanation || '',
        fullArticleLink: translations[currentLang]?.content || '',
        category: news.category?._id || '',
        languages: langs,
        currentLang: currentLang,
        translations: translations,
        tags: news.tags?.map((t: any) => t.name) || [],
        currentTag: '',
        source: news.source || '',
        timestamp: news.publishedAt ? new Date(news.publishedAt).toISOString().slice(0, 16) : '',
        image: news.image || ''
      }
      
      console.log('Setting formData with languages:', formDataToSet.languages)
      setFormData(formDataToSet)
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
        setFormData((prev: any) => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (['headline', 'summary', 'explanation', 'fullArticleLink'].includes(name)) {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
        translations: {
          ...prev.translations,
          [prev.currentLang]: {
            ...prev.translations[prev.currentLang],
            [name === 'headline' ? 'title' : name === 'fullArticleLink' ? 'content' : name]: value
          }
        }
      }))
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }))
    }
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
    if (!formData.headline || !formData.summary || !formData.category || formData.languages.length === 0) {
      alert('Please fill in all required fields and select at least one language')
      return
    }

    setLoading(true)
    try {
      // Build translations object with proper structure
      const translations: any = {}
      formData.languages.forEach((lang: string) => {
        translations[lang] = {
          title: formData.translations[lang]?.title || '',
          content: formData.translations[lang]?.content || '',
          summary: formData.translations[lang]?.summary || '',
          explanation: formData.translations[lang]?.explanation || ''
        }
      })

      console.log('Edit - Languages:', formData.languages)
      console.log('Edit - Translations being saved:', translations)

      const payload = {
        title: formData.translations[formData.languages[0]]?.title || formData.headline,
        content: formData.translations[formData.languages[0]]?.content || formData.fullArticleLink,
        summary: formData.translations[formData.languages[0]]?.summary || formData.summary,
        explanation: formData.translations[formData.languages[0]]?.explanation || formData.explanation,
        image: formData.image,
        category: formData.category,
        tags: formData.tags,
        languages: formData.languages,
        translations: translations,
        source: formData.source,
        publishedAt: formData.timestamp || null
      }
      
      console.log('Edit - Full payload:', JSON.stringify(payload, null, 2))

      const res = await fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      console.log('Response status:', res.status)
      const responseData = await res.json()
      console.log('Response data:', responseData)

      if (res.ok) {
        alert('News updated successfully!')
        router.push('/news')
      } else {
        alert(`Failed to update news: ${responseData.error}`)
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
          {formData.languages.length > 0 && (
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', borderBottom: '2px solid #e0e0e0', paddingBottom: '10px' }}>
              {formData.languages.map((lang: string) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    setFormData((prev: any) => ({
                      ...prev,
                      currentLang: lang,
                      headline: prev.translations[lang].title || '',
                      summary: prev.translations[lang].summary || '',
                      explanation: prev.translations[lang].explanation || '',
                      fullArticleLink: prev.translations[lang].content || ''
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
                  rows={3}
                />
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
                              
                              setFormData((prev: any) => {
                                const uniqueLangs = [...new Set([...prev.languages, lang])]
                                return {
                                  ...prev,
                                  languages: uniqueLangs,
                                  translations: {
                                    ...prev.translations,
                                    [lang]: {
                                      title: translatedHeadline,
                                      summary: translatedSummary,
                                      explanation: translatedExplanation,
                                      content: prev.fullArticleLink
                                    }
                                  }
                                }
                              })
                            } else if (!e.target.checked) {
                              setFormData((prev: any) => ({
                                ...prev,
                                languages: prev.languages.filter((l: string) => l !== lang)
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
