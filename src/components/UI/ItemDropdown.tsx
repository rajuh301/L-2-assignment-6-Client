import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { FaSortAmountDownAlt } from 'react-icons/fa';

interface ItemDropdownProps {
    onOpen: () => void; 
}

export default function ItemDropdown({ onOpen }: ItemDropdownProps) {
    const items = [
        {
            key: "edit",
            label: "Edit post",
        },
        {
            key: "delete",
            label: "Delete post",
        },
    ];

    return (
        <Dropdown>
            <DropdownTrigger>
                <button className="p-5">
                    <FaSortAmountDownAlt />
                </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions" items={items}>
                {(item) => (
                    <DropdownItem
                        key={item.key}
                        color={item.key === "edit" ? "danger" : "default"}
                        className={item.key === "edit" ? "text-danger" : ""}
                        onClick={item.key === "edit" ? onOpen : undefined} // Call onOpen when delete is clicked
                    >
                        {item.label}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
}
