"use client"

import { ApiService } from "@/lib/api-service"
import { UserConfigContext } from "@/providers/user-config/provider"
import { IPayloadCreatePost, IPost } from "@/types/index.type"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Button, Form, Input, message, Skeleton } from "antd"
import { FormProps, useForm } from "antd/es/form/Form"
import React from "react"

export const FieldPostContainer: React.FC<{
  id?: number
}> = ({
  id
}) => {
  const { userId } = React.useContext(UserConfigContext)
  const [form] = useForm()

  const { data: post, isLoading } = useQuery({
    queryKey: [ApiService.getPost.key],
    queryFn: async () => (await ApiService.getPost.call(id as number)),
    throwOnError: true,
    enabled: !!id
  })

  React.useEffect(() => {
    if (post) {
      form.setFieldsValue(post.data)
    }
  }, [post, form])

  const mutation = useMutation({
    mutationFn: async (payload: IPayloadCreatePost) => {
      if (id) return await ApiService.putPost.call(id, payload)

      return await ApiService.postPost.call(payload)
    },
    onSuccess({ data }) {
      if (!id) form.resetFields()
      return message.success(id ? "Post Updated Successfully" : "Post Created Successfully")
    },
    onError(error: any) {
      message.error(error.message)
    }
  })

  const onFinish: FormProps<IPayloadCreatePost>['onFinish'] = (payload) => {
    return mutation.mutateAsync({ ...payload, user_id: userId as number })
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton.Input 
          active 
          block
        />

        <Skeleton.Input 
          active
          block
          size="large"
        />
      </div>
    )
  } 

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item<IPayloadCreatePost>
        label="Title"
        name="title"
        rules={[{ required: true, message: "Title is required" }]}
      >
        <Input placeholder="Input Title"/>
      </Form.Item>

      <Form.Item<IPayloadCreatePost>
        label="Body"
        name="body"
        rules={[{ required: true, message: "Body is required" }, { max: 500, message: "Body must be less than 500 characters" }]}
      >
        <Input.TextArea 
          placeholder="Input Body" 
          rows={8}
        />
      </Form.Item>

      <div className="flex justify-end">
        <Button 
          type="primary" 
          htmlType="submit"
          loading={mutation.isPending}
        >
          {id ? "Update" : "Create"} Post
        </Button>
      </div>
    </Form>
  )
}