'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { ImageUploader } from '@/components/ui/ImageUploader';
import { RichTextEditor } from '@/components/admin/ui/RichTextEditor';

interface CMSClientProps {
  initialData?: any;
}

export default function CMSClient({ initialData }: CMSClientProps) {
  const [activeTab, setActiveTab] = useState('website');
  const [viewState, setViewState] = useState<'list' | 'edit'>('list');
  const [editItem, setEditItem] = useState<any>(null);
  const [deleteItem, setDeleteItem] = useState<{ id: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [data, setData] = useState<{
    websiteSettings: any;
    heroBanners: any[];
    videoContent: any[];
    staticPages: any[];
    seoSettings: any[];
  }>({
    websiteSettings: null,
    heroBanners: [],
    videoContent: [],
    staticPages: [],
    seoSettings: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [websiteRes, heroRes, videoRes, staticRes, seoRes] = await Promise.all([
        fetch('/api/admin/cms/website-settings').then(r => r.json()),
        fetch('/api/admin/cms/hero-banners').then(r => r.json()),
        fetch('/api/admin/cms/video-content').then(r => r.json()),
        fetch('/api/admin/cms/static-pages').then(r => r.json()),
        fetch('/api/admin/cms/seo-settings').then(r => r.json()),
      ]);

      setData({
        websiteSettings: websiteRes.data || {},
        heroBanners: heroRes.data || [],
        videoContent: videoRes.data || [],
        staticPages: staticRes.data || [],
        seoSettings: seoRes.data || [],
      });
    } catch (error) {
      console.error('Failed to fetch CMS data', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const startEdit = (item: any = null) => {
    setEditItem(item || {});
    setViewState('edit');
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let url = '';
      let method = 'PUT';
      
      const payload: any = { ...editItem };

      if (activeTab === 'website') {
        url = '/api/admin/cms/website-settings';
      } else if (activeTab === 'hero') {
        url = editItem.id ? `/api/admin/cms/hero-banners/${editItem.id}` : '/api/admin/cms/hero-banners';
        method = editItem.id ? 'PUT' : 'POST';
      } else if (activeTab === 'video') {
        url = editItem.id ? `/api/admin/cms/video-content/${editItem.id}` : '/api/admin/cms/video-content';
        method = editItem.id ? 'PUT' : 'POST';
      } else if (activeTab === 'pages') {
        url = editItem.id ? `/api/admin/cms/static-pages/${editItem.id}` : '/api/admin/cms/static-pages';
        method = editItem.id ? 'PUT' : 'POST';
      } else if (activeTab === 'seo') {
        url = '/api/admin/cms/seo-settings';
        method = 'PUT';
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to save');
      
      await fetchData();
      setViewState('list');
    } catch (err: any) {
      alert(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    setIsSubmitting(true);
    try {
      let url = '';
      if (activeTab === 'hero') url = `/api/admin/cms/hero-banners/${deleteItem.id}`;
      else if (activeTab === 'video') url = `/api/admin/cms/video-content/${deleteItem.id}`;
      else if (activeTab === 'pages') url = `/api/admin/cms/static-pages/${deleteItem.id}`;
      else if (activeTab === 'seo') url = `/api/admin/cms/seo-settings/${deleteItem.id}`;

      if (url) {
        const res = await fetch(url, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete');
        await fetchData();
      }
      setDeleteItem(null);
    } catch (err: any) {
      alert(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormFields = () => {
    if (activeTab === 'website') return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Site Name</Label>
          <Input value={editItem.siteName || ''} onChange={e => setEditItem({ ...editItem, siteName: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Logo Image</Label>
          <ImageUploader 
            maxImages={1}
            images={editItem.logoUrl ? [{ url: editItem.logoUrl, isPrimary: true, displayOrder: 0 }] : []}
            onChange={(imgs) => setEditItem({ ...editItem, logoUrl: imgs[0]?.url || '' })} 
          />
        </div>
        <div className="space-y-2">
          <Label>Primary Phone</Label>
          <Input value={editItem.primaryPhone || ''} onChange={e => setEditItem({ ...editItem, primaryPhone: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>WhatsApp</Label>
          <Input value={editItem.whatsapp || ''} onChange={e => setEditItem({ ...editItem, whatsapp: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" value={editItem.email || ''} onChange={e => setEditItem({ ...editItem, email: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Address</Label>
          <Input value={editItem.address || ''} onChange={e => setEditItem({ ...editItem, address: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Footer Text</Label>
          <Input value={editItem.footerText || ''} onChange={e => setEditItem({ ...editItem, footerText: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Facebook</Label><Input value={editItem.facebook || ''} onChange={e => setEditItem({ ...editItem, facebook: e.target.value })} /></div>
          <div className="space-y-2"><Label>Instagram</Label><Input value={editItem.instagram || ''} onChange={e => setEditItem({ ...editItem, instagram: e.target.value })} /></div>
          <div className="space-y-2"><Label>YouTube</Label><Input value={editItem.youtube || ''} onChange={e => setEditItem({ ...editItem, youtube: e.target.value })} /></div>
          <div className="space-y-2"><Label>Twitter</Label><Input value={editItem.twitter || ''} onChange={e => setEditItem({ ...editItem, twitter: e.target.value })} /></div>
        </div>
      </div>
    );

    if (activeTab === 'hero') return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input value={editItem.title || ''} onChange={e => setEditItem({ ...editItem, title: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Subtitle</Label>
          <Input value={editItem.subtitle || ''} onChange={e => setEditItem({ ...editItem, subtitle: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Image</Label>
          <ImageUploader 
            maxImages={1}
            images={editItem.image ? [{ url: editItem.image, isPrimary: true, displayOrder: 0 }] : []}
            onChange={(imgs) => setEditItem({ ...editItem, image: imgs[0]?.url || '' })} 
          />
        </div>
        <div className="space-y-2">
          <Label>Button Text</Label>
          <Input value={editItem.buttonText || ''} onChange={e => setEditItem({ ...editItem, buttonText: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Button Link</Label>
          <Input value={editItem.buttonLink || ''} onChange={e => setEditItem({ ...editItem, buttonLink: e.target.value })} />
        </div>
      </div>
    );

    if (activeTab === 'video') return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input value={editItem.title || ''} onChange={e => setEditItem({ ...editItem, title: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>YouTube URL</Label>
          <Input required value={editItem.youtubeUrl || ''} onChange={e => setEditItem({ ...editItem, youtubeUrl: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Thumbnail Image</Label>
          <ImageUploader 
            maxImages={1}
            images={editItem.thumbnail ? [{ url: editItem.thumbnail, isPrimary: true, displayOrder: 0 }] : []}
            onChange={(imgs) => setEditItem({ ...editItem, thumbnail: imgs[0]?.url || '' })} 
          />
        </div>
      </div>
    );

    if (activeTab === 'pages') return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input required value={editItem.title || ''} onChange={e => setEditItem({ ...editItem, title: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Slug (e.g., about-us)</Label>
          <Input required value={editItem.slug || ''} onChange={e => setEditItem({ ...editItem, slug: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Content</Label>
          <RichTextEditor content={editItem.content || ''} onChange={val => setEditItem({ ...editItem, content: val })} />
        </div>
      </div>
    );

    if (activeTab === 'seo') return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Path (e.g., / or /about-us)</Label>
          <Input required value={editItem.path || ''} onChange={e => setEditItem({ ...editItem, path: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input value={editItem.title || ''} onChange={e => setEditItem({ ...editItem, title: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Meta Description</Label>
          <Input value={editItem.description || ''} onChange={e => setEditItem({ ...editItem, description: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Keywords</Label>
          <Input value={editItem.keywords || ''} onChange={e => setEditItem({ ...editItem, keywords: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>OG Image URL</Label>
          <ImageUploader 
            maxImages={1}
            images={editItem.ogImage ? [{ url: editItem.ogImage, isPrimary: true, displayOrder: 0 }] : []}
            onChange={(imgs) => setEditItem({ ...editItem, ogImage: imgs[0]?.url || '' })} 
          />
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'website', label: 'Website Settings' },
    { id: 'hero', label: 'Hero Banners' },
    { id: 'video', label: 'Video Content' },
    { id: 'pages', label: 'Static Pages' },
    { id: 'seo', label: 'SEO Settings' },
  ];

  if (viewState === 'edit') {
    return (
      <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
        <CardHeader>
          <CardTitle>Edit {tabs.find(t => t.id === activeTab)?.label}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
            {renderFormFields()}
            
            {activeTab !== 'website' && activeTab !== 'seo' && (
              <div className="space-y-2 pt-2">
                <Label>Display Order</Label>
                <Input type="number" value={editItem.displayOrder || 0} onChange={e => setEditItem({ ...editItem, displayOrder: parseInt(e.target.value) || 0 })} />
              </div>
            )}

            {activeTab !== 'website' && activeTab !== 'seo' && (
              <div className="flex items-center space-x-2 pt-2">
                <input type="checkbox" id="active" checked={editItem.active !== false} onChange={e => setEditItem({ ...editItem, active: e.target.checked })} className="w-4 h-4" />
                <Label htmlFor="active">Active / Enabled</Label>
              </div>
            )}

            <div className="flex space-x-2 pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setViewState('list')} disabled={isSubmitting}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 border-b border-border pb-2 overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setViewState('list'); }}
            className={`px-4 py-2.5 text-sm font-semibold rounded-lg whitespace-nowrap transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-primary/10 text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : (
          <>
            {activeTab === 'website' && (
              <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
                <CardHeader>
                  <CardTitle className="text-foreground">Website Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Manage global website settings like logo, contact info, etc.</p>
                  <Button onClick={() => startEdit(data.websiteSettings)}>Edit Settings</Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'hero' && (
              <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
                <CardHeader>
                  <CardTitle className="text-foreground">Hero Banners</CardTitle>
                </CardHeader>
                <CardContent>
                  {data.heroBanners.length === 0 ? (
                    <div className="text-sm text-muted-foreground mb-4 bg-muted/50 p-4 rounded-lg">No banners added yet.</div>
                  ) : (
                    <ul className="space-y-4 mb-4">
                      {data.heroBanners.map((banner: any) => (
                        <li key={banner.id} className="p-4 border border-border rounded-xl flex justify-between items-center bg-card">
                          <div>
                            <h4 className="font-bold text-foreground">{banner.title || 'Untitled'}</h4>
                            <p className="text-xs text-muted-foreground mt-1">Order: {banner.displayOrder} | {banner.active ? 'Active' : 'Disabled'}</p>
                          </div>
                          <div className="space-x-2 shrink-0">
                            <Button variant="outline" size="sm" onClick={() => startEdit(banner)}>Edit</Button>
                            <Button variant="destructive" size="sm" onClick={() => setDeleteItem(banner)}>Delete</Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button onClick={() => startEdit()}>Add Hero Banner</Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'video' && (
              <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
                <CardHeader>
                  <CardTitle className="text-foreground">Video Content</CardTitle>
                </CardHeader>
                <CardContent>
                  {data.videoContent.length === 0 ? (
                    <div className="text-sm text-muted-foreground mb-4 bg-muted/50 p-4 rounded-lg">No videos added yet.</div>
                  ) : (
                    <ul className="space-y-4 mb-4">
                      {data.videoContent.map((video: any) => (
                        <li key={video.id} className="p-4 border border-border rounded-xl flex justify-between items-center bg-card">
                          <div>
                            <h4 className="font-bold text-foreground">{video.title || 'Untitled'}</h4>
                            <p className="text-xs text-muted-foreground mt-1">Order: {video.displayOrder} | {video.active ? 'Active' : 'Disabled'}</p>
                          </div>
                          <div className="space-x-2 shrink-0">
                            <Button variant="outline" size="sm" onClick={() => startEdit(video)}>Edit</Button>
                            <Button variant="destructive" size="sm" onClick={() => setDeleteItem(video)}>Delete</Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button onClick={() => startEdit()}>Add Video Content</Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'pages' && (
              <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
                <CardHeader>
                  <CardTitle className="text-foreground">Static Pages</CardTitle>
                </CardHeader>
                <CardContent>
                  {data.staticPages.length === 0 ? (
                    <div className="text-sm text-muted-foreground mb-4 bg-muted/50 p-4 rounded-lg">No static pages added yet.</div>
                  ) : (
                    <ul className="space-y-4 mb-4">
                      {data.staticPages.map((page: any) => (
                        <li key={page.id} className="p-4 border border-border rounded-xl flex justify-between items-center bg-card">
                          <div>
                            <h4 className="font-bold text-foreground">{page.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">Slug: {page.slug} | {page.active ? 'Active' : 'Disabled'}</p>
                          </div>
                          <div className="space-x-2 shrink-0">
                            <Button variant="outline" size="sm" onClick={() => startEdit(page)}>Edit</Button>
                            <Button variant="destructive" size="sm" onClick={() => setDeleteItem(page)}>Delete</Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button onClick={() => startEdit()}>Add Static Page</Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'seo' && (
              <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
                <CardHeader>
                  <CardTitle className="text-foreground">SEO Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  {data.seoSettings.length === 0 ? (
                    <div className="text-sm text-muted-foreground mb-4 bg-muted/50 p-4 rounded-lg">No SEO settings added yet.</div>
                  ) : (
                    <ul className="space-y-4 mb-4">
                      {data.seoSettings.map((seo: any) => (
                        <li key={seo.id} className="p-4 border border-border rounded-xl flex justify-between items-center bg-card">
                          <div>
                            <h4 className="font-bold text-foreground">Path: {seo.path}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{seo.title || 'No Title'}</p>
                          </div>
                          <div className="space-x-2 shrink-0">
                            <Button variant="outline" size="sm" onClick={() => startEdit(seo)}>Edit</Button>
                            <Button variant="destructive" size="sm" onClick={() => setDeleteItem(seo)}>Delete</Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button onClick={() => startEdit()}>Add SEO Settings</Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
        isLoading={isSubmitting}
      />
    </div>
  );
}
