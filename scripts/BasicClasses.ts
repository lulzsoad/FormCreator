class InputField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    render: () => HTMLDivElement;
}

class TextAreaField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    render: () => HTMLDivElement;
}

class DateField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    render: () => HTMLDivElement;
}

class EmailField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    render: () => HTMLDivElement;
}

class SelectedField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    render: () => HTMLDivElement;
}

class CheckboxField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    render: () => HTMLDivElement;
}