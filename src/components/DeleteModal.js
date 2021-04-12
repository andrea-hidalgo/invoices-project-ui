import React from 'react';

export default function DeleteModal (props) {
    return (
        <>
        <div className="delete-modal-container">
            <div className="delete-info">
                <h2>Confirm Deletion</h2>
                <p className="body1">Are you sure you want to delete invoice #{props.invoice.invoiceId}? This action cannot be undone.</p>
                <div className="delete-button-container">
                    <button className="button3" onClick={() => {props.toggleDeleteModal()}}>Cancel</button>
                    <button className="button5" onClick={() => {props.handleDelete()}}>Delete</button>
                </div>
            </div>
        </div>
        <div className="delete-opaque"></div>
        </>
    )
}