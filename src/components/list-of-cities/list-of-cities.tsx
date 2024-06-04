import {useAppDispatch, useAppSelector} from '../../hooks';
import {memo} from 'react';
import {cityChange} from '../../store/other-process/other-process';
import {getCity} from '../../store/other-process/selectors';


type CitiesListProps = {
  cities: { name: string; id: number }[];
};

type CityProps = {
  name: string;
  cityChangeName: (city: string) => void;
  isActive: boolean;
};
const City = ({name, cityChangeName, isActive}: CityProps): JSX.Element => (
  <li className="locations__item" onClick={() => cityChangeName(name)}>
    <a className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}
      href="#"
    >
      <span>{name}</span>
    </a>
  </li>
);

function CitiesList({cities}: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const curCity = useAppSelector(getCity);
  const handleCityChange = (city: string) => {
    dispatch(cityChange(city));
  };
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <City
          key={city.id}
          name={city.name}
          cityChangeName={handleCityChange}
          isActive={city.name === curCity}
        />
      ))}
    </ul>
  );
}

const CitiesListMemo = memo(CitiesList);
export default CitiesListMemo;
