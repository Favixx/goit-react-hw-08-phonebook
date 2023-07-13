import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from '../../redux/contactsSlice';
import { filterSelector } from '../../redux/selectors';

export const Filter = () => {
  const filter = useSelector(filterSelector);
  const dispatch = useDispatch();

  const handleFilter = e => {
    dispatch(getFilter(e.target.value));
  };

  return (
    <div className="mb-4 flex justify-center items-center mx-auto flex-col max-w-sm">
      <label className="block mb-2 font-bold self-start" htmlFor="filter">
        Find contacts by name
      </label>
      <input
        className="px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 w-[384px]"
        type="text"
        name="filter"
        onChange={handleFilter}
        value={filter}
      />
    </div>
  );
};
