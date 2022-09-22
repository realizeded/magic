import { EFormField } from './constant';
export interface ITextForm {
    [EFormField.text]: string;
    [EFormField.name]: string;
    [EFormField.fontFamily]: string;
    [EFormField.fontSize]: number;
    [EFormField.textAlign]: string;
    [EFormField.verticalAlign]: string;
    [EFormField.color]: string;
    [EFormField.lineHeight]: string;
    [EFormField.top]: number;
    [EFormField.left]: number;
    [EFormField.width]: number;
    [EFormField.height]: number;
}
// fontSize: '17px',
// fontWeight: 'bold',
// background: 'rgb(245, 245, 245)',
// padding: '12px',
// color: 'rgb(51, 51, 51)',
// borderRadius: '2px',
// cursor: 'pointer',
// marginBottom: '8px',
// textAlign: 'center'
