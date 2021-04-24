import Item from './Item';
import InputField from './InputField'
import { Field, useFormikContext, FieldArray} from 'formik';

export default function FormFields ({}) {
    const { values } = useFormikContext()
    return(
        <div className="invoice-fields-container">
            <div className="bill-form-container address-top">
                <h4>Bill From</h4>
                <InputField className="full-width" name="senderAddress.street" type="input" label="Street Address"/>
                <div className="address-bottom">
                    <div>
                        <InputField name="senderAddress.city" type="input" label="City"/>
                        <InputField name="senderAddress.state" type="input" label="State"/>
                        <InputField name="senderAddress.zipCode" type="input" label="Zip Code"/>
                    </div>
                    <InputField name="senderAddress.country" type="input" label="Country" className="full-width"/>
                </div>
            </div>
            <div className="bill-to container">
                <h4>Bill To</h4>
                <InputField name="clientName" label="Client Name" type="input" className="full-width"/>
                <InputField name="clientEmail" label="Client Email" type="email" className="full-width"/>
                <div className="address-top">
                    <InputField name="clientAddress.street" type="input" label="Street Address" className="full-width"/>
                </div>
                <div className="address-bottom">
                    <div>
                        <InputField name="clientAddress.city" type="input" label="City"/>
                        <InputField name="clientAddress.state" type="input" label="State"/>
                        <InputField name="clientAddress.zipCode" type="input" label="Zip Code"/>
                    </div>
                    <InputField name="clientAddress.country" type="input" label="Country" className="full-width"/>
                </div>
            </div>

            <div className="invoice-payments">
                <InputField name="invoiceDate" type="date" label="Invoice Date"/>
                <div className="input-field-container">
                <label className="body1" htmlFor="paymentTerms">Payment Terms</label>
                <Field as="select" name="paymentTerms">
                    <option value={1}>Net 1 Day</option>
                    <option value={7}>Net 7 Days</option>
                    <option value={14}>Net 14 Days</option>
                    <option value={30}>Net 30 Days</option>
                </Field>
                </div>
            </div>

            <InputField name="description" label="Project Description" type="input" placeholder="e.g Graphic Design Service" className="full-width"/>
            <div className="items-list-form-container">
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
                            <button type="button" className="new-item-btn button3" onClick={() => push({name: '', quantity: 1, price: 0, total: 0})}>+ Add New Item</button> 
                        </div>
                    )}
                </FieldArray>
            </div>
        </div>
    )
}