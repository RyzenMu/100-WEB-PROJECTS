import { useState } from "react";

const StarRating = ({
  totalStars = 5,
  initialRating = 3.5,
  size = 24,
  activeColor = "#ffc107",
  inactiveColor = "#e4e5e9",
  onChange,
  precision = 0.5,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(null);

  const calculateRating = (e, starIndex) => {
    const element = e.currentTarget;
    const { width, left } = element.getBoundingClientRect();
    const clickPosition = e.clientX - left;
    const percentage = clickPosition / width;

    let value;
    if (precision === 0.5) {
      value = starIndex + (percentage > 0.5 ? 1 : 0.5);
    } else {
      value = Math.round((starIndex + percentage) / precision) * precision;
      value = Math.min(value, starIndex + 1);
    }
    return value;
  };

  const handleClick = (e, starIndex) => {
    const newRating = calculateRating(e, starIndex);
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  const handleMouseMove = (e, starIndex) => {
    setHoverRating(calculateRating(e, starIndex));
  };

  const handleMouseLeave = () => {
    setHoverRating(null); // Reset properly to avoid flickering
  };

  return (
    <div className="flex items-center">
      <div className="flex relative">
        {[...Array(totalStars)].map((_, index) => (
          <span
            key={index}
            className="cursor-pointer block relative"
            onClick={(e) => handleClick(e, index)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Background star */}
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={inactiveColor}
              stroke={inactiveColor}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            {/* Foreground star */}
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={activeColor}
              stroke={activeColor}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                clipPath: `inset(0 ${
                  100 -
                  (hoverRating !== null
                    ? Math.max(0, Math.min(100, (hoverRating - index) * 100))
                    : Math.max(0, Math.min(100, (rating - index) * 100)))
                }% 0 0)`,
              }}
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </span>
        ))}
      </div>
      <span className="ml-2 text-gray-700">
        {rating > 0 ? `${rating}/${totalStars}` : "no rating yet"}
      </span>
    </div>
  );
};

export default function App() {
  const [currentRating, setCurrentRating] = useState(3.5);
  const handleRatingChange = (newRating) => {
    setCurrentRating(newRating);
    console.log(`Rating changed to: ${newRating}`);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Product Rating</h2>
      <StarRating initialRating={currentRating} onChange={handleRatingChange} />
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Customization Examples:</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Large Gold Stars:</p>
            <StarRating
              size={32}
              activeColor="#FFD700"
              initialRating={currentRating}
              onChange={handleRatingChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
