class InputField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    render(){return this.label, this.fieldType}
}

class TextAreaField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    render(){return this.label, this.fieldType};
}

class DateField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    render(){return this.label, this.fieldType};
}

class EmailField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    render(){return this.label, this.fieldType};
}

class SelectedField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    render(){return this.label, this.fieldType};
}

class CheckboxField implements Field{
    name: string;
    label: string;
    fieldType: FieldType;
    value: string;
    render(){return this.label, this.fieldType};
}