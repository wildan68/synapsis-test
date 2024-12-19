"use client"
import dynamic from "next/dynamic"
import React from "react"

const PostCreateContainer = dynamic(() => import("@/containers/post/root-container").then(mod => mod.PostCreateContainer), { ssr: false })

export const PostCreatePage = () => {
  return (
    <PostCreateContainer />
  )
}

export default PostCreatePage