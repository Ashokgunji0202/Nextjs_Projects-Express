"use client";

import Link from "next/link";
import { use } from "react";

export default async function ArticlePage({params,searchParams}:{
    params:Promise<{articleId:string}>
    searchParams:Promise<{lang?:"en"|"fr"|"de"}>
}) {
    // const {articleId}= (await params);
    // const {lang="en"}= (await searchParams);
    const {articleId}= use(params)
    const {lang}= use(searchParams)
    return (
        <div>
            <h1>News article {articleId}</h1>
            <p>Language: {lang}</p>
            <div>
                <Link href={`/articles/${articleId}?lang=en`}>English</Link>
                <Link href={`/articles/${articleId}?lang=fr`}>French</Link>
            </div>
        </div>
    );
}