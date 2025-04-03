import { useState } from "react";
import PropTypes from "prop-types";

// styles associated with the items in this component.
// This is kept outside the main component so that we do not have to regerate this every time the component is reloaded.
const insideComp = {
  display: "flex",
};

//Not only this, if we want to make sure that this is highly usable, we ahve to deal will error handling too, where we must make sure that user is only sending the type of data which we are expecting.
StarRating.propTypes = {
  maxRating: PropTypes.number,
};

// here we are setting up a default value for the max value if number of stars. This is done to make this component highly reuseable.
// Also, we are also making it more reusbale for different projects by giving the ability to change the size, color, add class names, etc.
export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  customClassName = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const mainComp = {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    color,
    fontSize: `${size / 1.5}px`,
  };

  function handleRating(rate) {
    setRating(rate);
    // This is a function which came via props. The use case for this is that, whenever a user wants to get the value of the state or access the state of rating he/she can use in his own code.
    // In easy langauge, suppose I want display the rate somewhere else in my component. Now, to do this we are using state where we will set the value of the state which can be set by updating the fucntion which was sent via props to this starRating function.
    if (onSetRating) {
      onSetRating(rate);
    }
  }

  function handleHoverIn(rate) {
    setTempRating(rate);
  }

  function handleHoverOut(rate) {
    setTempRating(rate);
  }

  return (
    <div style={mainComp} className={customClassName}>
      <div style={insideComp}>
        {/* We have used this thing in the previous code too for FAR AWAY. The benefit of using this is that it will create a empty array of the length specified by you and the perforn the operation with each of the value of i till the end given by you */}
        {/* Array.from() cretes empty array. It can take paarmeters like length to determine the length of empty array to be created. It can also take a call back function as a 2nd parameter and run a fucntion each time. */}
        {Array.from({ length: maxRating }, (_, i) => (
          // One way of filling the empty start is using the method belwo where, it checks if the rating is less than i or not. If yes then it will display the filled Star and if no, then it will display the Empty Star.
          //   i < rating ? (
          //     <Star key={i} onRate={() => handleRating(i + 1)} />
          //   ) : (
          //     <EmptyStar key={i} onRate={() => handleRating(i + 1)} />
          //   )

          // The logic of full is very simple, if we ahve a temprating then we will fill the stars based on the tempRating and the statrs will be filled or not is decided by temprating >=i +1, which says that if the temp rating value is greated than or equal to i+1(becuase i is tarting from 0), will will show filled star.
          //if we do not have temprating, then stars will be filled based on the current rating, and logic is same as temprating.
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            handleHoverIn={() => handleHoverIn(i + 1)}
            handleHoverOut={() => handleHoverOut(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      {/* Used a ..... where if tempRating is 0, it will show rating and again if the rating is 0, then it will simply display the 3rd one which is an empty string. Whereas if we have rating then it will dispaly the rating directly */}
      <span>
        {messages.length === maxRating
          ? tempRating
            ? messages[tempRating - 1]
            : messages[rating - 1]
          : tempRating || rating || ""}
      </span>
    </div>
  );
}

function Star({ onRate, full, handleHoverIn, handleHoverOut, color, size }) {
  const emptyStar = {
    height: `${size}px`,
    width: `${size}px`,
    color: "white",
    display: "block",
    cursor: "pointer",
  };
  return (
    <span
      role="button"
      onClick={onRate}
      style={emptyStar}
      onMouseEnter={handleHoverIn}
      onMouseLeave={handleHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

// function EmptyStar({ onRate }) {
//   return (
//     <span style={emptyStar} onClick={onRate}>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="#000"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="{2}"
//           d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//         />
//       </svg>
//     </span>
//   );
// }

// FULL STAR

{
  /* <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="#000"
  stroke="#000"
>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  />
</svg> */
}

// EMPTY STAR

{
  /* <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="#000"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="{2}"
    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
  />
</svg> */
}
