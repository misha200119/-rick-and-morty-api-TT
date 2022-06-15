import React, {
  memo,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useAppSelector as useSelector,
} from '../../hooks/reduxTypedHooks';
import {
  selectors,
} from '../../store/listOfCharsSlice';
import { getPossiblePagesPagination } from '../../functions/getPossiblePagesPagination';

import styles from './PagesNavigator.module.scss';

export const PagesNavigator: React.FC<{}> = memo(() => {
  const navigate = useNavigate();
  const lastPage = useSelector(selectors.getPagesTotal);
  const searchParams = new URLSearchParams(useLocation().search);
  // eslint-disable-next-line radix
  const currentPage = parseInt((searchParams.get('page') || '1'));

  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setisPrevDisabled] = useState(false);

  const displayedPages = useMemo(() => {
    return getPossiblePagesPagination(currentPage, lastPage);
  }, [lastPage, currentPage]);

  useEffect(() => {
    if (currentPage > 1) {
      setisPrevDisabled(false);
    } else {
      setisPrevDisabled(true);
    }

    if (currentPage === lastPage) {
      setIsNextDisabled(true);
    } else {
      setIsNextDisabled(false);
    }
  }, [currentPage]);

  const back = useCallback((number) => {
    const newNum = (number - 1).toString();

    searchParams.set('page', newNum);
    navigate(`?page=${newNum}`);
  }, [navigate]);

  const next = useCallback((number) => {
    const newNum = (number + 1).toString();

    searchParams.set('page', newNum);
    navigate(`?page=${newNum}`);
  }, []);

  const setPage = useCallback((number) => {
    const newNum = (number).toString();

    searchParams.set('page', newNum);
    navigate(`?page=${newNum}`);
  }, []);

  return (
    <div className={
      classNames(
        styles.pagination,
        'bg-dark',
      )
    }
    >
      <div className={styles.pagination__btnWrap}>
        <button
          className={
            classNames(
              styles.pagination__btn,
            )
          }
          disabled={isPrevDisabled}
          type="button"
          onClick={() => {
            back(currentPage);
          }}
        >
          <p
            className={
              classNames(
                { pagination__btn_disabled: isPrevDisabled },
                'mb-0',
              )
            }
          >
            «
          </p>
        </button>

        <div className={styles.pagination__centerBtnsContainer}>
          {displayedPages.map(elem => {
            if (elem.value === '...') {
              return (
                <p
                  className={
                    classNames(
                      'pagination__etc',
                      'mb-0',
                    )
                  }
                  key={elem.key}
                >
                  {elem.value}
                </p>
              );
            }

            return (
              <button
                className={
                  classNames(
                    styles.pagination__btn,
                    { [styles.pagination__btn_selected]: elem.value === currentPage },
                  )
                }
                key={elem.key}
                type="button"
                onClick={() => {
                  setPage(elem.value);
                }}
              >
                {elem.value}
              </button>
            );
          })}
        </div>

        <button
          className={styles.pagination__btn}
          disabled={isNextDisabled}
          type="button"
          onClick={() => {
            next(currentPage);
          }}
        >
          <p
            className={
              classNames(
                { pagination__btn_disabled: isNextDisabled },
                'mb-0',
              )
            }
          >
            »
          </p>
        </button>
      </div>
    </div>
  );
});
