import { format, parseISO } from 'date-fns';

export const formatDate = (isoString) => {
    console.log("is00000000",isoString)
    if (!isoString) return ''; // Handle undefined or null
  
    try {
      const date = parseISO(isoString);
      return format(date,'dd-MM-yyyy');
    } catch (error) {
      console.error('Invalid date string:', isoString);
      return '';
    }
  };