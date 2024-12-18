"use client"
import React from "react"
import { Input, Card, Button, message, Form, Layout } from "antd"
import { useMutation } from "@tanstack/react-query"
import { ApiService } from "@/lib/api-service"

type Field = {
  name: string
  token: string
}

export const HomeContainer = () => {
  const [form] = Form.useForm()
  const mutation = useMutation({
    mutationFn: async () => {
      const data = await ApiService.getUser.call()

      return data
    },
    onSuccess({ data }) {
      console.log('data', data)
      message.success("Success Login")
    },
    onError(error: any) {
      message.error(error.message)
    }
  })


  return (
    <React.Fragment>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Card className="min-w-[30%]" title="Welcome">
          <Form
            form={form}
            className="flex flex-col gap-4" 
            layout="vertical"
          >
            <Form.Item<Field>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input placeholder="Input Name"/>
            </Form.Item>

            <Form.Item<Field>
              label="GoRest Token"
              name="token"
              rules={[{required: true, message: "GoRest Token is required"}]}
            >
              <Input placeholder="Input GoRest Token"/>
            </Form.Item>

            <Button type="primary" loading={mutation.isPending} onClick={() => mutation.mutate()}>Login</Button>
          </Form>
        </Card>
      </main>
    </React.Fragment>
  )
}

export default HomeContainer
