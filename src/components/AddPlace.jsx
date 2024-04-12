export const AddPlace = ({ setIsOpenAddPlace }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 30,
        right: 40,
        background: '#039871',
        color: 'white',
        width: 80,
        zIndex: 9998,
        borderRadius: '50%',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 60,
        height: 80,
      }}
      onClick={() =>
        setIsOpenAddPlace((prev) => {
          return !prev;
        })
      }
    >
      +
    </div>
  );
};
