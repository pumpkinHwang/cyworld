import React, { useState, useRef, useEffect, useCallback, useReducer } from 'react';
import { useObserver, Observer } from 'mobx-react';
import history from '../History';
import { isSomething, defaults, isString, isNumber, isPrimitive } from './Utils';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import * as _ from 'lodash/'
import { isReactComponent, isDOMTypeElement, isElement, isFunctionComponent, isClassComponent } from './Element';
import { lowerCase } from './String';

/** With React class components you have the componentDidUpdate method which receives previous props and state 
 * as arguments or you can update an instance variable (this.previous = value) and reference it later to get 
 * the previous value. So how can we do this inside a functional component that doesn't have lifecycle methods 
 * or an instance to store values on? Hooks to the rescue! We can create a custom hook that uses the useRef 
 * hook internally for storing the previous value. 
 * @example const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);*/
export const usePrevious = (value) => {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an appinstance property on a class
    const ref = useRef();

    // Store current value in ref
    useEffect(() => {
        ref.current = value;
    }, [value]); // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current;
}

/** This hook allows you to detect clicks outside of a specified element. 
 * In the example below we use it to close a modal when any element outside of the modal is clicked. 
 * By abstracting this logic out into a hook we can easily use it across all of our components that need 
 * this kind of functionality (dropdown menus, tooltips, etc). 
 * @example const ref = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  useOnClickOutside(ref, () => setModalOpen(false));
  return (
    <div>
      {isModalOpen ? (
        <div ref={ref}>Hey, I'm a modal. Click anywhere outside of me to close.</div>) : 
        (<button onClick={() => setModalOpen(true)}>Open Modal</button>)}
    </div>
  );
*/
export const useOnClickOutside = (ref, handler) => {
    useEffect(
        () => {
            const listener = event => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }

                handler(event);
            };

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);

            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        },
        // Add ref and handler to effect dependencies
        // It's worth noting that because passed in handler is a new ...
        // ... function on every render that will cause this effect ...
        // ... callback/cleanup to run every render. It's not a big deal ...
        // ... but to optimize you can wrap handler in useCallback before ...
        // ... passing it into this hook.
        [ref, handler]
    );
}

/** Sync state to local storage so that it persists through a page refresh. Usage is similar to 
 * useState except we pass in a local storage key so that we can default to that value on page load 
 * instead of the specified initial value. 
 * @example const [name, setName] = useLocalStorage('name', 'Bob'); */
export const useLocalStorage = (key, initialValue) => {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = value => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };

    return [storedValue, setValue];
}

export const useHistoryListen = (value) => {
    const [path, setPath] = useState(history.location.pathname)
    // const [page, setPage] = useState(defaults(value, ''))

    const unlisten = history.listen(location => { })
    const listen = history.listen((location) => {
        // console.log('location.pathname',location.pathname)
        setPath(location.pathname)
    })

    useEffect(() => {
        listen()
        return () => unlisten()
    }, [])

    /* useEffect(() => {
      console.log('set page')
      let newPage = path.split('/')
      if (isLength(newPage)) {
          newPage = isUndefined(newPage[1]) === false ? newPage[1] : ''
          console.log('newPage',newPage)
      } else {
          newPage = ''
      }
      setPage(newPage)
    }, [path]) */

    return path
}

/** Use History push to navigate page.
 * @example const setNavigatePage = useNavigatePage()
 * setNavigatePage('/catproduct/all') // got to Shop page
 * setNavigatePage('') // got to Home page  */
export const useNavigatePage = () => {
    return (target) => history.push(target)
}



export const useStateDefaults = (props, defaultValue) => {
    const [get, set] = useState(defaults(props, defaultValue))

    useEffect(() => {
        set(defaults(get, defaultValue))
        console.log(get)
    }, [get])

    return [get, set]
}

export const useQueryString = () => {
    const location = useLocation()
    const values = queryString.parse(location.search)
    return values
}

export const useEventListener = (eventName, handler, element = window) => {
    // Create a ref that stores handler
    const savedHandler = useRef();

    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(
        () => {
            // Make sure element supports addEventListener
            // On 
            const isSupported = element && element.addEventListener;
            if (!isSupported) return;

            // Create event listener that calls handler function stored in ref
            const eventListener = event => savedHandler.current(event);

            // Add event listener
            element.addEventListener(eventName, eventListener, false);

            // Remove event listener on cleanup
            return () => {
                element.removeEventListener(eventName, eventListener, false);
            };
        },
        [eventName, element] // Re-run if eventName or element changes
    );
};

export const useKeyPress = targetKey => {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState(false)

    // If pressed key is our target key then set to true
    function downHandler({ key }) {
        if (key === targetKey) {
            setKeyPressed(true)
        }
    }

    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(false)
        }
    }

    // Add event listeners
    useEffect(() => {
        window.addEventListener('keydown', downHandler)
        window.addEventListener('keyup', upHandler)
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('keydown', downHandler)
            window.removeEventListener('keyup', upHandler)
        }
    }, []) // Empty array ensures that effect is only run on mount and unmount

    return keyPressed
}

const ifThenElse = (condition, thenRender, elseRender) => {
    if (condition) {
        if (_.isFunction(thenRender)) {
            return thenRender()
        } else {
            return thenRender
        }
    } else {
        if (_.isFunction(elseRender)) {
            return elseRender()
        } else {
            return elseRender
        }
    }
}


