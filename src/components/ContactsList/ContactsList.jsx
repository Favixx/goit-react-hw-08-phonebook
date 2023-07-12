import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllContacts, removeContact } from '../../redux/contactsOperations.js';
import { filterSearchSelector } from 'redux/selectors';
import { selectIsAuth } from 'redux/auth/authSelector.js';

const ContactsList = () => {
    const visibleContacts = useSelector(filterSearchSelector)
    const dispatch = useDispatch();
    useEffect(() => {
        if (isAuth) {
            dispatch(getContactsThunk());
        }
    }, [dispatch, isAuth]);

    return (
        <div>
            <ul className="divide-y divide-gray-200 flex justify-center gap-3">
                {visibleContacts.map((contact) => (
                    <li key={contact.id} className="py-4">
                        <span className="text-lg font-semibold">{contact.name}</span>
                        <span className="text-gray-500"> : {contact.phone}</span>
                        <button
                            className="ml-2 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                            onClick={() => dispatch(removeContact(contact.id))}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactsList;
