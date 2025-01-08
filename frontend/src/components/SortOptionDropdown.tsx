import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

type Props = {
    onChange: (value:string) => void;
    sortOption: string;
}

const SORT_OPTIONS = [
    { 
        label: "Best Match",
        value: "bestMatch",
    },
    { 
        label: "Delivery Price",
        value: "deliveryPrice",
    },
    { 
        label: "Estimated delivery time",
        value: "estimatedDeliveryTime",
    }
]

export default function SortOptionDropdown({onChange, sortOption}:Props) {

    const selectedLabel = SORT_OPTIONS.find(option => option.value === sortOption)?.label || SORT_OPTIONS[0].label;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
                <a href="#" className="w-full border-2 rounded px-3 py-1">
                    Sort by: {selectedLabel}
                </a>   
                <DropdownMenuContent>
                    {SORT_OPTIONS.map((option) => (
                        <DropdownMenuItem
                            key={`sort-otion${option.value}}`}
                            className="cursor-pointer"
                            onClick={() => onChange(option.value)}
                        >
                            {option.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>        
            </DropdownMenuTrigger>
        </DropdownMenu>
    )
}
