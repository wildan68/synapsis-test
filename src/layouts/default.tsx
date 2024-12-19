"use client"
import React, { ReactNode } from "react";
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { DashboardOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Dashboard',
    key: '/dashboard',
    icon: <DashboardOutlined />,
  },
  {
    label: 'Posts',
    key: 'posts',
    icon: <PlusOutlined />,
    children: [
      { label: 'Create Post', key: '/posts/create' },
      { label: 'List Post', key: '/posts/list' },
    ],
  },
];

export const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()
  const [current, setCurrent] = React.useState(pathname)

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key)
    setCurrent(e.key);
  };

  return (
    <div className="flex w-screen min-h-screen">
      <div className="w-[250px] flex flex-col min-h-screen border-r">
        <div className="p-4 text-center">Wildan</div>
        <Menu 
          onClick={onClick} 
          selectedKeys={[current]} 
          mode="inline" 
          items={items}
          className="w-[250px] h-full"
        />
      </div>
      
      <main className="p-6 w-full">
        {children}
      </main>
    </div>
  );
};