"use client";
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(import('swagger-ui-react'), { ssr: false })as any;
export default function SwaggerPage() {
  return <SwaggerUI url="/api/docs.json" />;
}

