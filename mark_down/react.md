# React 18 Hooks Summary

## Basic Hooks

### `useState`
- **Purpose:** Manages local state in a functional component.
- **Usage:**
  ```jsx
  const [count, setCount] = useState(0);
  ```
- React re-renders the component when the state is updated.

### `useEffect`
- **Purpose:** Handles side effects (e.g., fetching data, subscriptions).
- **Usage:**
  ```jsx
  useEffect(() => {
    console.log('Component mounted or updated');
    return () => console.log('Cleanup on unmount or dependency change');
  }, [dependency]);
  ```
- Runs after rendering. Dependencies control when it runs.

### `useContext`
- **Purpose:** Accesses context values without prop drilling.
- **Usage:**
  ```jsx
  const value = useContext(MyContext);
  ```
- Simplifies state sharing across components.

### `useRef`
- **Purpose:** Accesses and persists values across renders without triggering re-renders.
- **Usage:**
  ```jsx
  const inputRef = useRef(null);
  ```
- Can be used for DOM manipulation or storing mutable values.

### `useReducer`
- **Purpose:** Manages complex state logic, similar to `redux` but localized to the component.
- **Usage:**
  ```jsx
  const [state, dispatch] = useReducer(reducer, initialState);
  ```
- Great for managing state transitions.

---

## Performance Optimization Hooks

### `useMemo`
- **Purpose:** Memorizes expensive calculations to avoid recomputation.
- **Usage:**
  ```jsx
  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  ```

### `useCallback`
- **Purpose:** Memorizes a callback function to prevent unnecessary re-creation.
- **Usage:**
  ```jsx
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, [dependency]);
  ```

---

## Advanced Hooks

### `useImperativeHandle`
- **Purpose:** Customizes the instance value of a `ref` in parent components.
- **Usage:**
  ```jsx
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }}));
  ```

### `useLayoutEffect`
- **Purpose:** Runs synchronously after all DOM mutations.
- **Usage:**
  ```jsx
  useLayoutEffect(() => {
    console.log('DOM updated');
  });
  ```
- Use sparingly for layout calculations.

### `useId` (React 18+)
- **Purpose:** Generates a unique ID for accessibility or server-side rendering.
- **Usage:**
  ```jsx
  const id = useId();
  <label htmlFor={id}>Name</label>
  <input id={id} />
  ```

---

## React 18-Specific Hooks

### `useTransition`
- **Purpose:** Handles state updates with transitions (e.g., for user experience improvement).
- **Usage:**
  ```jsx
  const [isPending, startTransition] = useTransition();
  startTransition(() => {
    setState(newState);
  });
  ```

### `useDeferredValue`
- **Purpose:** Defers value updates to avoid blocking UI rendering.
- **Usage:**
  ```jsx
  const deferredValue = useDeferredValue(value);
  ```

### `useSyncExternalStore`
- **Purpose:** Ensures consistent state for external stores (e.g., Redux).
- **Usage:**
  ```jsx
  const state = useSyncExternalStore(subscribe, getSnapshot);
  ```

---

## Commonly Used in Real Projects
- **Basic Hooks:** `useState`, `useEffect`, `useContext`.
- **Optimization Hooks:** `useMemo`, `useCallback`.
- **React 18 Features:** `useTransition`, `useDeferredValue`. 
