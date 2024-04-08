import {Review} from '../../types/review';
import OneReview from '../review/review.tsx';

type ReviewsOfListProps = {
  reviews: Review[];
};

function ReviewsOfList({reviews}: ReviewsOfListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <OneReview key={review.id} review={review}/>
      ))}
    </ul>
  );
}

export default ReviewsOfList;
