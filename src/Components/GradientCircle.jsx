/* eslint-disable react/prop-types */
import '../assets/css/gradientCircle.css'

const GradientCircle = (
  { size,
    color,
    alignItems,
    justifyContent }
) => {
  return (
    <div className={`container ${alignItems} ${justifyContent}`}>
      <div className={`circle ${size} ${color}`}></div>
    </div>
  )
}

export default GradientCircle