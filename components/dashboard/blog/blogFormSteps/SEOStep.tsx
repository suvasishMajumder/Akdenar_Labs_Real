'use client'
// components/BlogFormSteps/SEOStep.tsx
import { StepProps } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { classname } from '@/app/admin/blog/create/page';
import { useState } from 'react';
import { X } from 'lucide-react';

const SEOStep = ({ formData, updateFormData, prevStep, onSubmit }: StepProps) => {
  const [imageUploading, setImageUploading] = useState(false)

  const getDefaultMetaTitle = (): string => {
    return formData.metaTitle || formData.title;
  };

  const getDefaultMetaDescription = (): string => {
    return formData.metaDescription || formData.shortDescription;
  };

  const SEOPreview = () => (
    <div className="border-l-4 border-primary pl-4 mt-4">
      <h4 className="font-semibold mb-2">Search Result Preview</h4>
      <div className="text-sm">
        <div className="text-blue-600 hover:underline cursor-pointer">
          {getDefaultMetaTitle()}
        </div>
        <div className="text-green-600 text-xs">
          https:/labs.akdenar.com/blog/{formData.slug}
        </div>
        <div className="text-muted-foreground text-xs mt-1">
          {getDefaultMetaDescription()?.substring(0, 160)}...
        </div>
      </div>
    </div>
  );

  const handleOGImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    try {
      setImageUploading(true)
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      })

      const { data } = await res.json();

      if (!res.ok) {
        console.error("Error", data)
        return;
      }
      updateFormData({ ogImage: data.secure_url });
    } catch (error) {
      console.log("Server error", error)
    } finally {
      setImageUploading(false)
    }

  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">SEO & Publishing</h2>

      <div className="space-y-6">
        <div>
          <Label htmlFor="metaTitle">
            Meta Title
            <span className="text-xs text-muted-foreground ml-2">
              {getDefaultMetaTitle()?.length || 0}/60
            </span>
          </Label>
          <Input
            id="metaTitle"
            type="text"
            value={formData.metaTitle}
            onChange={(e) => updateFormData({ metaTitle: e.target.value })}
            className={classname}
            placeholder="Meta title for search engines"
            maxLength={60}
          />
          <SEOPreview />
        </div>

        <div>
          <Label htmlFor="metaDescription">
            Meta Description
            <span className="text-xs text-muted-foreground ml-2">
              {getDefaultMetaDescription()?.length || 0}/160
            </span>
          </Label>
          <Textarea
            id="metaDescription"
            value={formData.metaDescription}
            onChange={(e) => updateFormData({ metaDescription: e.target.value })}
            className={classname}
            rows={3}
            placeholder="Meta description for search engines"
            maxLength={160}
          />
        </div>

        <div>
          <Label htmlFor="ogImage">OG Image</Label>
          <Input
            id="ogImage"
            type="file"
            accept="image/*"
            onChange={(e) => { handleOGImageUpload(e) }}
            className={classname}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Recommended size: 1200x630px
          </p>
        </div>
        {
          formData.ogImage && (
            <div className='flex items-end'>

              <img
                src={formData.ogImage}
                alt="banner image"
                className="mt-2 object-contain w-[90%] sm:w-96 rounded-md"
                loading="lazy"
              />
              <X className='text-red-500' onClick={() => updateFormData({ ogImage: "" })} />
            </div>
          )
        }

        {/* {formData.status === 'Scheduled' && (
          <div>
            <Label htmlFor="publishedAt">Schedule Publish Date</Label>
            <Input
              id="publishedAt"
              type="datetime-local"
              onChange={(e) => updateFormData({ publishedAt: new Date(e.target.value) })}
              className={classname}
            />
          </div>
        )} */}
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>

        <div className="space-x-4">
          <Button
            variant="secondary"
            onClick={() => {
              updateFormData({ status: 'Draft' });
              onSubmit?.();
            }}
            disabled={imageUploading}
          >
            Save as Draft
          </Button>

          <Button
            onClick={() => {
              updateFormData({ status: 'Published' });
              onSubmit?.();
            }}
            disabled={imageUploading}
          >
            {/* {formData.status === 'Published' ? 'Publish Now' : 'Update Blog'} */}
            Publish Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SEOStep;