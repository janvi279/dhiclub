export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'Emergency':
      return 'bg-purple-100 text-purple-600 !important';
    case 'High':
      return 'bg-red-100 text-red-600 !important';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-600 !important';
    case 'Low':
      return 'bg-green-100 text-green-600 !important';
    default:
      return 'bg-gray-100 text-gray-600 !important';
  }
};


export const generateRandomString = (length, isNumber = false) => {
  let result = '';
  const characters = isNumber
    ? '0123456789'
    : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};


export const hasPermission = (permissions, key, action) => {
  if (permissions[key]) {
    return permissions[key].includes(action);
  }
  return false;
};

export const hexToRgb = (hex) => {
  hex = hex.replace('#', '');

  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  // Return the RGB values with 1 decimal precision
  return {
    r: parseFloat(r.toFixed(1)),
    g: parseFloat(g.toFixed(1)),
    b: parseFloat(b.toFixed(1)),
  };
};

