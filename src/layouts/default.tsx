"use client"
import React, { ReactNode } from "react";
import type { MenuProps } from 'antd';
import { Menu, Switch } from 'antd';
import { DashboardOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import { ThemeConfigContext } from "@/providers/theme/provider";

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
  const { setDarkMode, darkMode } = React.useContext(ThemeConfigContext)
  const getDeviceResolution = React.useCallback(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return 0;
  }, [])

  const colapseMenu = React.useMemo(() => {
    return getDeviceResolution() < 768
  }, [getDeviceResolution])

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key)
    setCurrent(e.key);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="flex w-screen min-h-screen">
      <div className="w-[60px] lg:w-[250px] flex flex-col min-h-screen border-r z-20 fixed bg-white">
        <div className="p-4 text-center">WR</div>
        <Menu 
          onClick={onClick} 
          selectedKeys={[current]} 
          mode="inline" 
          items={items}
          className="w-[60px] lg:w-[250px] h-full"
          inlineCollapsed={colapseMenu}
        />
      </div>
      
      <main className="w-full ml-[60px] lg:ml-[250px] flex flex-col gap-2">
        <div className="px-6 py-4 flex w-full border-b sticky top-0 z-10 bg-white">
          <Switch 
            checkedChildren="Dark" 
            unCheckedChildren="Light" 
            defaultChecked={false} 
            onChange={toggleDarkMode}
          />
        </div>

        <div className="p-6 w-full">
          {children}
        </div>
      </main>
    </div>
  );
};