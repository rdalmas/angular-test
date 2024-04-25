interface BaseProduct {
    productID: string;
    productName: string;
}

export interface NewProduct extends BaseProduct {
    productManager?: string;
    salesStartDate: Date;
}

export interface Product extends BaseProduct {
    salesQ1: number;
    salesQ2: number;
    salesQ3: number;
    salesQ4: number;
    totalSales?: number;
}