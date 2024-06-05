export interface Product {
    name: string;
    price: number;
    description: string;
    image: string;
    clearance: boolean;
    quantity: number;
    stock: number;
    url: string;
    category: string;
}

export interface ProductItem {
    product: Product;
    quantity: number;
}