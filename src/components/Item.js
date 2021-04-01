import { useEffect } from 'react'
import { Field, useFormikContext } from 'formik'

export default function Item ({index, remove}) {
    const { values, setFieldValue } = useFormikContext()
    

    useEffect(() => {
        const total = values.items[index].quantity * values.items[index].price
        const rounded = Math.round((total + Number.EPSILON) * 100) / 100
        const accurateRound = Number(Math.round(total + "e2") + "e-2")
        setFieldValue(`items.${index}.total`, accurateRound || '0')
    }, [values.items[index].quantity, values.items[index].price])

    return (
        <div key={index} className="invoiceItemContainer">
            <label htmlFor={`items.${index}.name`}>Name</label>
            <Field name={`items.${index}.name`} placeholder="Service rendered" type="text"/>
            <label htmlFor={`items.${index}.quantity`}>Quantity</label>
            <Field name={`items.${index}.quantity`} placeholder="1" type="number"/>
            <label htmlFor={`items.${index}.price`}>Price</label>
            <Field name={`items.${index}.price`} placeholder="0" type="number"/>
            <label htmlFor={`items.${index}.total`}>Total</label>
            <Field name={`items.${index}.total`} placeholder="0" type="number" disabled/>
            {/* <div>{itemTotal(item.quantity, item.price)}</div> */}
            <button type="button" onClick={() => remove(index)}>X</button>
        </div>
    )
}