import { useEffect } from 'react'
import { Field, useFormikContext } from 'formik';
import { TextField } from '@material-ui/core';

export default function Item ({index, remove, InputField}) {
    const { values, setFieldValue } = useFormikContext()
    
    const qty=values.items[index].quantity;
    const price=values.items[index].price;

    useEffect(() => {
        const total = qty * price;
        const accurateRound = Number(Math.round(total + "e2") + "e-2")
        setFieldValue(`items.${index}.total`, accurateRound || '0')
    }, [qty, price])

    return (
        <div key={index} className="invoiceItemContainer">
            <InputField name={`items.${index}.name`} placeholder="Service rendered" type="input" label="Item Name"/>
            <InputField name={`items.${index}.quantity`} placeholder="1" type="number" label="Qty."/>
            <InputField name={`items.${index}.price`} placeholder="0" type="number" label="Price"/>
            <Field name={`items.${index}.total`} placeholder="0" type="number" disabled label="Total" as={TextField} variant="standard"/>
            <button type="button" onClick={() => remove(index)}>X</button>
        </div>
    )
}