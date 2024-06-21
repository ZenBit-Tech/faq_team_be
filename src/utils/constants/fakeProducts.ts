import {
  fake_product_creation_date,
  lorem_description,
  max_price,
  min_price,
  number_of_products,
  product_categories,
  product_colors,
  product_id_seed,
  product_names,
  product_sizes,
  product_styles,
  products_quantity,
  vendor_ids,
} from 'src/utils/constants/fakeConstants';
import {
  generateSeededUUIDs,
  getRandomIntInclusive,
} from 'src/utils/constants/seedFunctions';

const product_ids = generateSeededUUIDs(product_id_seed, number_of_products);

const products = [];

for (let i = 0; i < product_ids.length; i++) {
  const product = {
    id: product_ids[i],
    vendor_id: vendor_ids[getRandomIntInclusive(0, vendor_ids.length - 1)],
    product_name:
      product_names[getRandomIntInclusive(0, product_names.length - 1)],
    description: lorem_description,
    quantity: products_quantity,
    price: getRandomIntInclusive(min_price, max_price),
    category:
      product_categories[
        getRandomIntInclusive(0, product_categories.length - 1)
      ],
    color: product_colors[getRandomIntInclusive(0, product_colors.length - 1)],
    size: product_sizes[getRandomIntInclusive(0, product_sizes.length - 1)],
    style: product_styles[getRandomIntInclusive(0, product_styles.length - 1)],
    created_at: fake_product_creation_date,
  };
  products.push(product);
}

export { products };
