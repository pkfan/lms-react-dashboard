// source
// https://codepen.io/AdamMorsi/pen/mdqqpyX

//react
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useContext,
  createContext,
} from 'https://esm.sh/react@18.2.0';
//react dom
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0';
//react router dom
import { BrowserRouter, Link } from 'https://cdn.skypack.dev/react-router-dom@5.3.4';
/******** helpers ********/
//flatten array of arrays
function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

//get object nested value from string, (e.g: 'person.name')
function getNestedValue({ key, obj }) {
  return key.split('.').reduce(function (row, prop) {
    return row && row[prop];
  }, obj);
}

function getTableDataCellWidth(width, field, columns, actions) {
  const actionsColumnWidth = actions.length * 32,
    finalActionsColumnsWidth = actionsColumnWidth > 100 ? actionsColumnWidth : 100;

  return width
    ? width
    : field === 'actionsCol'
    ? finalActionsColumnsWidth
    : `calc((100% - ${
        columns.some((el) => el.field === 'actionsCol') ? `${finalActionsColumnsWidth}px` : '0'
      }) / ${
        columns.some((el) => el.field === 'actionsCol') ? columns.length - 1 : columns.length
      })`;
}

function createWrapperAndAppendToBody(wrapper, wrapperElementId) {
  const wrapperElement = document.createElement(wrapper);
  wrapperElement.setAttribute('id', wrapperElementId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

const regex = /(auto|scroll)/;

const style = (node, prop) => getComputedStyle(node, null).getPropertyValue(prop);

const scroll = (node) =>
  regex.test(style(node, 'overflow') + style(node, 'overflow-y') + style(node, 'overflow-x'));

// get the first scrollable parent
const getScrollParent = (node) =>
  !node || node === document.body
    ? document.body
    : scroll(node)
    ? node
    : getScrollParent(node.parentNode);

// get {top, left} of the required element
function getElementOffset(el) {
  let _x = 0,
    _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
}

/******** constants ********/
const rowsPerPageOptions = [
  { value: '5', displayValue: '5 rows' },
  { value: '10', displayValue: '10 rows' },
  { value: '20', displayValue: '20 rows' },
  { value: '30', displayValue: '30 rows' },
  { value: '40', displayValue: '40 rows' },
];

const maxMenuHeight = 300;

/******** icons ********/
const ChevronDownIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={15} height={15} {...props}>
    <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
  </svg>
);

const ChevronUpIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={15} height={15} {...props}>
    <path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z" />
  </svg>
);

const ChevronLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={15} height={15} {...props}>
    <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" />
  </svg>
);

const ChevronRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={15} height={15} {...props}>
    <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
  </svg>
);

const DoubleChevronLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <path d="M11.707 16.293 7.414 12l4.293-4.293a.999.999 0 1 0-1.414-1.414l-5 5a.999.999 0 0 0 0 1.414l5 5a.999.999 0 1 0 1.414-1.414zm7 0L14.414 12l4.293-4.293a.999.999 0 1 0-1.414-1.414l-5 5a.999.999 0 0 0 0 1.414l5 5a.999.999 0 1 0 1.414-1.414z" />
  </svg>
);

const DoubleChevronRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <path d="m13.707 17.707 5-5a.999.999 0 0 0 0-1.414l-5-5a.999.999 0 1 0-1.414 1.414L16.586 12l-4.293 4.293a.999.999 0 1 0 1.414 1.414zm-7 0 5-5a.999.999 0 0 0 0-1.414l-5-5a.999.999 0 1 0-1.414 1.414L9.586 12l-4.293 4.293a.999.999 0 1 0 1.414 1.414z" />
  </svg>
);

const MoveIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={10} height={16} fill="none" {...props}>
    <path
      d="M4 14c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2ZM2 6C.9 6 0 6.9 0 8s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm0-6C.9 0 0 .9 0 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z"
      fill="#64748B"
    />
  </svg>
);

const TrashIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={16} height={16} {...props}>
    <path d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm415.2 56.7L394.8 467c-1.6 25.3-22.6 45-47.9 45H101.1c-25.3 0-46.3-19.7-47.9-45L32.8 140.7c-.4-6.9 5.1-12.7 12-12.7h358.5c6.8 0 12.3 5.8 11.9 12.7z" />
  </svg>
);

/******** custom hooks ********/
const useTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  return { isTouchDevice };
};

