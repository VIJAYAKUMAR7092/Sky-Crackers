import React from 'react';
import { notFound } from 'next/navigation';
import { getStaticPageBySlug } from '@/lib/services/cms/cms.service';
import { getSEOSettings } from '@/lib/services/cms/cms.service';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getStaticPageBySlug(slug);
  const seo = await getSEOSettings('/pages/' + slug);

  if (!page || !page.active) {
    return { title: 'Page Not Found' };
  }

  return {
    title: seo?.title || page.title,
    description: seo?.description || page.title,
    keywords: seo?.keywords,
  };
}

export default async function StaticPage({ params }: Props) {
  const { slug } = await params;
  const page = await getStaticPageBySlug(slug);

  if (!page || !page.active) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-8 pb-6 border-b border-gray-100">
            {page.title}
          </h1>
          
          <div 
            className="prose prose-lg prose-green max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: page.content || '' }}
          />
        </div>
      </div>
    </div>
  );
}
