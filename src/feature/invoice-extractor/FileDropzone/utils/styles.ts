export const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 16,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

export const activeStyle = {
  borderColor: '#2196f3'
};

export const acceptStyle = {
  borderColor: '#00e676'
};

export const rejectStyle = {
  borderColor: '#ff1744'
};
