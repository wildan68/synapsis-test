"use client"

import React from "react"
import { FieldPostContainer } from "@/containers/post/field"
import { useParams, useRouter } from "next/navigation"
import { UserConfigContext } from "@/providers/user-config/provider"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ApiService } from "@/lib/api-service"
import { Button, message, Modal, Skeleton, Space, Table, TablePaginationConfig, TableProps } from "antd"
import { IPost } from "@/types/index.type"
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons"
import { refetchQueries } from "@/providers/react-query/refetch"

export const PostCreateContainer = () => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-bold">Create a Post</h2>
      <FieldPostContainer />
    </div>
  )
}

export const PostEditContainer = () => {
  const { id } = useParams()

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-bold">Edit a Post</h2>
      <FieldPostContainer id={Number(id)}/>
    </div>
  )
}

export const PostDetailContainer = () => {
  const { id } = useParams()

  const { data: post, isLoading } = useQuery({
    queryKey: [ApiService.getPost.key],
    queryFn: async () => (await ApiService.getPost.call(Number(id))),
    throwOnError: true,
  })

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton.Input 
          active 
          size="large"
        />

        <Skeleton.Input 
          active 
          size="large"
          block
        />

        <Skeleton.Input 
          active 
          size="large"
          block
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{post?.data.title}</h2>
          <span className="text-gray-400 text-xs">Posted by <span className="font-bold">{post?.data.user_id}</span></span>
        </div>
        <section className="text-sm">{post?.data.body}</section>
      </div>
    </div>
  )
}

export const PostListContainer = () => {
  const { userId } = React.useContext(UserConfigContext)
  const router = useRouter()
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false)
  const [dataDialog, setDataDialog] = React.useState<IPost>()

  const { data, isLoading } = useQuery(
    {
      queryKey: [ApiService.getPosts.key],
      queryFn: async () => (await ApiService.getPosts.call(userId as number)),
      throwOnError: true
    }
  )

  const openDeleteDialog = (data: IPost) => {
    setDataDialog(data)
    setDeleteDialog(true)
  }

  const tableColumns: TableProps<IPost>['columns'] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    }, {
      title: "Body",
      dataIndex: "body",
      key: "body",
    }, {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="circle"
            onClick={() => router.push(`/posts/detail/${record.id}`)}
          >
            <EyeOutlined/>
          </Button>
          
          <Button 
            type="primary" 
            variant="outlined"
            shape="circle"
            onClick={() => router.push(`/posts/edit/${record.id}`)}
          >
            <EditOutlined/>
          </Button>
  
          <Button 
            type="primary" 
            danger
            shape="circle"
            onClick={() => openDeleteDialog(record)}
          >
            <DeleteOutlined/>
          </Button>
        </Space>
      ),
    }
  ]

  const postList = React.useMemo(() => {
    return data?.data.map((post) => {
      return {
        key: post.id,
        id: post.id,
        title: post.title,
        body: post.body,
        user_id: post.user_id
      }
    })
  }, [data])

  const handleNewPage = ({ current }: TablePaginationConfig) => {
    refetchQueries(ApiService.getPost.key)
  }

  React.useEffect(() => {
    console.log('data post', data)
  })

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-bold">List Post</h2>
      <Table<IPost> 
        dataSource={postList} 
        columns={tableColumns} 
        loading={isLoading}
        pagination={{
          total: Number(data?.headers['x-pagination-total'])
        }}
        onChange={(e) => handleNewPage(e)}
      />

      <PostDeleteDialog 
        data={dataDialog as IPost}
        open={deleteDialog} 
        setOpen={setDeleteDialog} 
      />
    </div>
  )
}

const PostDeleteDialog: React.FC<{
  data: IPost,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ data, open, setOpen }) => {
  const mutation = useMutation({
    mutationFn: async () => {
      return await ApiService.deletePost.call(data.id)
    },
    onSuccess({ data }) {
      setOpen(false)
      refetchQueries(
        ApiService.getPosts.key
      )
      return message.success("Post Deleted Successfully")
    },
    onError(error: any) {
      message.error(error.message)
    }
  })
  
  const handleOk = () => {
    mutation.mutateAsync()
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <Modal
      open={open}
      title="Delete Post"
      onOk={handleOk}
      onCancel={handleCancel}
      okType="danger"
      okText="Delete"
      footer={(_, { OkBtn, CancelBtn }) => (
        <React.Fragment>
          <CancelBtn />
          <OkBtn />
        </React.Fragment>
      )}
    >
      <div>Are you sure to delete this post?</div> 
    </Modal>
  )
}