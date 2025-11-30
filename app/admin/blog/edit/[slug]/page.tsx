// components/BlogForm.tsx
'use client';

import { useEffect, useState } from 'react';
import { BlogFormData, ProgressStep } from '@/types/blog';
import ProgressIndicator from '@/components/dashboard/blog/blogFormSteps/ProgressIndicator';
import BasicInfoStep from '@/components/dashboard/blog/blogFormSteps/BasicInfoStep';
import ContentStep from '@/components/dashboard/blog/blogFormSteps/ContentStep';
import SEOStep from '@/components/dashboard/blog/blogFormSteps/SEOStep';
import { createBlogSchema } from '@/validations/blog';
import { useParams, useRouter } from 'next/navigation';

const BlogForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    shortDescription: '',
    category: '',
    tags: [],
    authorId: '',
    content: '',
    bannerImage: null,
    metaTitle: '',
    metaDescription: '',
    ogImage: null
  });

  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    if (slug) {
      (
        async () => {
          setLoading(true)
          const res = await fetch(`/api/blogs/${slug}`)
          const { data } = await res.json();

          setFormData({
            authorId: data.author._id,
            category: data.category,
            content: data.content,
            metaDescription: data.metaDescription,
            metaTitle: data.metaTitle,
            ogImage: data.ogImage,
            shortDescription: data.shortDescription,
            slug: data.slug,
            tags: data.tags,
            title: data.title,
            bannerImage: data.bannerImage,
          })
          setLoading(false)
        }
      )()
    }
  }, [])

  const router = useRouter();

  const steps: ProgressStep[] = [
    { number: 1, title: 'Basic Info', completed: currentStep > 1 },
    { number: 2, title: 'Content', completed: currentStep > 2 },
    { number: 3, title: 'SEO & Publish', completed: currentStep > 3 },
  ];

  const nextStep = (): void => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = (): void => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const updateFormData = (newData: Partial<BlogFormData>): void => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleSubmit = async (): Promise<void> => {
    const validatedData = createBlogSchema.safeParse(formData);
    if (!validatedData.success) {
      console.log(validatedData.error)
      return;
    }
    try {
      const res = await fetch(`/api/blogs/${formData.slug}`, {
        method: "PUT",
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if (data.message) {
        alert(data.message)
        router.push("/admin/dashboard?tab=blog")
        return;
      }
      if (data.error) {
        alert(data.error)
        return;
      }
    } catch (error) {
      console.error('Error submitting blog:', error);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Fixed */}
      <div className="shrink-0 ">
        <div className="max-w-6xl mx-auto px-6 bg-white border mt-2 border-gray-300 rounded-xl">
          {/* Progress Indicator */}
          <ProgressIndicator steps={steps} currentStep={currentStep} />
        </div>
      </div>

      {/* Form Content - Flexible */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-6xl mx-auto mt-2 bg-white p-4 border border-gray-300 rounded-xl">
          <div className="h-full  ">
            {currentStep === 1 && (
              <BasicInfoStep
                formData={formData}
                updateFormData={updateFormData}
                nextStep={nextStep}
              />
            )}

            {currentStep === 2 && (
              <ContentStep
                formData={formData}
                updateFormData={updateFormData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}

            {currentStep === 3 && (
              <SEOStep
                formData={formData}
                updateFormData={updateFormData}
                prevStep={prevStep}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;

export let classname = "w-full transition-all duration-200 mt-2 border border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 data-[state=open]:border-blue-500 data-[state=open]:ring-2 data-[state=open]:ring-blue-500"
