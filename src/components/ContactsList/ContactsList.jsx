import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, deleteContact } from '../../redux/contactsOperations.js';
import { selectFilterSearch } from 'redux/selectors';
import { selectIsAuth } from 'redux/auth/authSelector.js';

const ContactsList = () => {
    const visibleContacts = useSelector(selectFilterSearch)
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth)
    useEffect(() => {
        if (isAuth) {
            dispatch(fetchContacts());
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
                            onClick={() => dispatch(deleteContact(contact.id))}
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
