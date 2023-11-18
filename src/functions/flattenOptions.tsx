export function flattenOptions(options: any[], parentId = null) {
    const result: any[] = [];
  
    options?.forEach((option) => {
      const newOption = { ...option };
  
      if (parentId !== null) {
        newOption.parent_option_id = parentId;
      }
  
      result.push(newOption);
  
      if (option.child_options && option.child_options.length > 0) {
        const childOptions = flattenOptions(option.child_options, option.id);
        result.push(...childOptions);
      }
    });
  
    return result;
  }