import React from "react";
import { Result, Button, Card, Space, Typography, Row, Col } from "antd";
import { HomeOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", background: "#f0f2f5" }}
    >
      <Col xs={24} sm={22} md={20} lg={18} xl={16}>
        <Card
          style={{
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Result
            status="404"
            title={
              <Title level={2} style={{ color: "#ff4d4f" }}>
                404 - Страница не найдена
              </Title>
            }
            subTitle={
              <Text type="secondary">
                Запрашиваемая страница не существует или была перемещена
              </Text>
            }
            extra={
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Space wrap>
                  <Button
                    type="primary"
                    icon={<HomeOutlined />}
                    onClick={() => navigate("/")}
                    size="large"
                  >
                    На главную
                  </Button>
                </Space>

                <div style={{ marginTop: 24 }}>
                  <Text type="secondary">Или свяжитесь с поддержкой:</Text>
                  <div style={{ marginTop: 8 }}>
                    <Button
                      icon={<MailOutlined />}
                      href="mailto:support@example.com"
                      type="link"
                    >
                      support@example.com
                    </Button>
                  </div>
                </div>
              </Space>
            }
          />
        </Card>
      </Col>
    </Row>
  );
};

export default NotFoundPage;
