"use client"
import React from "react"
import { Input, Card, Button, message, Form, FormProps, FormInstance } from "antd"
import { useMutation } from "@tanstack/react-query"
import { ApiService } from "@/lib/api-service"
import { setAuthorizationToken } from "@/lib/api"
import { setCookie } from "@/lib/cookies"
import { IPayloadLogin } from "@/types/index.type"

export const LoginContainer = () => {
  const [form] = Form.useForm() as [FormInstance<IPayloadLogin>]

  const mutation = useMutation({
    mutationFn: async (token: string) => {
      const data = await ApiService.getUser.call({ accessToken: token })

      return data
    },
    onSuccess({ data }, token) {
      setCookie("token", token)
      setAuthorizationToken(token)
      window.location.href = "/dashboard"
      return message.success("Success Login")
    },
    onError(error: any) {
      message.error(error.response.data.message)
    }
  })

  const onFinish: FormProps<IPayloadLogin>['onFinish'] = ({ name, token}) => {
    return mutation.mutateAsync(token)
  }


  return (
    <React.Fragment>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Card className="min-w-[90%] lg:min-w-[30%]" title="Welcome">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item<IPayloadLogin>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input placeholder="Input Name"/>
            </Form.Item>

            <Form.Item<IPayloadLogin>
              label="GoRest Token"
              name="token"
              rules={[{required: true, message: "GoRest Token is required"}]}
            >
              <Input placeholder="Input GoRest Token"/>
            </Form.Item>

            <Form.Item label={null}>
              <Button 
                type="primary" 
                loading={mutation.isPending}
                block
                htmlType="submit"
              >
              Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </main>
    </React.Fragment>
  )
}