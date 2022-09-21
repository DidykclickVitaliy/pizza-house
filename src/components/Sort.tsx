import React from "react";
import { useDispatch } from "react-redux";

import { setSort, SortType } from "../redux/filter/slice";

type SortItem = {
  name: string;
  sortProperty: string;
};

type SortProps = {
  value: {
    name: string;
    sortProperty: string;
  };
};

export const sortTypes: SortItem[] = [
  { name: "popularity (DESC)", sortProperty: "rating" },
  { name: "popularity (ASC) ", sortProperty: "-rating" },
  { name: "price (DESC)", sortProperty: "price" },
  { name: "price (ASC) ", sortProperty: "-price" },
  { name: "alphabet (DESC)", sortProperty: "title" },
  { name: "alphabet (ASC) ", sortProperty: "-title" },
];

export const Sort: React.FC<SortProps> = ({ value }) => {
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // const _event = event as MouseEvent & {
      //   path: Node[]
      // }
      // if (!event.composedPath().includes(sortRef.current as EventTarget)) {}
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setIsVisible(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onClickSortType = (obj: SortItem) => {
    dispatch(setSort(obj as SortType));
    setIsVisible(false);
  };

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        {
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
        }

        <b>Sorted by:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{value.name}</span>
      </div>
      <div className={`sort__popup ${isVisible ? "" : "hidden"}`}>
        <ul>
          {sortTypes.map((obj, index) => {
            return (
              <li
                key={index}
                className={
                  value.sortProperty === obj.sortProperty ? "active" : ""
                }
                onClick={() => onClickSortType(obj)}
              >
                {obj.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};