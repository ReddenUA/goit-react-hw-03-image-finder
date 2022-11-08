import PropTypes from 'prop-types';
import { MoreBtn } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <MoreBtn type="button" onClick={() => onClick()}>
      Load more...
    </MoreBtn>
  );
};

Button.protTypes = {
  onClick: PropTypes.func.isRequired,
};
