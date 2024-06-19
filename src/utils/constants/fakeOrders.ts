import {
  buyer_ids,
  max_price,
  min_price,
  number_of_orders,
  number_of_products,
  order_id_seed,
  product_id_seed,
} from 'src/utils/constants/fakeConstants';
import {
  generateSeededUUIDs,
  getRandomDateWithinLastYear,
  getRandomIntInclusive,
} from 'src/utils/constants/seedFunctions';

const order_ids = generateSeededUUIDs(order_id_seed, number_of_orders);
const product_ids = generateSeededUUIDs(product_id_seed, number_of_products);

const orders = [];

for (let i = 0; i < order_ids.length; i++) {
  const order = {
    id: order_ids[i],
    buyer_id: buyer_ids[getRandomIntInclusive(0, buyer_ids.length - 1)],
    product_id: product_ids[i],
    price: getRandomIntInclusive(min_price, max_price),
    created_at: getRandomDateWithinLastYear(),
  };
  orders.push(order);
}

export { orders };
