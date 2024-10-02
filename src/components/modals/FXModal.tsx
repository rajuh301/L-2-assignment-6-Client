import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { ReactNode } from "react";

interface IProps {
    buttonText: string;
    title: string;
    children: ReactNode;
    buttonVariant?: "light" | "solid" | "bordered" | "flat" | "faded" | "shadow" | "ghost" | undefined;
    buttonClassName?: string;
}

export default function FXModal({ buttonText, title, children, buttonClassName, buttonVariant = 'light' }: IProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button className={buttonClassName} variant={buttonVariant} onPress={onOpen}>{title}</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{buttonText}</ModalHeader>
                            <ModalBody>


                                {children}


                            </ModalBody>
                            {/* <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter> */}
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}