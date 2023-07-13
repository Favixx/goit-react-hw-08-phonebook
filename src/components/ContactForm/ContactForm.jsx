import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsOperations.js';
import { contactsSelector } from 'redux/selectors';

export const ContactForm = () => {
    const [contact, setContact] = useState({ name: '', phone: '' });
    const contacts = useSelector(contactsSelector);
    const dispatch = useDispatch();

    const handleChange = e => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value,
        });
    };

    const checkName = name => {
        return contacts.find(contact => contact.name === name);
    };

    const checkPhone = phone => {
        return contacts.find(contact => contact.phone === phone);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (checkName(contact.name) || checkPhone(contact.phone)) {
            setContact({
                name: '',
                phone: '',
            });
            alert('Такий контакт вже існує...');

            return;
        }

        const newContact = contact;
        dispatch(addContact(newContact));
        setContact({
            name: '',
            phone: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2 font-bold">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я])$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    placeholder="Name"
                    value={contact.name}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="number" className="block mb-2 font-bold">
                    Phone
                </label>
                <input
                    type="tel"
                    id="number"
                    name="phone"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    pattern="\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    placeholder="Phone"
                    required
                    value={contact.phone}
                    onChange={handleChange}
                />
            </div>
            <div className='flex justify-end'>
                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Add contact
                </button>
            </div>
        </form>
    );
};
