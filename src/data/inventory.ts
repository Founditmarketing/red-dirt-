export interface TractorItem {
    id: number;
    model: string;
    make: string;
    category: string;
}

export const inventoryData: TractorItem[] = [
    { id: 1, model: "T25", make: "TYM", category: "Sub-Compact Tractor" },
    { id: 2, model: "T264", make: "TYM", category: "Sub-Compact Tractor" },
    { id: 3, model: "T394", make: "TYM", category: "Compact Tractor" },
    { id: 4, model: "T474", make: "TYM", category: "Compact Tractor" },
    { id: 5, model: "T554", make: "TYM", category: "Utility Tractor" },
    { id: 6, model: "T574", make: "TYM", category: "Utility Tractor" },
    { id: 7, model: "T634", make: "TYM", category: "Utility Tractor" },
    { id: 8, model: "T654", make: "TYM", category: "Utility Tractor" },
    { id: 9, model: "T754", make: "TYM", category: "Utility Tractor" },
    { id: 10, model: "1626", make: "Mahindra", category: "Sub-Compact Tractor" },
    { id: 11, model: "2638", make: "Mahindra", category: "Compact Tractor" },
    { id: 12, model: "2645", make: "Mahindra", category: "Compact Tractor" },
    { id: 13, model: "3640", make: "Mahindra", category: "Compact Tractor" },
    { id: 14, model: "4540", make: "Mahindra", category: "Utility Tractor" },
    { id: 15, model: "5145", make: "Mahindra", category: "Utility Tractor" },
    { id: 16, model: "6065", make: "Mahindra", category: "Utility Tractor" },
    { id: 17, model: "6075", make: "Mahindra", category: "Utility Tractor" },
    { id: 18, model: "7085", make: "Mahindra", category: "Row Crop Tractor" },
    { id: 19, model: "8090", make: "Mahindra", category: "Row Crop Tractor" },
    { id: 20, model: "9110", make: "Mahindra", category: "Row Crop Tractor" },
    { id: 21, model: "9125", make: "Mahindra", category: "Row Crop Tractor" },
];

export const getTractorById = (id: string): TractorItem | undefined => {
    return inventoryData.find((t) => t.id.toString() === id);
};
