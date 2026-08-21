'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useRouter } from 'next/navigation';

interface CMSClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData: any;
}

export default function CMSClient({ initialData }: CMSClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('hero');
  const [viewState, setViewState] = useState<'list' | 'edit'>('list');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editItem, setEditItem] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<{ type: string, id: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startEdit = (item: any = null, defaultType: string = '') => {
    setEditItem(item || { type: defaultType, content: {} });
    setViewState('edit');
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const payload = Object.fromEntries(formData.entries());
      
      const isActive = payload.active === 'on';
      const displayOrder = parseInt(payload.displayOrder as string) || 0;
      
      let url = '';
      let method = 'PATCH';

      const type = editItem?.type || activeTab.toUpperCase() + '_CONFIG';

      if (['HERO_BANNER', 'PROMO_BANNER'].includes(type) || type.startsWith('SECTION_')) {
        if (editItem?.id) {
          url = `/api/admin/homepage/collection/${type}/${editItem.id}`;
        } else {
          url = `/api/admin/homepage/collection/${type}`;
          method = 'POST';
        }
      } else {
        url = `/api/admin/homepage/singleton/${type}`;
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: payload.title || payload.homepageTitle || editItem?.title || type, 
          content: payload, 
          active: isActive, 
          displayOrder 
        })
      });

      if (!res.ok) throw new Error('Failed to save');
      router.refresh();
      setViewState('list');
    } catch (err: any) {
      alert(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/homepage/collection/${deleteId.type}/${deleteId.id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete');
      router.refresh();
      setDeleteId(null);
    } catch (err: any) {
      alert(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormFields = () => {
    const content = editItem?.content || {};
    
    if (activeTab === 'hero') return (
      <>
        <div className="space-y-2">
          <Label>Main Title</Label>
          <Input name="title" defaultValue={content.title} required />
        </div>
        <div className="space-y-2">
          <Label>Subtitle</Label>
          <Input name="subtitle" defaultValue={content.subtitle} />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Input name="description" defaultValue={content.description} />
        </div>
        <div className="space-y-2">
          <Label>Button Text</Label>
          <Input name="buttonText" defaultValue={content.buttonText} />
        </div>
        <div className="space-y-2">
          <Label>Button Link</Label>
          <Input name="buttonLink" defaultValue={content.buttonLink} />
        </div>
        <div className="space-y-2">
          <Label>Desktop Image URL</Label>
          <Input name="desktopImage" defaultValue={content.desktopImage} />
        </div>
        <div className="space-y-2">
          <Label>Mobile Image URL</Label>
          <Input name="mobileImage" defaultValue={content.mobileImage} />
        </div>
      </>
    );

    if (activeTab === 'promo') return (
      <>
        <div className="space-y-2">
          <Label>Title / Identifier</Label>
          <Input name="title" defaultValue={content.title} required />
        </div>
        <div className="space-y-2">
          <Label>Image URL</Label>
          <Input name="image" defaultValue={content.image} required />
        </div>
        <div className="space-y-2">
          <Label>Link URL</Label>
          <Input name="link" defaultValue={content.link} />
        </div>
        <div className="space-y-2">
          <Label>Position</Label>
          <Input name="position" defaultValue={content.position || 'TOP'} />
        </div>
      </>
    );

    if (activeTab === 'sections') return (
      <>
        <div className="space-y-2">
          <Label>Section Heading</Label>
          <Input name="heading" defaultValue={content.heading} />
        </div>
        <div className="space-y-2">
          <Label>Sub Heading</Label>
          <Input name="subHeading" defaultValue={content.subHeading} />
        </div>
      </>
    );

    if (activeTab === 'seo') return (
      <>
        <div className="space-y-2">
          <Label>Homepage Title</Label>
          <Input name="homepageTitle" defaultValue={content.homepageTitle} />
        </div>
        <div className="space-y-2">
          <Label>Meta Description</Label>
          <Input name="metaDescription" defaultValue={content.metaDescription} />
        </div>
        <div className="space-y-2">
          <Label>Keywords</Label>
          <Input name="keywords" defaultValue={content.keywords} />
        </div>
        <div className="space-y-2">
          <Label>OG Image URL</Label>
          <Input name="ogImage" defaultValue={content.ogImage} />
        </div>
        <div className="space-y-2">
          <Label>Canonical URL</Label>
          <Input name="canonicalUrl" defaultValue={content.canonicalUrl} />
        </div>
      </>
    );

    if (activeTab === 'settings') return (
      <>
        <div className="space-y-2">
          <Label>Announcement Text</Label>
          <Input name="announcementText" defaultValue={content.announcementText} />
        </div>
        <div className="space-y-2">
          <Label>Marquee Text</Label>
          <Input name="marqueeText" defaultValue={content.marqueeText} />
        </div>
        <div className="space-y-2">
          <Label>Popup Banner Image URL</Label>
          <Input name="popupBannerImage" defaultValue={content.popupBannerImage} />
        </div>
      </>
    );
  };

  const tabs = [
    { id: 'hero', label: 'Hero Banners' },
    { id: 'promo', label: 'Promo Banners' },
    { id: 'sections', label: 'Sections' },
    { id: 'seo', label: 'SEO' },
    { id: 'settings', label: 'Settings' },
  ];

  if (viewState === 'edit') {
    return (
      <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
        <CardHeader>
          <CardTitle>Edit {tabs.find(t => t.id === activeTab)?.label}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4 max-w-xl">
            {renderFormFields()}
            
            {activeTab !== 'seo' && activeTab !== 'settings' && (
              <div className="space-y-2">
                <Label>Display Order</Label>
                <Input name="displayOrder" type="number" defaultValue={editItem?.displayOrder || 0} />
              </div>
            )}

            <div className="flex items-center space-x-2 pt-2">
              <input type="checkbox" id="active" name="active" defaultChecked={editItem?.active !== false} className="w-4 h-4" />
              <Label htmlFor="active">Active / Enabled</Label>
            </div>

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
        {activeTab === 'hero' && (
          <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
            <CardHeader>
              <CardTitle className="text-foreground">Hero Banners</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Manage the main hero sliders.</p>
              {initialData.heroBanners.length === 0 ? (
                <div className="text-sm text-muted-foreground mb-4 bg-muted/50 p-4 rounded-lg">No banners added yet.</div>
              ) : (
                <ul className="space-y-4 mb-4">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {initialData.heroBanners.map((banner: any) => (
                    <li key={banner.id} className="p-4 border border-border rounded-xl flex justify-between items-center bg-card hover:bg-secondary/30 transition-colors">
                      <div>
                        <h4 className="font-bold text-foreground">{banner.content?.title || 'Untitled'}</h4>
                        <p className="text-xs text-muted-foreground mt-1">Order: <span className="font-medium text-foreground">{banner.displayOrder}</span> | {banner.active ? <span className="text-green-600 dark:text-green-500 font-medium">Active</span> : <span className="text-muted-foreground font-medium">Disabled</span>}</p>
                      </div>
                      <div className="space-x-2 shrink-0">
                        <Button variant="outline" size="sm" onClick={() => startEdit(banner)}>Edit</Button>
                        <Button variant="destructive" size="sm" onClick={() => setDeleteId({ type: banner.type, id: banner.id })}>Delete</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <Button onClick={() => startEdit(null, 'HERO_BANNER')}>Add Hero Banner</Button>
            </CardContent>
          </Card>
        )}

        {activeTab === 'promo' && (
          <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
            <CardHeader>
              <CardTitle className="text-foreground">Promotional Banners</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Manage secondary promotional banners.</p>
              {initialData.promoBanners.length === 0 ? (
                <div className="text-sm text-muted-foreground mb-4 bg-muted/50 p-4 rounded-lg">No banners added yet.</div>
              ) : (
                <ul className="space-y-4 mb-4">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {initialData.promoBanners.map((banner: any) => (
                    <li key={banner.id} className="p-4 border border-border rounded-xl flex justify-between items-center bg-card hover:bg-secondary/30 transition-colors">
                      <div>
                        <h4 className="font-bold text-foreground">{banner.content?.title || 'Untitled'}</h4>
                        <p className="text-xs text-muted-foreground mt-1">Order: <span className="font-medium text-foreground">{banner.displayOrder}</span> | {banner.active ? <span className="text-green-600 dark:text-green-500 font-medium">Active</span> : <span className="text-muted-foreground font-medium">Disabled</span>}</p>
                      </div>
                      <div className="space-x-2 shrink-0">
                        <Button variant="outline" size="sm" onClick={() => startEdit(banner)}>Edit</Button>
                        <Button variant="destructive" size="sm" onClick={() => setDeleteId({ type: banner.type, id: banner.id })}>Delete</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <Button onClick={() => startEdit(null, 'PROMO_BANNER')}>Add Promo Banner</Button>
            </CardContent>
          </Card>
        )}

        {activeTab === 'sections' && (
          <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
            <CardHeader>
              <CardTitle className="text-foreground">Homepage Sections Config</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {initialData.sections.map((section: any) => (
                <div key={section.id} className="p-4 border border-border rounded-xl flex justify-between items-center bg-card hover:bg-secondary/30 transition-colors">
                  <div>
                    <h4 className="font-bold text-foreground">{section.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">Order: <span className="font-medium text-foreground">{section.displayOrder}</span> | {section.active ? <span className="text-green-600 dark:text-green-500 font-medium">Active</span> : <span className="text-muted-foreground font-medium">Disabled</span>}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => startEdit(section)}>Edit</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {activeTab === 'seo' && (
          <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
            <CardHeader>
              <CardTitle className="text-foreground">SEO Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Configure homepage Meta tags.</p>
              <Button onClick={() => startEdit(initialData.seo, 'SEO_CONFIG')}>Edit SEO</Button>
            </CardContent>
          </Card>
        )}

        {activeTab === 'settings' && (
          <Card className="border-border/60 shadow-lg bg-card/50 backdrop-blur-sm fade-in-up">
            <CardHeader>
              <CardTitle className="text-foreground">Homepage Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Announcement bar, popup banner, marquee.</p>
              <Button onClick={() => startEdit(initialData.settings, 'SETTINGS_CONFIG')}>Edit Settings</Button>
            </CardContent>
          </Card>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
        isLoading={isSubmitting}
      />
    </div>
  );
}
