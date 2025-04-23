import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Blog',
  description: 'This is the blog page',
};

export default function BlogPage() {
  return (
    <div>
      <h1>Blog page</h1>
    </div>
  );
}
