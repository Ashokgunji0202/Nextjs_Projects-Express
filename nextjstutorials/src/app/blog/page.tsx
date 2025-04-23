import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Blog',
  description: 'This is the blog page',
};

export default async function BlogPage() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  return (
    <div>
      <h1>Blog page</h1>
    </div>
  );
}
