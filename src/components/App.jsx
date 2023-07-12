import ContactsList from 'components/ContactsList/ContactsList';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';

export const App = () => {
  return (
    <div className='mx-auto'>
      <ContactForm />

      <Filter />

      <ContactsList />
    </div>
  );
};