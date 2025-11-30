// components/BlogFormSteps/BasicInfoStep.tsx

'use client'

import { StepProps } from '@/types/blog';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { slugify } from '@/lib/utils/slugify';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { classname } from '@/app/admin/blog/create/page';

interface IAuthor {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  position: string;
  bio: string;
  _v: string
}

const BasicInfoStep = ({ formData, updateFormData, nextStep }: StepProps) => {
  const [authors, setAuthors] = useState<IAuthor[]>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const title = e.target.value;
    updateFormData({
      title,
      slug: slugify(title)
    });
  }

  const isStepValid = (): boolean => {
    return !!(formData.title && formData.slug && formData.category && formData.authorId);
  };

  useEffect(() => {
    fetchAuthors();
  }, [])

  async function fetchAuthors() {
    try {
      const res = await fetch("/api/authors");
      const { data } = await res.json();
      setAuthors(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Basic Information</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            type="text"
            value={formData.title}
            onChange={handleTitleChange}
            className={cn(classname, "min-h-10")}
            placeholder="Enter blog title"
          />
        </div>

        <div>
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            type="text"
            value={slugify(formData.title)}
            readOnly
            onChange={(e) => updateFormData({ slug: formData.slug })}
            className={cn(classname, "min-h-10")}
            placeholder="blog-url-slug"
          />
        </div>

        <div>
          <Label htmlFor="shortDescription">Short Description</Label>
          <Textarea
            id="shortDescription"
            value={formData.shortDescription}
            onChange={(e) => updateFormData({ shortDescription: e.target.value })}
            className={classname}
            rows={3}
            placeholder="Brief description of your blog"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => updateFormData({ category: value })}
            >
              <SelectTrigger className={classname}>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className='w-full bg-white'>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="artificial-intelligence">Artificial Intelligence</SelectItem>
                <SelectItem value="cloud-computing">Cloud Computing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="author">Author *</Label>
            <Select
              value={formData.authorId}
              onValueChange={(value) => updateFormData({ authorId: value })}
            >
              <SelectTrigger className={classname}>
                <SelectValue placeholder="Select Author" />
              </SelectTrigger>
              <SelectContent className='w-full bg-white'>
                {
                  authors.map(author => (
                    <SelectItem key={author._id} value={author._id}>{author.name}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="tags" className="text-sm font-medium">Tags</Label>
          <TagsInput
            tags={formData.tags}
            onTagsChange={(newTags) => updateFormData({ tags: newTags })}
          />
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button
          onClick={nextStep}
          disabled={!isStepValid()}
        >
          Next: Content
        </Button>
      </div>
    </div>
  );
};

export default BasicInfoStep;

// Advanced Tags Input Component

const TagsInput = ({ tags, onTagsChange }: { tags: string[]; onTagsChange: (tags: string[]) => void }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onTagsChange([...tags, trimmedTag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
        setInputValue('');
      }
    }

    if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedTags = pastedData.split(/[,|\n|\t]+/).map(tag => tag.trim()).filter(tag => tag);

    if (pastedTags.length > 1) {
      const newTags = [...tags, ...pastedTags].filter((tag, index, self) =>
        tag && self.indexOf(tag) === index
      );
      onTagsChange(newTags);
    } else {
      setInputValue(pastedData);
    }
  };

  return (
    <div className=''>
      <div
        className="flex mt-1 flex-wrap items-center gap-2 p-2 border rounded-md bg-background border-gray-300 hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors min-h-10"
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="flex justify-center items-center gap-1 py-1 px-2">
            <span className='text-blue-500'>
              {tag}
            </span>
            <X
              className="w-3 h-3 cursor-pointer hover:text-destructive mt-0.5"
              onClick={() => removeTag(tag)}
            />
          </Badge>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={() => {
            if (inputValue.trim()) {
              addTag(inputValue);
              setInputValue('');
            }
          }}
          className="flex-1 min-w-20 outline-none bg-transparent placeholder:text-muted-foreground"
          placeholder={tags.length === 0 ? "Add tags..." : ""}
        />
      </div>
      <p className="text-sm text-muted-foreground mt-1">
        Press Enter, comma or Tab to add tags
      </p>
    </div>
  );
};
