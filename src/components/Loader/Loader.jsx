import { Dna } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Dna
      visible={true}
      height="100"
      width="100"
      ariaLabel="dna-loading"
      wrapperStyle={{
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      wrapperClass="dna-wrapper"
    />
  );
};
