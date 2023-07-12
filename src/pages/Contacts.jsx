import { ContactForm } from 'components/ContactForm/ContactForm'
import ContactsList from 'components/ContactsList/ContactsList'
import { Filter } from 'components/Filter/Filter'
import React from 'react'

export const Contacts = () => {
    return (
        <div className='mx-auto'>
            <ContactForm />
            <Filter />
            <ContactsList />
        </div>
    )
}
