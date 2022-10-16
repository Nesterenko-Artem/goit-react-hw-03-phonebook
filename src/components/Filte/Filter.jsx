import PropTypes from 'prop-types';

export const Filter = ({ title, value, onChange }) => {
  return (
    <>
      <label htmlFor="filter">
        {title && <h5>{title}</h5>}
        <input
          value={value}
          onChange={onChange}
          type="text"
          name="filtr"
          placeholder="enter change"
        />
      </label>
      <br />
    </>
  );
};
Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
