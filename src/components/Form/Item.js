import { useEffect } from 'react'
import { Field, useFormikContext} from 'formik';
import InputField from './InputField'

export default function Item ({index, remove}) {
    const { values, setFieldValue } = useFormikContext()
    
    const qty=values.items[index].quantity;
    const price=values.items[index].price;

    useEffect(() => {
        const total = qty * price;
        const accurateRound = Number(Math.round(total + "e2") + "e-2")
        setFieldValue(`items.${index}.total`, accurateRound || '0')
    }, [qty, price])

    return (
        <div className="invoice-form-item-container">
            <InputField name={`items.${index}.name`} placeholder="Service rendered" type="input" label="Item Name"/>
            <div>
                <InputField name={`items.${index}.quantity`} placeholder="1" type="number" label="Qty."/>
                <InputField name={`items.${index}.price`} placeholder="0" type="number" label="Price"/>
                <div className="input-field-container">
                    <label className="body1" htmlFor={`items.${index}.total`}>Total</label>
                    <Field name={`items.${index}.total`} placeholder="0" type="number" disabled/>
                </div>
                <button className="delete-icon" onClick={() => remove(index)}>x</button>
            </div>
        </div>
    )
}
