import React, { useEffect } from "react";
import type { ReactNode } from "react";
import { Modal } from "antd";
import type { ModalProps } from "antd";
import styles from "./CustomModal.module.css";

// Экспортируем интерфейс для использования в других файлах
export interface CustomModalProps extends ModalProps {
  children?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  children,
  isOpen,
  onClose,
  ...modalProps
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add(styles["modal-open"]);
    } else {
      document.body.style.overflow = "auto";
      document.body.classList.remove(styles["modal-open"]);
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.classList.remove(styles["modal-open"]);
    };
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      maskClosable={false}
      className={styles.modal}
      styles={{
        mask: {
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(0, 0, 0, 0.25)",
        },
      }}
      {...modalProps}
    >
      {children}
    </Modal>
  );
};