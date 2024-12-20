"use client"
import dynamic from "next/dynamic"
import React from "react"

export const runtime = 'edge';

const PostDetailContainer = dynamic(() => import("@/containers/post/root-container").then(mod => mod.PostDetailContainer), { ssr: false })

const PostCreatePage = () => {
  return (
    <PostDetailContainer />
  )
}

export default PostCreatePage