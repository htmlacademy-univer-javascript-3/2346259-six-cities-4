import {Review} from '../../types/review';
import {REVIEW_SIZE} from '../../consts/consts.tsx';
import {getRating} from '../../utils.ts';

type OneReviewProps = {
  review: Review;
};

function OneReview({review}: OneReviewProps): JSX.Element {
  const {date, user, rating, comment} = review;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width={REVIEW_SIZE} height={REVIEW_SIZE}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name"> {user.name} </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: getRating(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={new Date(date).toDateString()}>{new Date(date).toDateString()}</time>
      </div>
    </li>
  );
}

export default OneReview;
