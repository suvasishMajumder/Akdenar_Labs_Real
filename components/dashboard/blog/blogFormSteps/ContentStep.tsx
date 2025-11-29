'use client'
// components/BlogFormSteps/ContentStep.tsx
import { StepProps } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import dynamic from 'next/dynamic';
import { classname } from '@/app/admin/blog/create/page';
import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

// Dynamically import Jodit to avoid SSR issues
const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
  loading: () => <Textarea placeholder="Loading editor..." rows={10} />
});

const ContentStep = ({ formData, updateFormData, nextStep, prevStep }: StepProps) => {
  const [imageUploading, setImageUploading] = useState(false)
  const [previewURL, setPreviewURL] = useState("")
  // Stable Jodit Config
  const config = {
    readonly: false,
    height: 500,
    iframe: false,

    cleanHTML: {
      removeEmptyElements: false,
      replaceJBod: false,
    },

    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,

    allowTags: [
      'div', 'section', 'article', 'header', 'footer',
      'figure', 'figcaption', 'h1', 'h2', 'h3', 'h4',
      'p', 'span', 'ul', 'ol', 'li', 'img', 'a',
      'pre', 'code', 'strong', 'em', 'br'
    ],

    allowAttributes: {
      '*': ['style', 'class', 'src', 'alt', 'href']
    },
  };

  // FIX: Use only onBlur (no re-render while typing)
  const handleContentBlur = (content: string): void => {
    updateFormData({
      content,
    });
  };

  const handleBannerImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

      setPreviewURL(URL.createObjectURL(file))

      const { data } = await res.json();

      if (!res.ok) {
        console.error("Error", data)
        return;
      }
      updateFormData({ bannerImage: data.secure_url });
    } catch (error) {
      console.log("Server error", error)
    } finally {
      setImageUploading(false)
    }

  };

  const handlePublish = () => {
    if (imageUploading) {
      alert("Image is still uploading")
      return;
    }
    nextStep?.();

  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Content Creation</h2>

      <div className="space-y-6">

        {/* Banner Image */}
        <div>
          <Label htmlFor="bannerImage">Banner Image</Label>
          <Input
            id="bannerImage"
            type="file"
            accept="image/*"
            onChange={handleBannerImageChange}
            className={classname}
          />
          {/* preview image */}
          {
            formData.bannerImage && (
              <div className='flex items-end'>

                <img
                  src={formData.bannerImage}
                  alt="banner image"
                  className="mt-2 object-contain w-[90%] sm:w-96 rounded-md"
                  loading="lazy"
                />
                <X className='text-red-500' onClick={() => updateFormData({ bannerImage: "" })} />
              </div>
            )
          }
        </div>

        {/* Jodit Editor */}
        <div>
          <Label htmlFor="content">Content *</Label>
          <div className="mt-1">
            <JoditEditor
              value={formData.content}
              config={config}
              onBlur={(newContent: string) => handleContentBlur(newContent)}
            />
          </div>
        </div>

        {/* Reading Time & Status
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Reading time: {formData.readingTime} min
          </span>

          <div className="flex items-center gap-2">
            <Label>Status:</Label>

            <Select
              value={formData.status}
              onValueChange={(value: 'Draft' | 'Published' | 'Scheduled') =>
                updateFormData({ status: value })
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Published">Publish Now</SelectItem>
                <SelectItem value="Scheduled">Schedule</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div> */}
      </div>

      {/* Step Buttons */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep}>Back</Button>

        <Button
          onClick={handlePublish}
          disabled={!formData.content}
        >
          Next: SEO & Publish
        </Button>
      </div>
    </div>
  );
};

export default ContentStep;
