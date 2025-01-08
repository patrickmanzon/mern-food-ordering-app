import { MenuItem } from "@/tpes"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

type Props = {
    menuItem: MenuItem,
    addToCart: (menuItem: MenuItem) => void
}


export default function MenutItem({menuItem, addToCart}:Props) {
    return (
        <Card className="cursor-pointer" onClick={() => addToCart(menuItem)}>
            <CardHeader>
                <CardTitle>{menuItem.name}</CardTitle>
            </CardHeader>
            <CardContent className="font-bold">
                ${(menuItem.price / 100).toFixed(2)}
            </CardContent>
        </Card>
    )
}
