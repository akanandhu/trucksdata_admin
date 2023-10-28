export function removeUnderScore(data_type: string) {
    const words = data_type.split('_');
    const formattedDataType = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    return formattedDataType;
  }