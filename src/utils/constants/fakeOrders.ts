import {
  generateSeededUUIDs,
  getRandomDateWithinLastYear,
  getRandomIntInclusive,
} from 'src/utils/constants/seedFunctions';

const order_id_seed = 'order';
const product_id_seed = 'product';
const number_of_products = 1000;
const order_ids = generateSeededUUIDs(order_id_seed, number_of_products);

const buyer_ids = [
  '8a6e0804-2bd0-4672-b79d-d97027f9071a',
  'e7d3e89a-2b3d-4f7d-880e-bf8299fbf5b3',
  'cfe48439-5b61-4e2e-8a7d-9a5d7e2e93df',
  '5b7d087c-3d5d-43f0-8a3b-5e1e3d5b3a5d',
  '1a7e8f4a-6d3d-49e7-9a3b-6d3b5d3a6b7e',
];

const product_ids = generateSeededUUIDs(product_id_seed, number_of_products);

const orders = [];
for (let i = 0; i < order_ids.length; i++) {
  const order = {
    id: order_ids[i],
    buyer_id: buyer_ids[getRandomIntInclusive(0, 4)],
    product_id: product_ids[i],
    price: getRandomIntInclusive(1, 1000),
    created_at: getRandomDateWithinLastYear(),
  };
  orders.push(order);
}

export { orders };