const useClickAway = (ref, onOutsideClickCallback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      onOutsideClickCallback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

const useDebounce = (callback, delay) => {
  const debouncedFn = useRef(_.debounce(callback, delay));

  useEffect(() => {
    debouncedFn.current = _.debounce(callback, delay);
  }, [delay, callback]);

  return debouncedFn.current;
};

/******** contexts ********/
const initialDropdownContextValues = {
  isOpen: false,
  setOpen: () => {},
};

const DropdownContext = createContext(initialDropdownContextValues);

/******** components ********/
//conditional wrapper component
const ConditionalWrapper = ({ initialWrapper, condition, wrapper, children }) =>
  condition ? wrapper(children) : initialWrapper(children);

//loading icon component
const LoadingIcon = () => (
  <svg className="circular" height="50" width="50">
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="6"
      strokeMiterlimit="10"
    />
  </svg>
);

//paper
const Paper = ({ children, className = '' }) => (
  <div className={`paper ${className}`}>{children}</div>
);

//click away wrapper
const ClickAwayWrapper = ({ children, onClickAwayCallback }) => {
  const wrapperRef = useRef(null);
  useClickAway(wrapperRef, onClickAwayCallback);

  return <div ref={wrapperRef}>{children}</div>;
};

//dropdown context provider
const DropdownContextProvider = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ isOpen, setOpen }}>{children}</DropdownContext.Provider>
  );
};

