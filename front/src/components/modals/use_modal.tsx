import React, { useState } from "react";
import { CustomModal } from "./custom_modal";
import type { CustomModalProps } from "./custom_modal";

type ModalContent =
  | React.ReactNode
  | ((props: { onClose: () => void }) => React.ReactNode);

type ShowModalFn = (
  content: ModalContent,
  modalProps?: Omit<CustomModalProps, "isOpen" | "onClose" | "children">
) => void;

export const useModal = (): [ShowModalFn, React.ReactNode] => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ModalContent>(null);
  const [modalProps, setModalProps] = useState<
    Omit<CustomModalProps, "isOpen" | "onClose" | "children">
  >({});

  const showModal: ShowModalFn = (content, props = {}) => {
    setContent(content);
    setModalProps(props);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const modal = (
    <CustomModal isOpen={isOpen} onClose={hideModal} {...modalProps}>
      {typeof content === "function"
        ? content({ onClose: hideModal })
        : content}
    </CustomModal>
  );

  return [showModal, modal];
};
