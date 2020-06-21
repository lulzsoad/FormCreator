import { Field } from "../Interfaces/field";
import { FieldType } from "../Enumerators/fieldType";

export class InputField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    render: () => HTMLDivElement;
    getValue(){
        return this.value;
    }

    constructor (name: string, label: string, fieldType: FieldType, value: string) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
}

export class TextAreaField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    render: () => HTMLDivElement;
    getValue(){
        return this.value;
    }

    constructor (name: string, label: string, fieldType: FieldType, value: string) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
}

export class DateField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    render: () => HTMLDivElement;
    getValue(){
        return this.value;
    }

    constructor (name: string, label: string, fieldType: FieldType, value: string) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
}

export class EmailField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    render: () => HTMLDivElement;
    getValue(){
        return this.value;
    }

    constructor (name: string, label: string, fieldType: FieldType, value: string) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
}

export class SelectedField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    options: Array<string>;
    render: () => HTMLDivElement;
    getValue(){
        return this.value;
    }

    constructor (name: string, label: string, fieldType: FieldType, value: string, options: Array<string>) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
        this.options = options;
    }
}

export class CheckboxField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    render: () => HTMLDivElement;
    getValue(){
        return this.value;
    }

    constructor (name: string, label: string, fieldType: FieldType, value: string) {
        this.name = name;
        this.label = label;
        this.fieldType = fieldType;
        this.value = value;
    }
}