//dropdown
const DropdownComponent = ({
  options,
  controlledDropdown,
  isNoHeadBorder,
  dropdownTrigger,
  content,
  dropdownClassName = '',
  bodyClassName = '',
  headerClassName = '',
  label,
}) => {
  const timeoutRef = useRef(null),
    [styles, setStyles] = useState({
      left: 0,
      top: 0,
    }),
    space = 10,
    [isDropdownOnTop, setIsDropdownOnTop] = useState(false),
    { isOpen, setOpen } = useContext(DropdownContext),
    dropdownWrapperRef = useRef(null),
    dropdownMenuRef = useRef(null),
    [menuWidth, setMenuWidth] = useState(undefined),
    [menuHeight, setMenuHeight] = useState(undefined),
    [showMenu, setShowMenu] = useState(false),
    [wrapperParentUpdated, setWrapperParentUpdated] = useState({ top: 0, left: 0 });

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  const onClickHandler = (value) => {
    controlledDropdown && controlledDropdown.onChangeHandler(value);
    setOpen(false);
  };

  useEffect(() => {
    if (isOpen && menuWidth === undefined && menuHeight === undefined) {
      setMenuWidth(dropdownMenuRef.current?.offsetWidth);
      setMenuHeight(dropdownMenuRef.current?.offsetHeight);
    }
  }, [menuWidth, menuHeight, isOpen]);

  useEffect(() => {
    if (isOpen) {
      timeoutRef.current = setTimeout(() => {
        setShowMenu(true);
      }, 10);
    } else {
      setShowMenu(false);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleScroll = useDebounce(
    useCallback(() => {
      if (dropdownWrapperRef.current) {
        const wrapper = dropdownWrapperRef.current.getBoundingClientRect(),
          windowHeight = window.innerHeight,
          menuBounding = dropdownMenuRef.current?.getBoundingClientRect();

        if (
          windowHeight - space < wrapper.top + wrapper.height + (menuBounding?.height || 0) &&
          wrapper.top + space > space * 2 + (menuBounding?.height || 0)
        )
          setIsDropdownOnTop(true);
        else setIsDropdownOnTop(false);
      }
    }, []),
    1,
  );

  const getStylesList = useMemo(() => {
    if (dropdownWrapperRef.current && menuHeight && menuWidth && isOpen) {
      const wrapperRect = dropdownWrapperRef.current.getBoundingClientRect(),
        wrapperRef = dropdownWrapperRef.current,
        scrollableParent = getScrollParent(wrapperRef),
        style = {
          //right
          left: Math.max(space, wrapperRect.right - wrapperRect.width),
          top: getElementOffset(dropdownWrapperRef.current).top + wrapperRect.height + space,
        };
      handleScroll();

      //not right
      if (!(style.left < menuWidth)) {
        style.left = Math.max(space, wrapperRect.right - menuWidth);
      }
      if (isDropdownOnTop && wrapperParentUpdated) {
        style.top = getElementOffset(dropdownWrapperRef.current).top - space - menuHeight;
      }
      if (scrollableParent) {
        style.top -= scrollableParent.scrollTop;
      }
      return style;
    }
    return {
      top: 0,
      left: 0,
    };
  }, [isDropdownOnTop, menuWidth, menuHeight, isOpen, wrapperParentUpdated, handleScroll]);

  useEffect(() => {
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const updateStyles = useCallback(() => {
    setStyles(getStylesList);
  }, [getStylesList]);

  const updateScrollableParentScroll = ({ target: { scrollTop, scrollLeft } }) => {
    setWrapperParentUpdated({ top: scrollTop, left: scrollLeft });
  };

  useEffect(() => {
    if (dropdownWrapperRef.current) {
      const wrapperRef = dropdownWrapperRef.current,
        scrollableParent = getScrollParent(wrapperRef);
      updateStyles();

      window.addEventListener('resize', updateScrollableParentScroll);

      scrollableParent.addEventListener('scroll', updateScrollableParentScroll);

      return () => {
        window.removeEventListener('resize', updateScrollableParentScroll);

        scrollableParent.removeEventListener('scroll', updateScrollableParentScroll);
      };
    }
  }, [updateStyles]);

  return (
    <ClickAwayWrapper
      onClickAwayCallback={() => {
        setOpen(false);
      }}
    >
      {label && <p className="label">{label}</p>}
      <div
        className={`dropdown-wrapper ${dropdownClassName ? dropdownClassName : ''} ${
          styles.left < menuWidth ? 'is-right' : ''
        } ${isNoHeadBorder || dropdownTrigger ? 'no-border' : ''}`}
        ref={dropdownWrapperRef}
        style={{
          width: options?.find((el) => el.description) !== undefined ? '100%' : 'auto',
        }}
      >
        <div
          className={`dropdown-header ${headerClassName ? headerClassName : ''}`}
          onClick={toggleDropdown}
        >
          {dropdownTrigger ? (
            dropdownTrigger
          ) : (
            <>
              <span className="selected-option">
                {(controlledDropdown &&
                  options?.find((option) => option.value === controlledDropdown.value)
                    ?.displayValue) ||
                  ''}
              </span>
              <ChevronDownIcon />
            </>
          )}
        </div>
        <Portal wrapperElement="span" wrapperElementId="dropdown">
          {isOpen && (
            <div className={`${styles.left < menuWidth ? 'is-right' : ''}`}>
              <div
                className={`dropdown-body ${bodyClassName} ${
                  isDropdownOnTop ? 'dropdown-on-top' : ''
                } ${isOpen && 'open'}`}
                ref={dropdownMenuRef}
                style={{
                  ...styles,
                  maxHeight: content ? 'unset' : maxMenuHeight,
                  overflowY:
                    menuHeight !== undefined && menuHeight >= maxMenuHeight && !content
                      ? 'auto'
                      : 'unset',
                  visibility: showMenu ? 'visible' : 'hidden',
                  width:
                    dropdownWrapperRef.current &&
                    options?.find((el) => el.description) !== undefined
                      ? dropdownWrapperRef.current.getBoundingClientRect().width
                      : 'auto',
                }}
              >
                {content ? (
                  <div onClick={(e) => e.stopPropagation()}>{content}</div>
                ) : (
                  options &&
                  options.map((option, i) => (
                    <div
                      key={i}
                      className={`dropdown-item ${option.isRemoveStyle ? 'remove-style' : ''}`}
                      onClick={() => {
                        onClickHandler(option.value);
                        option.onClickData && option.onClickData.onClick(option.onClickData.data);
                      }}
                      style={{ padding: option.link ? 0 : 10 }}
                    >
                      <ConditionalWrapper
                        initialWrapper={(children) => (
                          <span className="is-flex is-align-items-center">{children}</span>
                        )}
                        condition={!!option.link}
                        wrapper={(children) => (
                          <Link
                            className="is-flex is-align-items-center is-fullwidth"
                            to={option.link || ''}
                            style={{ padding: 10 }}
                          >
                            {children}
                          </Link>
                        )}
                      >
                        {option.icon && <span className="dropdown-item-icon">{option.icon}</span>}
                        <span className="is-flex is-flex-direction-column">
                          <span
                            className="dropdown-item-label"
                            style={{
                              fontWeight: option.description ? 600 : 400,
                            }}
                          >
                            {option.displayValue}
                          </span>
                          {option.description && (
                            <span className="dropdown-item-description">{option.description}</span>
                          )}
                        </span>
                      </ConditionalWrapper>
                      {option.isRemoveStyle && <span className="remove-icon">X</span>}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </Portal>
      </div>
    </ClickAwayWrapper>
  );
};

const Dropdown = (props) => (
  <DropdownContextProvider>
    <DropdownComponent {...props} />
  </DropdownContextProvider>
);

//pagination
const Pagination = ({
  total = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChanged,
  perPageDropdown,
}) => {
  const [totalPages, setTotalPages] = useState(0),
    isPrevBtnDisabled = currentPage === 1 || currentPage > totalPages,
    isNextBtnDisabled = currentPage >= totalPages || total === 0;

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0) {
      setTotalPages(Math.ceil(total / itemsPerPage));
    }
  }, [total, itemsPerPage]);

  return (
    <div className="pagination-outer-wrapper">
      <div className="pagination-wrapper">
        <button
          className="pagination-btn"
          onClick={() => onPageChanged(1)}
          disabled={isPrevBtnDisabled}
        >
          <DoubleChevronLeftIcon />
        </button>
        <button
          className="pagination-btn"
          onClick={() => onPageChanged(currentPage - 1)}
          disabled={isPrevBtnDisabled}
        >
          <ChevronLeftIcon />
        </button>
        <span className="pagination-caption">
          {total > 0
            ? `${
                1 + itemsPerPage * (currentPage - 1) > total
                  ? total
                  : 1 + itemsPerPage * (currentPage - 1)
              } - ${currentPage * itemsPerPage > total ? total : currentPage * itemsPerPage}`
            : 0}{' '}
          of {total}
        </span>
        <button
          className="pagination-btn"
          onClick={() => onPageChanged(currentPage + 1)}
          disabled={isNextBtnDisabled}
        >
          <ChevronRightIcon />
        </button>
        <button
          className="pagination-btn"
          onClick={() => onPageChanged(totalPages)}
          disabled={isNextBtnDisabled}
        >
          <DoubleChevronRightIcon />
        </button>
      </div>
      {perPageDropdown && (
        <Dropdown
          options={perPageDropdown.rowsPerPageOptions}
          controlledDropdown={{
            value: perPageDropdown.rowsPerPageNum,
            onChangeHandler: perPageDropdown.onChangeRowsPerPage,
          }}
        />
      )}
    </div>
  );
};

//datatable header
const DatatableHeader = ({ columns, onSorting, actions }) => {
  const [sortingField, setSortingField] = useState(''),
    [sortingOrder, setSortingOrder] = useState('asc');

  const onSortingChange = (field) => {
    const order = field === sortingField && sortingOrder === 'asc' ? 'desc' : 'asc';

    setSortingField(field);
    setSortingOrder(order);
    onSorting && onSorting(field, order);
  };

  return (
    <thead className="table-header">
      <tr className="table-head-row">
        {columns.map(({ field, colName, sortable, width }) => (
          <th
            style={{
              width: getTableDataCellWidth(width, field, columns, actions),
            }}
            key={field}
          >
            <span
              style={{ cursor: sortable ? 'pointer' : 'initial' }}
              onClick={() => (sortable ? onSortingChange(field) : null)}
              className={`table-head-label ${sortable ? 'sortable-header' : ''}`}
            >
              {colName}
              {sortable && sortingField !== field && <ChevronUpIcon className="sortable-icon" />}
              {sortingField && sortingField === field && (
                <>{sortingOrder === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />}</>
              )}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};

//DatatableSearch component
const DatatableSearch = ({ onSearch, disabled, isDebounce }) => {
  const [query, setQuery] = useState('');

  const debouncedSearch = useDebounce(
    useCallback(
      (nextValue) => {
        onSearch && onSearch(nextValue);
      },
      [onSearch],
    ),
    500,
  );

  const onDebounceChangeHandler = useCallback(
    ({ target: { value } }) => {
      setQuery(value);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  const onNoDebounceChangeHandler = ({ target: { value } }) => {
    setQuery(value);
    onSearch && onSearch(value);
  };

  return (
    <div className="search-wrapper">
      <input
        type="text"
        value={query}
        onChange={isDebounce ? onDebounceChangeHandler : onNoDebounceChangeHandler}
        className="input-elevated"
        placeholder="Search..."
        disabled={disabled}
      />
    </div>
  );
};

//datatable title
const DatatableTitle = ({ title, searchConfig, isSearch }) => (
  <>
    {(title || isSearch) && (
      <div className="datatable-title-wrapper">
        {title && <h2 className="table-title">{title}</h2>}
        <div style={{ flex: title ? '1 1 10%' : '1' }} />
        {isSearch && (
          <DatatableSearch
            onSearch={searchConfig.onSearch}
            disabled={searchConfig.isSearchDisabled}
            isDebounce={searchConfig.isDebounce}
          />
        )}
      </div>
    )}
  </>
);

//datatable body row
const DatatableBodyRow = ({ columns, row, actions }) => {
  const { isTouchDevice } = useTouchDevice();

  const onDragOverHandler = (e) => {
    e.preventDefault();
  };

  return (
    <tr
      onClick={
        row.onClick
          ? (e) => {
              row.onClick(e, row);
            }
          : undefined
      }
      onDoubleClick={
        row.onDoubleClick
          ? (e) => {
              row.onDoubleClick(e, row);
            }
          : undefined
      }
      onDragOver={row.isDroppable ? onDragOverHandler : undefined}
      onDrop={
        row.isDroppable && row.onDrop
          ? (e) => {
              row.onDrop(e, row);
            }
          : undefined
      }
      onDragStart={
        row.draggable && row.onDragStart
          ? (e) => {
              row.onDragStart(e, row);
            }
          : undefined
      }
      draggable={row.draggable}
      style={{ cursor: row.onClick ? 'pointer' : 'initial' }}
    >
      {columns.map((col, colIndex) => (
        <td
          style={{
            width: getTableDataCellWidth(col.width, col.field, columns, actions),
          }}
          key={col.field}
          className={col.className ? col.className : ''}
        >
          <div
            className={`${
              colIndex === 0 && row.draggable && !isTouchDevice ? 'd-flex align-items-center' : ''
            }`}
          >
            {colIndex === 0 && row.draggable && !isTouchDevice && (
              <MoveIcon className="move-element" />
            )}
            <div>{col.render ? col.render(row) : getNestedValue({ key: col.field, obj: row })}</div>
          </div>
        </td>
      ))}
    </tr>
  );
};

//create portal component
const Portal = ({ children, wrapperElement, wrapperElementId }) => {
  const [wrapper, setWrapper] = useState(null);

  useEffect(() => {
    let element = document.getElementById(wrapperElementId);
    // if element is not found with wrapperElementId or wrapperElementId is not provided,
    // create and append to body
    if (!element) {
      element = createWrapperAndAppendToBody(wrapperElement, wrapperElementId);
    }
    setWrapper(element);
  }, [wrapperElementId, wrapperElement]);

  // wrapper state will be null on the first render.
  if (wrapper === null) return null;

  return ReactDOM.createPortal(children, wrapper);
};

//tooltip
const Tooltip = ({ tooltipContent, position, color, backgroundColor, disabled, children }) => {
  const [show, setShow] = useState(false),
    [styles, setStyles] = useState({}),
    tooltipWrapperRef = useRef(),
    tooltipMessage = useRef(),
    space = 16,
    [childrenWidth, setChildrenWidth] = useState(undefined),
    [showLeftTooltip, setShowLeftTooltip] = useState(false),
    [wrapperParentUpdated, setWrapperParentUpdated] = useState({
      top: 0,
      left: 0,
    });

  const showTooltip = () => {
    setShow(true);
    setStyles(getStylesList());
  };

  const hideTooltip = () => {
    setShow(false);
  };

  useEffect(() => {
    if (show && childrenWidth === undefined && position === 'left') {
      setChildrenWidth(tooltipMessage.current?.offsetWidth);
    }
  }, [childrenWidth, show, position]);

  useEffect(() => {
    if (childrenWidth !== undefined && position === 'left') {
      setStyles((prev) => ({ ...prev, left: prev.left - childrenWidth }));
      setShowLeftTooltip(true);
    }
  }, [childrenWidth, position]);

  const getStylesList = useCallback(() => {
    if (tooltipWrapperRef.current) {
      const wrapperRect = tooltipWrapperRef.current.getBoundingClientRect(),
        wrapperRef = tooltipWrapperRef.current,
        scrollableParent = getScrollParent(wrapperRef),
        style = {
          //bottom
          left: Math.max(space, wrapperRect.left + wrapperRect.width / 2),
          top: getElementOffset(tooltipWrapperRef.current).top + wrapperRect.height + space,
        };
      if (position === 'top') {
        style.top = getElementOffset(tooltipWrapperRef.current).top - wrapperRect.height;
      } else if (position === 'right') {
        style.top = getElementOffset(tooltipWrapperRef.current).top + wrapperRect.height / 2;
        style.left = Math.max(space, wrapperRect.right);
      } else if (position === 'left') {
        style.top = getElementOffset(tooltipWrapperRef.current).top + wrapperRect.height / 2;
        style.left = Math.max(space, wrapperRect.left - (childrenWidth || 0) - space);
      }
      if (scrollableParent && wrapperParentUpdated) {
        style.top -= scrollableParent.scrollTop;
      }
      return style;
    }
    return {
      top: 0,
      left: 0,
    };
  }, [position, childrenWidth, wrapperParentUpdated]);

  useEffect(() => {
    //required for the first render and on scroll
    if (getStylesList().top !== styles.top || getStylesList().left !== styles.left) {
      setStyles(getStylesList());
    }
  }, [getStylesList, styles.left, styles.top]);

  const updateScrollableParentScroll = ({ target: { scrollTop, scrollLeft } }) => {
    setWrapperParentUpdated({
      top: scrollTop,
      left: scrollLeft,
    });
  };

  useEffect(() => {
    if (tooltipWrapperRef.current) {
      const wrapperRef = tooltipWrapperRef.current,
        scrollableParent = getScrollParent(wrapperRef);

      window.addEventListener('resize', updateScrollableParentScroll);

      scrollableParent.addEventListener('scroll', updateScrollableParentScroll);

      return () => {
        window.removeEventListener('resize', updateScrollableParentScroll);

        scrollableParent.removeEventListener('scroll', updateScrollableParentScroll);
      };
    }
  }, []);

  return (
    <span
      className="tooltip"
      onMouseEnter={disabled ? undefined : showTooltip}
      onMouseLeave={disabled ? undefined : hideTooltip}
      ref={tooltipWrapperRef}
    >
      <Portal wrapperElement="span" wrapperElementId="tooltip">
        {show && !!tooltipContent && (
          <span
            ref={tooltipMessage}
            className={`tooltip-message 
   on-${position ? position : 'top'}`}
            // dangerouslySetInnerHTML={{ __html: tooltipContent }}
            style={{
              color: color ? color : '#ffffff',
              '--background-color': backgroundColor ? backgroundColor : 'rgba(97, 97, 97, 0.92)',
              ...styles,
              ...(position === 'left'
                ? { visibility: showLeftTooltip ? 'visible' : 'hidden' }
                : {}),
            }}
          >
            {tooltipContent}
          </span>
        )}
      </Portal>
      {children}
    </span>
  );
};

//datatable icon button
const DatatableIconButton = ({ disabled, hidden, icon, onClick, rowData, tooltipContent }) => {
  const disabledBtn = disabled
    ? typeof disabled === 'boolean'
      ? disabled
      : disabled(rowData)
    : undefined;

  return (
    <>
      {!(hidden ? (typeof hidden === 'boolean' ? hidden : hidden(rowData)) : undefined) && (
        <Tooltip tooltipContent={tooltipContent} disabled={disabledBtn} position="bottom">
          <button
            disabled={disabledBtn}
            onClick={(e) => onClick(e, rowData)}
            className="datatable-icon-button"
          >
            {icon}
          </button>
        </Tooltip>
      )}
    </>
  );
};

//datatable
const Datatable = ({
  columns,
  records,
  config,
  title,
  isLoading,
  remoteDataControl,
  resetCurrentPaginationPage,
  actions,
}) => {
  const columnsRef = useRef(columns),
    actionsRef = useRef(actions),
    [sorting, setSorting] = useState({
      field: '',
      order: '',
    }),
    [totalItems, setTotalItems] = useState(0),
    [currentPage, setCurrentPage] = useState(1),
    [search, setSearch] = useState(''),
    [rowsPerPageNum, setRowsPerPageNum] = useState('10');

  const actionsCol = useMemo(() => {
    if (actionsRef.current) {
      return {
        field: 'actionsCol',
        colName: 'Actions',
        render: (rowData) => (
          <>
            {actionsRef.current.map((el, i) => (
              <DatatableIconButton
                key={i}
                disabled={el.disabled}
                hidden={el.hidden}
                icon={el.icon}
                onClick={el.onClick}
                rowData={rowData}
                tooltipContent={el.tooltipContent}
              />
            ))}
          </>
        ),
      };
    }
  }, []);

  useEffect(() => {
    if (columnsRef.current && actionsRef.current) {
      const clonedColumns = _.cloneDeep(columnsRef.current),
        foundActionsCol = clonedColumns.find((el) => el.field === 'actionsCol'),
        finalColumns = foundActionsCol
          ? clonedColumns.filter((el) => el.field !== 'actionsCol')
          : clonedColumns;

      if (config?.isActionsColumnLast) {
        finalColumns.push(actionsCol);
      } else {
        finalColumns.unshift(actionsCol);
      }
      columnsRef.current = finalColumns;
    }
  }, [actionsCol, config?.isActionsColumnLast]);

  useEffect(() => {
    if (remoteDataControl?.onPaginationDataUpdate) {
      remoteDataControl.onPaginationDataUpdate(currentPage, +rowsPerPageNum);
    }
    // eslint-disable-next-line
  }, [rowsPerPageNum, currentPage]);

  useEffect(() => {
    if (resetCurrentPaginationPage) {
      resetCurrentPaginationPage(() => {
        setCurrentPage(1);
      });
    }
    // eslint-disable-next-line
  }, []);

  const onChangeRowsPerPage = (value) => {
    setRowsPerPageNum(value);
  };

  const recordsData = useMemo(() => {
    let clonedRecords = _.cloneDeep(records);

    //sorting functionality
    if (sorting.field) {
      const reversed = sorting.order === 'asc' ? 1 : -1;
      clonedRecords = clonedRecords.sort(
        (a, b) =>
          reversed *
          getNestedValue({ key: sorting.field, obj: a })
            ?.toString()
            .toLowerCase()
            .localeCompare(
              getNestedValue({ key: sorting.field, obj: b })?.toString().toLowerCase(),
            ),
      );
    }

    //search functionality
    if (search && config?.isSearch && !remoteDataControl?.onDebouncedSearch) {
      const filteredArray = columnsRef.current.map((col) =>
        clonedRecords.filter((record) =>
          getNestedValue({ key: col.field, obj: record })
            ?.toString()
            .toLowerCase()
            .includes(search.toString().toLowerCase()),
        ),
      );

      clonedRecords = filteredArray.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
      }, []);
    }

    //pagination functionality
    if (config?.isPagination) {
      setTotalItems(
        remoteDataControl?.totalItems ? remoteDataControl?.totalItems : clonedRecords.length,
      );

      if (!remoteDataControl) {
        clonedRecords = clonedRecords.slice(
          (currentPage - 1) * +rowsPerPageNum,
          (currentPage - 1) * +rowsPerPageNum + +rowsPerPageNum,
        );
      }
    }

    return clonedRecords;
    // eslint-disable-next-line
  }, [
    records,
    sorting,
    currentPage,
    search,
    config?.isPagination,
    config?.isSearch,
    remoteDataControl?.totalItems,
    rowsPerPageNum,
  ]);

  return (
    <Paper className="outer-table-wrapper">
      {isLoading && (
        <div className="center-loader-wrapper">
          <LoadingIcon />
        </div>
      )}
      <DatatableTitle
        title={title}
        isSearch={config?.isSearch}
        searchConfig={{
          isSearchDisabled: isLoading,
          isDebounce: remoteDataControl?.onDebouncedSearch !== undefined,
          onSearch: (value) => {
            setSearch(value);
            setCurrentPage(1);
            remoteDataControl?.onDebouncedSearch && remoteDataControl.onDebouncedSearch(value);
          },
        }}
      />
      <div className="table-wrapper">
        <table className={`table ${config?.tableClasses ? config.tableClasses : ''}`}>
          <DatatableHeader
            columns={columnsRef.current}
            onSorting={(field, order) => setSorting({ field, order })}
            actions={actions}
          />
          <tbody>
            {recordsData.map((row, i) => (
              <DatatableBodyRow key={i} row={row} columns={columnsRef.current} actions={actions} />
            ))}
          </tbody>
        </table>
        {recordsData.length === 0 && <p className="no-data">No data to display</p>}
        {config?.isPagination && (
          <Pagination
            total={totalItems}
            itemsPerPage={+rowsPerPageNum}
            currentPage={currentPage}
            onPageChanged={(page) => setCurrentPage(page)}
            perPageDropdown={
              config?.paginationConfig?.isRowsDropdown
                ? {
                    rowsPerPageOptions,
                    rowsPerPageNum,
                    onChangeRowsPerPage,
                  }
                : undefined
            }
            isLoading={isLoading}
          />
        )}
      </div>
    </Paper>
  );
};

//for demo
const getMyTeamsDataTableConfig = (teamDetails) => {
  const teamsRecords = teamDetails,
    teamsColumns = [
      {
        field: 'first_name',
        colName: 'Name',
        sortable: true,
        render: (rowData) => (
          <p className="name">
            {rowData.first_name} {rowData.last_name}
          </p>
        ),
      },
      {
        field: 'employment.title',
        colName: 'Occupation',
        sortable: true,
      },
      {
        field: 'subscription.status',
        colName: 'Status',
        // width: '10%',
        render: (rowData) => (
          <p
            className={`status ${
              rowData.subscription.status.toLowerCase() === 'active'
                ? 'success'
                : rowData.subscription.status.toLowerCase() === 'blocked'
                ? 'danger'
                : 'warn'
            }`}
          >
            {rowData.subscription.status}
          </p>
        ),
      },
    ],
    teamsConfig = {
      tableClasses: 'is-fullwidth',
      isPagination: true,
      isSearch: true,
      //use the following flag if you want actions column to be the last column
      // isActionsColumnLast: true,
      paginationConfig: {
        isRowsDropdown: true,
      },
    },
    teamsActions = [
      {
        icon: <TrashIcon />,
        //it can be boolean => disabled: true
        disabled: (rowData) => rowData.subscription.status.toLowerCase() === 'active',
        //it can be boolean => hidden: true
        hidden: (rowData) => rowData.subscription.status.toLowerCase() === 'idle',
        tooltipContent: 'Delete row',
        onClick: (e, rowData) => {
          console.log('delete ', `${rowData.first_name} ${rowData.last_name}`);
        },
      },
    ];

  return { teamsColumns, teamsRecords, teamsConfig, teamsActions };
};

const App = () => {
  const [people, setPeople] = useState([]),
    //use the following if you want to reset pagination
    resetDatatablePaginationRef = useRef(),
    [isLoading, setIsLoading] = useState(false),
    [error, setError] = useState(false),
    { teamsColumns, teamsRecords, teamsConfig, teamsActions } = getMyTeamsDataTableConfig(people);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await fetch('https://random-data-api.com/api/users/random_user?size=40'),
          data = await res.json();

        setPeople(data);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const resetCurrentPaginationPage = (callback) => {
    resetDatatablePaginationRef.current = callback;
  };

  /*
    // example of resetting pagination
    if (resetDatatablePaginationRef.current) {
      resetDatatablePaginationRef.current();
    }
    */

  /*
    // example of making an API call on pagination update
    const onPaginationDataUpdate = (currentPage, rowsPerPageNum) => {
      /!*if (currentPage !== apiRes.current_page || rowsPerPageNum !== apiRes.page_size) {
        // make your API call to fetch more data
      }*!/
      console.log('onPaginationDataUpdate, currentPage: ', currentPage);
      console.log('onPaginationDataUpdate, rowsPerPageNum: ', rowsPerPageNum);
    };
  
    // example of making an API call on search
    const onDebouncedSearch = async (searchTerm) => {
      setIsLoading(true);
      try {
        const res = await fetch(
            `https://random-data-api.com/api/users/random_user?size=40&term=${searchTerm}`
          ),
          data = await res.json();
  
        setPeople(data);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    */

  return (
    <div className="container">
      <h1>React DataTable from scratch</h1>
      {error && <p>Fetching error</p>}
      <Datatable
        title="Employees"
        columns={teamsColumns}
        records={teamsRecords}
        config={teamsConfig}
        isLoading={isLoading}
        actions={teamsActions}
        resetCurrentPaginationPage={resetCurrentPaginationPage}
        //use it if you want to control your datatable from an API
        /*remoteDataControl={{
            onPaginationDataUpdate,
            totalItems: apiRes.total_count, //replace it with the total_count of your API response
            onDebouncedSearch,
          }}*/
      />
    </div>
  );
};

const container = document.getElementById('app'),
  root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
