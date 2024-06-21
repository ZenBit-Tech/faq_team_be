import {
  buyer_ids,
  lorem_description,
  number_of_reviews,
  review_id,
  vendor_ids,
} from 'src/utils/constants/fakeConstants';
import { generateSeededUUIDs } from 'src/utils/constants/seedFunctions';

const review_ids = generateSeededUUIDs(review_id, number_of_reviews);

const reviews = [];

let index = 0;

buyer_ids.map((buyer_id) => {
  vendor_ids.map((vendor_id) => {
    const review = {
      id: review_ids[index],
      reviewer_id: buyer_id,
      review_target_id: vendor_id,
      review_text: lorem_description,
    };

    index++;

    reviews.push(review);
  });
});

vendor_ids.map((vendor_id) => {
  buyer_ids.map((buyer_id) => {
    const review = {
      id: review_ids[index],
      reviewer_id: vendor_id,
      review_target_id: buyer_id,
      review_text: lorem_description,
    };

    index++;

    reviews.push(review);
  });
});

export { reviews };
