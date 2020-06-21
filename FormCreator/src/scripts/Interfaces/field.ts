import { FieldType } from "../Enumerators/fieldType";

export interface Field {
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    options?: Array<string>;
    render:() => HTMLDivElement;
    getValue(): string;
}