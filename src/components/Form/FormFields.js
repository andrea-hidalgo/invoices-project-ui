import Item from './Item';
import InputField from './InputField'
import { Field, useFormikContext, FieldArray} from 'formik';

export default function FormFields ({}) {
    const { values } = useFormikContext()
    return(
        <div>
            <div className="bill-form-container address-top">
                <h3>Bill From</h3>
                <InputField name="senderAddress.street" type="input" label="Street Address"/>
                <div className="address-bottom">
                    <InputField name="senderAddress.city" type="input" label="City"/>
                    <InputField name="senderAddress.state" type="input" label="State"/>
                    <InputField name="senderAddress.zipCode" type="input" label="Zip Code"/>
                    <InputField name="senderAddress.country" type="input" label="Country"/>
                </div>
            </div>
            <div className="bill-to container">
                <h3>Bill To</h3>
                <InputField name="clientName" label="Client Name" type="input"/>
                <InputField name="clientEmail" label="Client Email" type="email"/>
                <div className="address-top">
                    <InputField name="clientAddress.street" type="input" label="Street Address"/>
                </div>
                <div className="address-bottom">
                    <InputField name="clientAddress.city" type="input" label="City"/>
                    <InputField name="clientAddress.state" type="input" label="State"/>
                    <InputField name="clientAddress.zipCode" type="input" label="Zip Code"/>
                    <InputField name="clientAddress.country" type="input" label="Country"/>
                </div>
            </div>

            <div className="invoice-payments">
                <InputField name="createdAt" type="date" label="Invoice Date"/>
                <Field as="select" name="paymentTerms">
                    <option value={1}>Net 1 Day</option>
                    <option value={7}>Net 7 Days</option>
                    <option value={14}>Net 14 Days</option>
                    <option value={30}>Net 30 Days</option>
                </Field>
            </div>

            <InputField name="description" label="Project Description" type="input" placeholder="e.g Graphic Design Service"/>
            <div className="items-form-container">
                <h2>Item List</h2>
                <FieldArray name="items">
                    {({remove, push})=> (
                        <div>
                            {
                            values.items.map((item, index) => {
                                return (
                                    <Item key={index} index={index} item={item} remove={remove} values={values} />
                                );
                            })
                            }
                            <button type="button" onClick={() => push({name: '', quantity: 1, price: 0, total: 0})}>+ Add New Item</button> 
                        </div>
                    )}
                </FieldArray>
            </div>
        </div>
    )
}