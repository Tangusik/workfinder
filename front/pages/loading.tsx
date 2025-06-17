import React, { useState, useEffect } from "react";
import {
  Layout,
  Card,
  Typography,
  Space,
  Button,
  Result,
  Progress,
  Spin,
  Alert,
} from "antd";
import {
  CheckCircleOutlined,
  LoadingOutlined,
  RocketOutlined,
  HomeOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { verify } from "../src/api/auth/verify";

const { Content } = Layout;
const { Title, Text } = Typography;

const LoadingPage: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [actionName] = useState("Обновление данных системы");

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.floor(Math.random() * 15) + 5;
        if (newProgress >= 100) {
          clearInterval(timer);
          executeFinalAction();
          return 100;
        }
        return newProgress;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const executeFinalAction = async () => {
    try {
      await verify(params.code);
      setStatus("success");
      setTimeout(() => navigate("/"), 2500);
    } catch (error) {
      let message =
        "Произошла ошибка при подтверждении почты. Пожалуйста, попробуйте позже.";

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      } else if (typeof error === "object" && error !== null) {
        // Для axios ошибок
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        if (axiosError.response?.data?.message) {
          message = axiosError.response.data.message;
        }
      }

      setStatus("error");
      setErrorMessage(message);
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleRetry = () => {
    setStatus("loading");
    setProgress(0);
    setErrorMessage("");
    // Повторная попытка выполнить действие
    setTimeout(() => executeFinalAction(), 500);
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "24px",
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: 600,
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          {status === "loading" ? (
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
              />

              <Title level={3}>{actionName}</Title>

              <Progress
                percent={progress}
                status="active"
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
              />

              <Text type="secondary">Пожалуйста, подождите...</Text>

              <Button
                type="primary"
                icon={<RocketOutlined />}
                loading
                size="large"
              >
                Подтверждаем почту
              </Button>
            </Space>
          ) : status === "success" ? (
            <Result
              icon={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
              title="Почта успешно подтверждена!"
              subTitle="Необходимо выполнить вход. Вы будете перенаправлены на страницу входа."
              extra={
                <Button
                  type="primary"
                  icon={<HomeOutlined />}
                  onClick={handleGoHome}
                >
                  Вход
                </Button>
              }
            />
          ) : (
            <Space direction="vertical" size="large">
              <Result
                icon={<CloseCircleOutlined style={{ color: "#ff4d4f" }} />}
                title="Ошибка подтверждения"
                subTitle="Не удалось подтвердить вашу почту"
              />

              <Alert
                message="Детали ошибки"
                description={errorMessage}
                type="error"
                showIcon
                style={{ textAlign: "left" }}
              />

              <Space>
                <Button
                  type="primary"
                  icon={<HomeOutlined />}
                  onClick={handleGoHome}
                >
                  На главную
                </Button>
                <Button icon={<RocketOutlined />} onClick={handleRetry}>
                  Попробовать снова
                </Button>
              </Space>
            </Space>
          )}
        </Card>
      </Content>
    </Layout>
  );
};

export default LoadingPage;
