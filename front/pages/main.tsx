import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Card,
  Typography,
  Space,
  Breadcrumb,
  Avatar,
  Badge,
  Dropdown,
  theme,
  Row,
  Col,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  FolderOutlined,
  FolderOpenOutlined,
  SettingOutlined,
  BellOutlined,
  MailOutlined,
  LogoutOutlined,
  DownOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { logout } from "../src/api/auth/logout";

const { Header, Sider, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { useToken } = theme;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const menuItems: MenuItem[] = [
  getItem("Главная", "dashboard", <HomeOutlined />),
  getItem("Пользователи", "users", <UserOutlined />, [
    getItem("Все пользователи", "users-list"),
    getItem("Роли", "users-roles", <TeamOutlined />, [
      getItem("Администраторы", "admins"),
      getItem("Модераторы", "moderators"),
      getItem("Пользователи", "regular-users"),
    ]),
  ]),
  getItem("Контент", "content", <FileOutlined />, [
    getItem("Статьи", "articles"),
    getItem("Категории", "categories", <FolderOutlined />),
    getItem("Медиафайлы", "media", <FolderOpenOutlined />),
  ]),
  getItem("Товары", "products", <ShoppingCartOutlined />),
  getItem("Аналитика", "analytics", <BarChartOutlined />),
  getItem("База данных", "database", <DatabaseOutlined />),
  getItem("Настройки", "settings", <SettingOutlined />),
];

const userMenuItems: MenuProps["items"] = [
  {
    key: "profile",
    icon: <UserOutlined />,
    label: "Профиль",
  },
  {
    key: "messages",
    icon: <MailOutlined />,
    label: "Сообщения",
  },
  {
    type: "divider",
  },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: "Выйти",
    danger: true,
  },
];

const DashboardPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState("dashboard");
  const navigate = useNavigate();
  const { token } = useToken();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onMenuClick: MenuProps["onClick"] = (e) => {
    setSelectedMenuKey(e.key);
    // Здесь можно добавить логику навигации
    console.log("Menu item clicked:", e.key);
  };

  const onUserMenuClick: MenuProps["onClick"] = async (e) => {
    if (e.key === "logout") {
      await logout();
      navigate("/login");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Боковое меню */}
      <Sider
        width={250}
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        trigger={null}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          boxShadow: "2px 0 8px 0 rgba(29, 35, 41, 0.05)",
          zIndex: 100,
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          {collapsed ? (
            <DashboardOutlined
              style={{ fontSize: 24, color: token.colorPrimary }}
            />
          ) : (
            <Title
              level={4}
              style={{
                margin: 0,
                color: token.colorPrimary,
                whiteSpace: "nowrap",
              }}
            >
              Админ Панель
            </Title>
          )}
        </div>

        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedMenuKey]}
          defaultOpenKeys={["users", "content"]}
          items={menuItems}
          onClick={onMenuClick}
          style={{ borderRight: 0 }}
        />
      </Sider>

      {/* Основной контент */}
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 250,
          transition: "all 0.2s",
        }}
      >
        {/* Шапка */}
        <Header
          style={{
            padding: "0 24px",
            background: token.colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
            position: "sticky",
            top: 0,
            zIndex: 50,
            height: 64,
          }}
        >
          <Space>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapsed}
              style={{ width: 64, height: 64 }}
            />
            <Breadcrumb
              items={[
                { title: "Главная" },
                {
                  title: selectedMenuKey === "dashboard" ? "Панель" : "Раздел",
                },
              ]}
            />
          </Space>

          <Space size="middle">
            <Badge count={5} size="small">
              <Button type="text" icon={<BellOutlined />} shape="circle" />
            </Badge>

            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: onUserMenuClick,
              }}
              placement="bottomRight"
            >
              <Space style={{ cursor: "pointer", padding: "8px 0" }}>
                <Avatar
                  style={{ backgroundColor: token.colorPrimary }}
                  icon={<UserOutlined />}
                />
                {!collapsed && (
                  <>
                    <Text strong>Администратор</Text>
                    <DownOutlined style={{ fontSize: 12 }} />
                  </>
                )}
              </Space>
            </Dropdown>
          </Space>
        </Header>

        {/* Контент */}
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
            minHeight: "calc(100vh - 112px)",
          }}
        >
          <Title level={3} style={{ marginBottom: 24 }}>
            {selectedMenuKey === "dashboard" ? "Панель управления" : "Раздел"}
          </Title>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card hoverable onClick={() => setSelectedMenuKey("users")}>
                <Space direction="vertical">
                  <UserOutlined
                    style={{ fontSize: 24, color: token.colorPrimary }}
                  />
                  <Title level={5} style={{ margin: 0 }}>
                    Пользователи
                  </Title>
                  <Text type="secondary">Управление пользователями</Text>
                </Space>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8} lg={6}>
              <Card hoverable onClick={() => setSelectedMenuKey("content")}>
                <Space direction="vertical">
                  <FileOutlined
                    style={{ fontSize: 24, color: token.colorSuccess }}
                  />
                  <Title level={5} style={{ margin: 0 }}>
                    Контент
                  </Title>
                  <Text type="secondary">Статьи и медиа</Text>
                </Space>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8} lg={6}>
              <Card hoverable onClick={() => setSelectedMenuKey("products")}>
                <Space direction="vertical">
                  <ShoppingCartOutlined
                    style={{ fontSize: 24, color: token.colorWarning }}
                  />
                  <Title level={5} style={{ margin: 0 }}>
                    Товары
                  </Title>
                  <Text type="secondary">Каталог продукции</Text>
                </Space>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8} lg={6}>
              <Card hoverable onClick={() => setSelectedMenuKey("analytics")}>
                <Space direction="vertical">
                  <BarChartOutlined
                    style={{ fontSize: 24, color: token.colorError }}
                  />
                  <Title level={5} style={{ margin: 0 }}>
                    Аналитика
                  </Title>
                  <Text type="secondary">Статистика и отчеты</Text>
                </Space>
              </Card>
            </Col>
          </Row>

          <Card title="Последние действия" style={{ marginTop: 24 }}>
            <Text type="secondary">
              Здесь будет отображаться активность в системе...
            </Text>
          </Card>
        </Content>

        {/* Подвал */}
        <Footer
          style={{
            textAlign: "center",
            padding: "16px 24px",
            background: token.colorBgContainer,
            borderTop: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <Text type="secondary">
            Админ Панель ©{new Date().getFullYear()} Версия 1.0.0
          </Text>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;
