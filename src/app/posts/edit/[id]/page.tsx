"use client"
import dynamic from "next/dynamic"
import React from "react"

const PostEditContainer = dynamic(() => import("@/containers/post/root-container").then(mod => mod.PostEditContainer), { ssr: false })

export const PostCreatePage = () => {
  return (
    <PostEditContainer />
  )
}

export default PostCreatePage