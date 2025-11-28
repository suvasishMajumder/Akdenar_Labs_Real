"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [banner, setBanner] = useState("");
  const [category, setCategory] = useState("Artificial Intelligence");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("draft");

  // Auto-generate slug from title
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    setSlug(value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
  };

  // TIPTAP EDITOR
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
      Placeholder.configure({
        placeholder: "Write your blog content here...",
      }),
    ],
    content: "",
  });

  const handleSubmit = () => {
    const finalData = {
      title,
      slug,
      thumbnail,
      banner,
      category,
      tags: tags.split(",").map((t) => t.trim()),
      status,
      content: editor.getHTML(),
    };

    console.log("Final Blog Data:", finalData);
    alert("Blog Created! Check console for JSON output.");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Blog</h1>

      <div className="space-y-6">

        {/* TITLE */}
        <div>
          <Label>Blog Title</Label>
          <Input
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter blog title"
            className="mt-1"
          />
        </div>

        {/* SLUG */}
        <div>
          <Label>Slug (auto-generated)</Label>
          <Input value={slug} disabled className="mt-1 bg-gray-100" />
        </div>

        {/* CATEGORY */}
        <div>
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
              <SelectItem value="Web Development">Web Development</SelectItem>
              <SelectItem value="Business Strategy">Business Strategy</SelectItem>
              <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* TAGS */}
        <div>
          <Label>Tags (comma separated)</Label>
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="AI, Automation, Tech"
            className="mt-1"
          />
        </div>

        {/* THUMBNAIL */}
        <div>
          <Label>Thumbnail Image URL</Label>
          <Input
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="https://example.com/thumb.jpg"
            className="mt-1"
          />

          {thumbnail && (
            <img
              src={thumbnail}
              alt="thumbnail preview"
              className="w-32 h-20 mt-3 rounded object-cover border"
            />
          )}
        </div>

        {/* BANNER */}
        <div>
          <Label>Banner Image URL</Label>
          <Input
            value={banner}
            onChange={(e) => setBanner(e.target.value)}
            placeholder="https://example.com/banner.jpg"
            className="mt-1"
          />

          {banner && (
            <img
              src={banner}
              alt="banner preview"
              className="w-full h-40 mt-3 rounded object-cover border"
            />
          )}
        </div>

        {/* STATUS */}
        <div>
          <Label>Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* TIPTAP EDITOR */}
        <div>
          <Label>Blog Content</Label>
          <div className="border p-3 rounded-lg mt-2">

            {/* Toolbar */}
            <div className="flex gap-2 mb-3">
              <Button size="sm" variant="outline" onClick={() => editor.chain().focus().toggleBold().run()}>
                Bold
              </Button>
              <Button size="sm" variant="outline" onClick={() => editor.chain().focus().toggleItalic().run()}>
                Italic
              </Button>
              <Button size="sm" variant="outline" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                H2
              </Button>
              <Button size="sm" variant="outline" onClick={() => editor.chain().focus().toggleBulletList().run()}>
                Bullet
              </Button>
              <Button size="sm" variant="outline" onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
                Code
              </Button>
              <Button size="sm" variant="outline" onClick={() => {
                const url = prompt("Enter image URL");
                if (url) editor.chain().focus().setImage({ src: url }).run();
              }}>
                Image
              </Button>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} className="min-h-[250px]" />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <Button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white w-full py-3"
        >
          Create Blog
        </Button>
      </div>
    </div>
  );
}
