function Circle(props) {


    const calculateTimeFraction = () => {
        const rawTimeFraction = 75 / 100
        return rawTimeFraction - (1 / 100) * (1 - rawTimeFraction)
      }
    
      const dashArray = `${(
        calculateTimeFraction() * 283
      ).toFixed(0)} 283`

    return (
        <svg viewBox="0 0 45 45">
            <circle cx="50" cy="50" r="45" stroke="#000" stroke-width="10" fill="none" stroke-dasharray={dashArray} stroke-dashoffset={283} />
        </svg>
    )
}

export { Circle }