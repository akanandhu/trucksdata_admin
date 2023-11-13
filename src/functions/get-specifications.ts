export function getSpecs(step: number, specs: any[]) {
  const specifications = specs?.filter(obj => obj?.specification?.specification_category_id === step)

  return specifications
}
