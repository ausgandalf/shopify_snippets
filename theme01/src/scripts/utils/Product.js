/*
 * Get's the badge to display for a product
 *
 * @param {Object} product: the product to get a badge for
 *
 * @return {Object}: the badge to display
 */
export const getProductLabels = (product) => {
  let labels = [];
  let oos_label = product.tags.find(tag => tag.toLowerCase() == 'out of stock');
  if (oos_label) {
    labels.push(oos_label);
    return;
  }
  let sale_label = product.tags.find(tag => tag.toLowerCase() == 'sale');
  if (sale_label) {
    labels.push(sale_label);
  }
  let pfs_labels = product.tags.filter(tag => tag.includes('pfs:label-')).map(tag => tag.replace('pfs:label-', ''));
  labels = labels.concat(pfs_labels);
  return labels.slice(0, 2);
}
