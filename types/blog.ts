
// types/blog.ts
export interface BlogFormData {
  // Step 1
  title: string;
  slug: string;
  shortDescription: string;
  category: string;
  tags: string[];
  authorId: string;

  // Step 2
  content: string;
  bannerImage: string | null;
  status?: "Draft" | "Published" | "Scheduled";

  // Step 3
  metaTitle: string;
  metaDescription: string;
  ogImage: string | null;
}

export interface StepProps {
  formData: BlogFormData;
  updateFormData: (data: Partial<BlogFormData>) => void;
  nextStep?: () => void;
  prevStep?: () => void;
  onSubmit?: () => void;
}

export interface ProgressStep {
  number: number;
  title: string;
  completed: boolean;
}
