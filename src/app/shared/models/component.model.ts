import { DataComponentEcommerce } from "./dataComponent.model";

export interface ComponentEcommerce {
    id: number | null;
    index: number;
    type: string;
    dataList: DataComponentEcommerce[];
}