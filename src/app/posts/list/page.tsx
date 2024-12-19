"use client"
import dynamic from "next/dynamic"
import React from "react"

const PostListContainer = dynamic(() => import("@/containers/post/root-container").then(mod => mod.PostListContainer), { ssr: false })

export const PostListPage = () => {
  return (
    <PostListContainer />
  )
}

export default PostListPage