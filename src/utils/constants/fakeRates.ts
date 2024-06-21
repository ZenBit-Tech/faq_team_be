import {
  buyer_ids,
  max_rate,
  min_rate,
  number_of_rates,
  rate_id,
  vendor_ids,
} from 'src/utils/constants/fakeConstants';
import {
  generateSeededUUIDs,
  getRandomIntInclusive,
} from 'src/utils/constants/seedFunctions';

const rate_ids = generateSeededUUIDs(rate_id, number_of_rates);

const rates = [];

let index = 0;

buyer_ids.map((buyer_id) => {
  vendor_ids.map((vendor_id) => {
    const rate = {
      id: rate_ids[index],
      rater_id: buyer_id,
      user_target_id: vendor_id,
      rate: getRandomIntInclusive(min_rate, max_rate),
    };

    index++;

    rates.push(rate);
  });
});

vendor_ids.map((vendor_id) => {
  buyer_ids.map((buyer_id) => {
    const rate = {
      id: rate_ids[index],
      rater_id: vendor_id,
      user_target_id: buyer_id,
      rate: getRandomIntInclusive(min_rate, max_rate),
    };

    index++;

    rates.push(rate);
  });
});

export { rates };
