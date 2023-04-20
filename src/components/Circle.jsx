function Circle(props) {
  const dashoffset = 2 * 3.14 * 80
  const dashArray = dashoffset * (100 - props.percent) / 100

  return (
    <div className="circle">
      <svg width="180" height="180">
        <circle cx="90" cy="90" r="80" fill="none" stroke="#fff" stroke-width="5"
          stroke-dasharray={dashoffset} stroke-dashoffset={dashArray} />
      </svg>
      <div className="circle-text">
        <span>{props.content}</span>
        <span className="percent">{`${props.percent}%`}</span>
      </div>
    </div>
  )
}

export { Circle }