const createHOC = Component => {
    return class extends React.Component {
        render() {
            return (
                <Component {...this.props} />
            )
        }
    }
}

/** Process evaluation of children / condition, delay it if need. */
const processEvaluation = Element => {
    /* console.log('isFunction(Element)',isFunction(Element))
    console.log('isReactComponent(Element)', isReactComponent(Element))
    console.log('isFunctionComponent(Element)', isFunctionComponent(Element))
    console.log('isClassComponent(Element)', isClassComponent(Element)) */
    // check if function executed in need
    if (_.isFunction(Element)) {
        Element = Element()
    }

    if (isReactComponent(Element) || isFunctionComponent(Element) || isClassComponent(Element)) {
        return <Element/>
    } else {
        //console.log('PRIMITIVE!!!!', isPrimitive(Element))
        if (isPrimitive(Element)) {
            return Element
        } else {
            const DOMElement = () => Element
            return <DOMElement/>
        }
    }
}

/**
 * @param {boolean} condition - An expression whose value is used as a condition.
 * @return {any} any result as React.ReactNode or primative value. */
export const useIf = (condition) => {
    return {
        then: (thenRender) => {
            return {
                else: (elseRender = null) => 
                    _.chain({ thenRender, elseRender })
                        .thru(_render => {
                            if (condition) {
                                if (_.isFunction(_render.thenRender)) {
                                    return _render.thenRender()
                                } else {
                                    return _render.thenRender
                                }
                            } else {
                                if (_.isFunction(_render.elseRender)) {
                                    return _render.elseRender()
                                } else {
                                    return _render.elseRender
                                }
                            }
                        })
                        .value()
            }
        },
        when: (render) => _.chain(render).thru(_render => condition ? _.isFunction(_render) ? _render() : _render : null).value(),
        unless: (render) => _.chain(render).thru(_render => !condition ? _.isFunction(_render) ? _render() : _render : null).value()
    }
}

/** A shorthand for `useIf().when()`. It will only be displayed, if a given condition equal `true`.
 * @param {boolean} condition - An expression whose value is used as a condition.
 * @param {any} render - An expression which is evaluated if the condition evaluates to a truthy value.
 * @return {any} any result as React.ReactNode or primative value. */
export const useWhen = () => {
    return (condition, render) => {
        return _.chain(render).thru(_render => condition ? _.isFunction(_render) ? _render() : _render : null).value()
    }
}

/** A shorthand for `useIf().unless()`. It will only be displayed, if a given condition equal `false`.
 * @param {boolean} condition - An expression whose value is used as a condition.
 * @param {any} render - An expression which is executed if the condition is falsy.
 * @return {any} any result as React.ReactNode or primative value. */
export const useUnless = () => {
    return (condition, render) => {
        return _.chain(render).thru(_render => !condition ? _.isFunction(_render) ? _render() : _render : null).value()
    }
}

export function useForceUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
        setTick(tick => tick + 1);
    }, [])
    return update;
}

const blacklistedTargets = ["INPUT", "TEXTAREA"]

const keysReducer = (state, action) => {
    switch (action.type) {
        case "set-key-down":
        return { ...state, [action.key]: true }
        case "set-key-up":
        return { ...state, [action.key]: false }
        default:
        return state
    }
}

export const useKeyboardShortcut = (shortcutKeys, callback) => {
    if (!Array.isArray(shortcutKeys))
        throw new Error(
        "The first parameter to `useKeyboardShortcut` must be an ordered array of `KeyboardEvent.key` strings."
        )

    if (!shortcutKeys.length)
        throw new Error(
        "The first parameter to `useKeyboardShortcut` must contain atleast one `KeyboardEvent.key` string."
        )

    if (!callback || typeof callback !== "function")
        throw new Error(
        "The second parameter to `useKeyboardShortcut` must be a function that will be envoked when the keys are pressed."
        )

    const initalKeyMapping = shortcutKeys.reduce((currentKeys, key) => {
        currentKeys[lowerCase(key)] = false
        return currentKeys
    }, {})

    const [keys, setKeys] = useReducer(keysReducer, initalKeyMapping)

    const keydownListener = useCallback(
        keydownEvent => {
        const { key, target, repeat } = keydownEvent
        const loweredKey = lowerCase(key)

        if (repeat) return
        if (blacklistedTargets.includes(target.tagName)) return
        if (keys[loweredKey] === undefined) return

        if (keys[loweredKey] === false)
            setKeys({ type: "set-key-down", key: loweredKey })
        },
        [keys]
    )

    const keyupListener = useCallback(
        keyupEvent => {
        const { key, target } = keyupEvent
        const loweredKey = lowerCase(key)

        if (blacklistedTargets.includes(target.tagName)) return
        if (keys[loweredKey] === undefined) return

        if (keys[loweredKey] === true)
            setKeys({ type: "set-key-up", key: loweredKey })
        },
        [keys]
    )

    useEffect(() => {
        if (!Object.values(keys).filter(value => !value).length) callback(keys)
    }, [callback, keys])

    useEffect(() => {
        window.addEventListener("keydown", keydownListener, true)
        return () => window.removeEventListener("keydown", keydownListener, true)
    }, [keydownListener])

    useEffect(() => {
        window.addEventListener("keyup", keyupListener, true)
        return () => window.removeEventListener("keyup", keyupListener, true)
    }, [keyupListener])
}